<?php

use App\Http\Controllers\AuthController;
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
use App\Http\Controllers\FE\CommentController;
use App\Http\Controllers\FE\RateController;
use App\Models\Invoices;
use App\Models\Room;

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

Route::middleware(['auth:staff,web'])->group(function () {
    Route::get('/', [HomeController::class, 'index']); // Trang chủ admin
    Route::resource('staffs', StaffController::class);
    Route::resource('categories', CateRoomController::class);
    Route::resource('rooms', RoomController::class);
    Route::resource('cateproducts', CateProductController::class);
    Route::resource('products', ProductController::class);
    Route::resource('blogs', BlogController::class);
    Route::resource('services', ServiceController::class);
    Route::get('/invoices', [InvoicesController::class, 'indexWeb'])->name('admin.invoice.indexWeb'); // Hiển thị danh sách hóa đơn
    Route::resource('rates', RateController::class);
    Route::get('comments', [CommentController::class, 'index']);
});
// Routes for login (no authentication required)
Route::get('/login', function () {
    return view('auth.login');
})->name('login')->middleware('guest');

Route::post('/login', [AuthController::class, 'login'])->name('login.post');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
Route::get('/payment', function () {
    return view('payment', [
    'invoice' => Invoices::all(),
    'rooms' => Room::all(),
]);
});

//Rate
//cấn id_room

