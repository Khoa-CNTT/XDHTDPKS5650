<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rental_details', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_room');
            $table->date('date');
            $table->integer('status');
            $table->string('note')->nullable();
            $table->timestamps();

            $table->foreign('id_room')            
                ->references('id')             
                ->on('rooms')                  
                ->onDelete('cascade')          
                ->onUpdate('cascade');  
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rental_details');
    }
};
