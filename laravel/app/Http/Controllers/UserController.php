<?php

namespace App\Http\Controllers;

use App\Models\City;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index(Request $request){
        $output['status'] = true;
        $output['code'] = 200;

        $user = User::with([
            'City'=> function($query){
            $query->select(['id', 'description']);
            }
        ]);

        $page = $request->input('page', 1);
        $q    = $request->input('q');
        $c    = $request->input('c');

        if ($q) {
            $user= $user->where(function ($query) use ($q) {
                $query->where('name', 'LIKE', '%' . $q . '%');
            });
        }
        if ($c) {
            $user= $user->where(function ($query) use ($c) {
                $query->where('city_id', $c);
            });
        }

        $output['users'] = $user->paginate(10, ['*'], 'page', $page);

        return response()->json($output, $output['code']);
    }

    public function getComplements()
    {
        $output['status'] = true;
        $output['code'] = 200;
        $output['cities'] = City::select('id', 'description')->get();

        return response()->json($output, $output['code']);
    }

    public function store(Request $request){
        $output['status'] = false;
        $output['msg'] = 'no se crea';
        $output['code'] = 200;

        $user = new User();
        $user->name = $request->name;
        $user->city_id = $request->city_id;
        $user->email = $request->email;
        $user->address = $request->address;
        $user->telephone = $request->telephone;
        $user->status =1;
        $user->password = Hash::make($request->password);
        $user->save();

        $output['status'] = true;
        $output['msg'] = 'creo user';
        return $output;
    }
}
