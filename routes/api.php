<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\LowQuantityController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function() {
    Route::get('logout',[AuthController::class,'logout']);

    Route::get('/user', function (Request $request) {
        return $request->user();
    });


});


Route::apiResource('/users',UserController::class);
    Route::apiResource('/articles',ArticleController::class);
    Route::apiResource('/suppliers',SupplierController::class);
    Route::apiResource('/categories',CategoryController::class);
    Route::apiResource('/low',LowQuantityController::class);
Route::post('login',[AuthController::class,'login']);
Route::post('register',[AuthController::class,'register']);
