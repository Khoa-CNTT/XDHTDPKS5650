<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Admin
use App\HTTP\Controllers\Admin\UserController;
use App\HTTP\Controllers\Admin\CateRoomController;
use App\HTTP\Controllers\Admin\ServiceController;

// Staff
use App\Http\Controllers\Staff\BlogController;
use App\Http\Controllers\Staff\RoomController;
use App\Models\Blog;

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

// Staff
Route::post('/staff/login',[UserController::class,'loginStaff']);
Route::prefix('staff')->middleware('auth:sanctum')->group(function () {
    Route::get('/logout',[RoomController::class,'logout']);
    // Room
    Route::get('/list-room', [RoomController::class, 'getData']);
    Route::post('/create-room',[RoomController::class, 'store']);
    Route::get('/edit-room/{id}',[RoomController::class,'edit']);
    Route::put('/edit-room/{id}',[RoomController::class, 'update']);
    Route::delete('/delete-room/{id}', [RoomController::class, 'destroy']);
    // Product
    Route::get('/list-product',[ProductController::class,'index']);
    Route::put('/change-status/{id}', [ProductController::class, 'change']);
    // Blog
    Route::get('/list-blog',[BlogController::class,'index']);
    Route::post('/create-blog',[BlogController::class,'store']);
    Route::get('/edit-blog/{id}',[BlogController::class,'edit']);
    Route::post('/edit-blog/{id}',[BlogController::class,'update']);
    Route::delete('/delete-blog/{id}',[BlogController::class,'destroy']);
    // Rental room detail
    Route::post('/create-rental-detail', [RentalDetailController::class, 'store']);
});