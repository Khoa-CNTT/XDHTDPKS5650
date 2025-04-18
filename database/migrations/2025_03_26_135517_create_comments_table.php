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
        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_user')->references('id')->on('users')->onDelete('cascade'); // Người dùng comment
            $table->foreignId('id_staff')->references('id')->on('staffs')->onDelete('cascade'); // Nhân viên comment
            $table->text('text');
            $table->foreignId('id_parent')->nullable()->constrained('comments')->onDelete('cascade'); // Bình luận cha
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comments');
    }
};
