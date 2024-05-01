<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\LowQuantityController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome')->name('login');
});
Route::apiResource('/users',UserController::class);
    Route::apiResource('/articles',ArticleController::class);
    Route::apiResource('/suppliers',SupplierController::class);
    Route::apiResource('/categories',CategoryController::class);
    Route::apiResource('/low',LowQuantityController::class);
