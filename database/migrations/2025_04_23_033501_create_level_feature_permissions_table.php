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
        Schema::create('level_feature_permissions', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('level');
            $table->unsignedBigInteger('id_feature');

            $table->foreign('id_feature')->references('id')->on('features')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('level_feature_permissions');
    }
};
