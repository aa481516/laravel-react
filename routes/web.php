<?php

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

Route::get('/', function () {
    return view('welcome');
});


Route::group(['prefix'=>'/api'], function (){
    Route::get('/category', 'CategoryController@index')->name('category_list');
    Route::post('/category/put', 'CategoryController@update')->name('category_update');
    Route::post('/category/add', 'CategoryController@create')->name('category_add');
    Route::post('/category/delete', 'CategoryController@delete')->name('category_delete');

    Route::get('/product/{id}', 'ProductController@index')->name('product_list');
    Route::post('/product/put', 'ProductController@update')->name('product_update');
    Route::post('/product/add', 'ProductController@create')->name('product_add');
    Route::post('/product/delete', 'ProductController@delete')->name('product_delete');
});