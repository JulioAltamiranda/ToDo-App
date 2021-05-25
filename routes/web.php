<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/','TodoController@index');
Route::get('/todos','TodoController@todoList');
Route::post('/todos/store','TodoController@store');
Route::put('/todos/edit/{id}','TodoController@update');
Route::delete('/todos/delete/{todo}','TodoController@destroy');
Route::get('/todos/changeStatus/{todo}','TodoController@changeStatus');
