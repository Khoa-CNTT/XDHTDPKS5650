<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Admin
use App\HTTP\Controllers\Admin\UserController;

Route::get('/list-staff',[UserController::class,'staffList']);
Route::post('/create-staff',[UserController::class,'staffCreate']);
Route::delete('/delete-staff/{id}',[UserController::class,'destroy']);





