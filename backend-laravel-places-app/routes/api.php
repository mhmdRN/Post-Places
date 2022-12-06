<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PlaceController;

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

Route::get('/users',[UserController::class,'index']);
Route::post('/user/login',[UserController::class,'login']);
Route::get('/user/{id}',[UserController::class,'getPlaces']);


Route::post('/user/store',[UserController::class,'store']);
Route::middleware('auth:sanctum')->group(function (){
    Route::resource('/places',PlaceController::class);
    Route::post('/user/logout',[UserController::class,'logout']);
});
