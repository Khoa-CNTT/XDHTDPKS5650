<?php

use App\Http\Controllers\FE\BlogController;
use App\Http\Controllers\FE\HomeController;
use App\Http\Controllers\FE\StaffController;
use App\Http\Controllers\FE\ProductController;
use App\Http\Controllers\InvoicesController;
use App\Http\Controllers\FE\RoomController;
use App\Http\Controllers\FE\ServiceController;
use App\Http\Controllers\FE\CateProductController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\FE\CateRoomController;

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

Route::get('/', [HomeController::class, 'index'])->name('home');
//Staff
Route::resource('staffs', StaffController::class);
//Category Room
Route::resource('categories', CateRoomController::class);
//Room
Route::resource('rooms', RoomController::class);
//category product
Route::resource('cateproducts', CateProductController::class);
//product
Route::resource('products', ProductController::class);
//invoice
Route::get('/invoice', [InvoicesController::class, 'indexWeb'])->name('admin.invoice.indexWeb'); // Hiển thị danh sách hóa đơn
//blog
Route::resource('blogs', BlogController::class);//cấn id_user
//Service
Route::resource('services', ServiceController::class);
//Rate
//cấn id_room

