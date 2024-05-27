<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    public $urlLog = 'https://solucionesintegralesmallorca.com/portafoliojav/api/';

    public function getPublicIp()
    {
        ## geolocalizacion IP https://www.cual-es-mi-ip.net/geolocalizar-ip-mapa
        $ipaddress = '';
        if (getenv('HTTP_CLIENT_IP')) {
            $ipaddress = getenv('HTTP_CLIENT_IP');
        } else if (getenv('HTTP_X_FORWARDED_FOR')) {
            $ipaddress = getenv('HTTP_X_FORWARDED_FOR');
        } else if (getenv('HTTP_X_FORWARDED')) {
            $ipaddress = getenv('HTTP_X_FORWARDED');
        } else if (getenv('HTTP_FORWARDED_FOR')) {
            $ipaddress = getenv('HTTP_FORWARDED_FOR');
        } else if (getenv('HTTP_FORWARDED')) {
            $ipaddress = getenv('HTTP_FORWARDED');
        } else if (getenv('REMOTE_ADDR')) {
            $ipaddress = getenv('REMOTE_ADDR');
        } else {
            $ipaddress = 'UNKNOWN';
        }
        $ipaddress = explode('1', $ipaddress, 1)[0];

        return $ipaddress;
    }

    public function sendHttp(string $url, $params = [], string $method = 'POST', $authorization = []): array
    {
        try {
            $resp = ['status' => true, 'data' => [], 'msg' => 'ok', 'url' => $url];
            $body = json_encode($params);

            $ch = curl_init();

            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_TIMEOUT, 60000); // Aumentar el tiempo de espera a 60 segundos (o cualquier valor adecuado)
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $body);

            $headers = $authorization;
            $head    = [
                'Authorization:  Bearer ' . (isset($headers['token']) ? $headers['token'] : ''),
                'Content-Type: application/json'
            ];
            curl_setopt($ch, CURLOPT_HTTPHEADER, $head);
            $response = curl_exec($ch);

            if (curl_errno($ch)) {
                $resp['status'] = false;
                $resp['msg']    = curl_error($ch);
            }
            $resp['data'] = json_decode($response, true);
        } catch (\Throwable $e) {
            $resp['status'] = false;
            $resp['msg'] = 'error->' . $e->getMessage() . ' line->' . $e->getLine() . ' file->' . $e->getFile();
            return $resp;
        }
        $resp['code'] = curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
        // $resp['time'] = curl_getinfo($ch, CURLINFO_STARTTRANSFER_TIME);
        // $resp['time'] = round($resp['time'] * 1000);
        return $resp;
    }

    public function logIngreso()
    {
        $ip = $this->getPublicIp();
        return  $this->sendHttp($this->urlLog, ['proyect_id'=>10, 'ip'=>$ip,'api_case'=> 'log_ingreso'] );
    }
}
