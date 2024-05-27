<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        try{
            $user = User::where('email', $request->email)->first();
            if (! $user || ! Hash::check($request->password, $user->password)) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Unauthorized',
                ], /*401 */);
            }
            $token = $user->createToken('auth_token')->plainTextToken;
            $data = response()->json([
                'status' => 'success',
                'authorisation' => [
                    'token' => $token,
                    'type' => 'bearer'
                ],
                'user'=> $user
            ]);

            return $data;


            return response()->json(['error' => 'Unauthorized'], 401);

        } catch (\Throwable $e) {
            $resp['status'] = false;
            $resp['msg'] = 'error->'.$e->getMessage().' line->'.$e->getLine().' file->'.$e->getFile();
            return $resp;
        }
    }

    public function logout() {
        Auth::logout();
    }
}
