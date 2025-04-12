<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Admin
use App\HTTP\Controllers\Admin\UserController;
use App\HTTP\Controllers\Admin\CateRoomController;
use App\HTTP\Controllers\Admin\ServiceController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/admin/login',[UserController::class,'loginAdmin']);
Route::prefix('admin')->middleware('auth:sanctum')->group(function () {
    Route::get('/logout',[UserController::class,'logout']);
    // Profile
    Route::get('/profile',[UserController::class,'index']);
    Route::post('/update',[UserController::class,'updateAdmin']);
    // Category room
    Route::get('/list-cate-room',[CateRoomController::class,'index']);
    Route::post('/create-cate-room',[CateRoomController::class,'store']);
    Route::get('/edit-cate-room/{id}',[CateRoomController::class,'edit']);
    Route::post('/edit-cate-room/{id}',[CateRoomController::class,'update']);
    Route::delete('/delete-cate-room/{id}',[CateRoomController::class,'destroy']);
    // Service
    Route::get('/list-service',[ServiceController::class,'index']);
    Route::post('/create-service',[ServiceController::class,'store']);
    Route::delete('/delete-service/{id}',[ServiceController::class,'destroy']);
});