<?php

use App\Http\Controllers\Admin\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Admin
use App\HTTP\Controllers\Admin\UserController;
use App\Http\Controllers\RateController;

Route::get('/list-staff',[UserController::class,'staffList']);
Route::post('/create-staff',[UserController::class,'staffCreate']);
Route::delete('/delete-staff/{id}',[UserController::class,'destroy']);

// Category product
Route::get('/list-cate-product',[ProductController::class,'listCate']);
Route::post('/create-cate-product',[ProductController::class,'storeCate']);
Route::delete('/delete-cate-product/{id}',[ProductController::class,'destroyCate']);
// Product
Route::get('/list-product',[ProductController::class,'index']);
Route::post('/create-product',[ProductController::class,'store']);
Route::get('/edit-product/{id}',[ProductController::class,'edit']);
Route::post('/edit-product/{id}',[ProductController::class,'update']);
Route::delete('/delete-product/{id}',[ProductController::class,'destroy']);
//Customer Rate
Route::post('/create-rate', [RateController::class, 'store']);// thiếu cái điều kiện invoices có mới tạo được
Route::delete('/delete-rate/{id}', [RateController::class, 'destroy']);



