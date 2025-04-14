<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('rates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_user')->references('id')->on('users')->onDelete('cascade'); // Người đánh giá
            $table->foreignId('id_room')->references('id')->on('rooms')->onDelete('cascade'); //Phòng đã đặt
            $table->integer('stars')->check('stars BETWEEN 1 AND 5'); // Số sao từ 1-5
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rates');
    }
};
