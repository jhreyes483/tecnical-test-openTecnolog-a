import { config } from '../services/config.services';
import axios from 'axios';


export class DadService {
    protected base_url: string;
    protected axios: any;
    protected entity: any;
    protected token: any;
    public routeHome;

    constructor() {
        this.base_url = config.base_url;
        this.axios = axios;
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${this.getToken()}`;
        this.routeHome = 'users';
    }

    public getToken() {
        this.token = null;
        if (typeof localStorage !== 'undefined') {
            this.token = localStorage.getItem('access_token');
        }
        return this.token;
    }

    public getIdentity() {
        this.entity = null;
        if (typeof localStorage !== 'undefined') {
            let entity = localStorage.getItem('entity');
            if (entity && typeof entity !== 'object') {
                this.entity = JSON.parse(entity);
            } else {
                console.error('El objeto no es válido para ser almacenado en localStorage.');
            }
        }
        return this.entity;
    }

    public autLocalStorage(token: any, entity: any) {

        localStorage.setItem('access_token', token);
        localStorage.setItem('entity', JSON.stringify(entity));
        this.token = token;
        this.entity = entity;
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return true;
    }

    public autToken() {
        const token = this.getToken();
        if (token) {
            this.token = token;
            this.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            return true;
        }
        return false;
    }

    public existToken() {
        let isToken = null;
        if (typeof localStorage !== 'undefined') {
            const token0 = localStorage.getItem('access_token');
            isToken = token0 && token0.trim() !== '';
        }

        if (isToken) {
            return true;
        }
        return false;
    }

    public logoutToken() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('entity');
        this.entity = null;
        this.token = null;
        return true;
    }
}
