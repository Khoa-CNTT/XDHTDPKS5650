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
            $table->unsignedBigInteger('id_user');
            $table->unsignedBigInteger('id_parent')->nullable(); // hỗ trợ comment gốc và reply
            
            $table->text('text');
            $table->timestamps();

            // Foreign key: user
            $table->foreign('id_user')->references('id')->on('users')->onDelete('cascade');

            // Self-referencing foreign key
            $table->foreign('id_parent')->references('id')->on('comments')->onDelete('cascade');
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
