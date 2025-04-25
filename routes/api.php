<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Admin
use App\HTTP\Controllers\Admin\UserController;
use App\HTTP\Controllers\Admin\CateRoomController;
use App\HTTP\Controllers\Admin\ServiceController;
use App\HTTP\Controllers\Admin\ProductController;
use App\Http\Controllers\Staff\CommentController;
use App\Http\Controllers\InvoicesController;
// Staff
use App\Http\Controllers\Staff\BlogController;
use App\Http\Controllers\Staff\RoomController;
use App\Models\Blog;

// Main
use App\Http\Controllers\Main\CustomerController;
use App\Http\Controllers\RentalDetailController;
use App\Http\Controllers\Staff\RateController;
use Dom\Comment;

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('/admin/login',[UserController::class,'loginAdmin']);
// Admin
Route::prefix('admin')->middleware('auth:sanctum')->group(function () {
    Route::get('/logout',[UserController::class,'logout']);
    // Profile
    Route::get('/profile',[UserController::class,'index']);
    Route::post('/update',[UserController::class,'updateAdmin']);
    // Staff
    Route::get('/list-staff',[UserController::class,'staffList']);
    Route::post('/create-staff',[UserController::class,'staffCreate']);
    Route::post('/update-staff',[UserController::class,'staffUpdate']);
    Route::delete('/delete-staff/{id}',[UserController::class,'destroy']);
    // Category room
    Route::get('/list-cate-room',[CateRoomController::class,'index']);
    Route::post('/create-cate-room',[CateRoomController::class,'store']);
    Route::get('/edit-cate-room/{id}',[CateRoomController::class,'edit']);
    Route::post('/edit-cate-room/{id}',[CateRoomController::class,'update']);
    Route::delete('/delete-cate-room/{id}',[CateRoomController::class,'destroy']);
    // Room
    Route::get('/list-room', [RoomController::class, 'getData']);
    Route::post('/create-room',[RoomController::class, 'store']);
    Route::get('/edit-room/{id}',[RoomController::class,'edit']);
    Route::put('/edit-room/{id}',[RoomController::class, 'update']);
    Route::delete('/delete-room/{id}', [RoomController::class, 'destroy']);
    // Rental room detail
    Route::post('/create-rental-detail', [RentalDetailController::class, 'store']);
    // Service
    Route::get('/list-service',[ServiceController::class,'index']);
    Route::post('/create-service',[ServiceController::class,'store']);
    Route::delete('/delete-service/{id}',[ServiceController::class,'destroy']);
    // Category product
    Route::get('/list-cate-product',[ProductController::class,'listCate']);
    Route::post('/create-cate-product',[ProductController::class,'storeCate']);
    Route::delete('/delete-cate-product/{id}',[ProductController::class,'destroyCate']);
    // Product
    Route::get('/list-product',[ProductController::class,'index']);
    Route::post('/create-product',[ProductController::class,'store']);
    Route::get('/edit-product/{id}',[ProductController::class,'edit']);
    Route::post('/edit-product/{id}',[ProductController::class,'update']);
    Route::put('/change-status', [ProductController::class, 'change']);
    Route::delete('/delete-product/{id}',[ProductController::class,'destroy']);
    // Blog
    Route::get('/list-blog',[BlogController::class,'index']);
    Route::post('/create-blog',[BlogController::class,'store']);
    Route::get('/edit-blog/{id}',[BlogController::class,'edit']);
    Route::put('/edit-blog/{id}',[BlogController::class,'update']);
    Route::delete('/delete-blog/{id}',[BlogController::class,'destroy']);
    // Invoices
    Route::get('/list-invoices', [InvoicesController::class, 'index']);
    Route::get('/change-invoices', [InvoicesController::class, 'change']);
    //Rate
    Route::get('/list-rate', [RateController::class, 'index']);
    //Cmt
    Route::get('/list-comment', [CommentController::class, 'index']);
    Route::delete('/delete-comment/{id}', [CommentController::class, 'destroy']);
});

// Staff
Route::post('/staff/login',[UserController::class,'loginStaff']);
Route::prefix('staff')->middleware('auth:sanctum')->group(function () {
    Route::get('/logout',[RoomController::class,'logout']);
    // Category room
    Route::get('/list-cate-room',[CateRoomController::class,'index']);
    Route::post('/create-cate-room',[CateRoomController::class,'store']);
    Route::get('/edit-cate-room/{id}',[CateRoomController::class,'edit']);
    Route::post('/edit-cate-room/{id}',[CateRoomController::class,'update']);
    Route::delete('/delete-cate-room/{id}',[CateRoomController::class,'destroy']);
    // Room
    Route::get('/list-room', [RoomController::class, 'getData']);
    Route::post('/create-room',[RoomController::class, 'store']);
    Route::get('/edit-room/{id}',[RoomController::class,'edit']);
    Route::put('/edit-room/{id}',[RoomController::class, 'update']);
    Route::delete('/delete-room/{id}', [RoomController::class, 'destroy']);
    // Category product
    Route::get('/list-cate-product',[ProductController::class,'listCate']);
    Route::post('/create-cate-product',[ProductController::class,'storeCate']);
    Route::delete('/delete-cate-product/{id}',[ProductController::class,'destroyCate']);
    // Product
    Route::get('/list-product',[ProductController::class,'index']);
    Route::post('/create-product',[ProductController::class,'store']);
    Route::get('/edit-product/{id}',[ProductController::class,'edit']);
    Route::post('/edit-product/{id}',[ProductController::class,'update']);
    Route::put('/change-status', [ProductController::class, 'change']);
    Route::delete('/delete-product/{id}',[ProductController::class,'destroy']);
    // Blog
    Route::get('/list-blog',[BlogController::class,'index']);
    Route::post('/create-blog',[BlogController::class,'store']);
    Route::get('/edit-blog/{id}',[BlogController::class,'edit']);
    Route::put('/edit-blog/{id}',[BlogController::class,'update']);
    Route::delete('/delete-blog/{id}',[BlogController::class,'destroy']);
    // Service
    Route::get('/list-service',[ServiceController::class,'index']);
    Route::post('/create-service',[ServiceController::class,'store']);
    Route::delete('/delete-service/{id}',[ServiceController::class,'destroy']);
    // Invoices
    Route::get('/list-invoices', [InvoicesController::class, 'index']);
    //Rate
    Route::get('/list-rate', [RateController::class, 'index']);
    //Cmt
    Route::get('/list-comment', [CommentController::class, 'index']);
    Route::delete('/delete-comment/{id}', [CommentController::class, 'destroy']);
});

Route::post('/register', [CustomerController::class, 'register']);
Route::post('/login', [CustomerController::class, 'login']);

// Main
Route::get('/list-room', [RoomController::class, 'getData']);
Route::get('/list-service',[ServiceController::class,'index']);
Route::get('/list-product',[ProductController::class,'index']);
Route::get('/list-blog',[BlogController::class,'index']);
Route::get('/list-comment', [CommentController::class, 'index']);
Route::get('/list-rate', [RateController::class, 'index']);

// Main sanctum
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/logout',[CustomerController::class,'logout']);
    Route::post('/choose-room',[CustomerController::class,'chooseRoom']);
    Route::post('/booking',[CustomerController::class,'booking']);
    Route::post('/add-to-cart', [CustomerController::class, 'AddToCart']);
    Route::post('/order-product', [CustomerController::class, 'order']);
    //Rate
    Route::post('/create-rate', [RateController::class, 'store']);
    Route::delete('/delete-rate/{id}', [RateController::class, 'destroy']);
    //Cmt
    Route::post('/create-comment', [CommentController::class, 'store']);
    Route::post('/delete-comment', [CommentController::class, 'Clientdelete']);
});
