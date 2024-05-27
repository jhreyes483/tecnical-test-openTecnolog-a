<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/product/get_complements', [ProductController::class, 'getComplements']);
Route::get('/logout', [AuthController::class, 'logout']);
Route::post('/login', [AuthController::class, 'login']);
Route::resource('product', ProductController::class)
    ->only(['edit', 'show','update','create','store', 'destroy'])
    ->parameters(['product' => 'id' ])
    ->middleware('auth:sanctum');
Route::post('/product/index', [ProductController::class, 'index'])->middleware('auth:sanctum');

Route::resource('user', UserController::class)->only(['store']);
Route::post('/user/index', [UserController::class, 'index'])->middleware('auth:sanctum');
Route::get('user/get_complements', [UserController::class, 'getComplements']);


//Route::apiResource('orders', OrderController::class)->only([ 'store', 'show'])->middleware('auth:sanctum');
