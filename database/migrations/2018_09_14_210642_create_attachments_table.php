<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAttachmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('attachments', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->enum('type',['img', 'video']);
            $table->integer('product_id')->unsigned();
            $table->foreign('product_id')->references('id')->on('products')->onUdate('cascade')->onDelete('cascade');
            $table->string('attachment');
            $table->string('thumb');
//            $table->binary('attachment');
//            $table->binary('thumb');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('attachments');
    }
}
