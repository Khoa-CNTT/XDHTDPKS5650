<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            // Thêm cột invoice_id kiểu unsignedBigInteger (ứng với id trong invoices)
            $table->unsignedBigInteger('invoice_id')->after('id')->nullable();

            // Tạo khóa ngoại
            $table->foreign('invoice_id')
                  ->references('id')
                  ->on('invoices')
                  ->onDelete('cascade')
                  ->onUpdate('cascade');
        });
    }

    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            // Drop foreign key trước
            $table->dropForeign(['invoice_id']);
            // Drop column
            $table->dropColumn('invoice_id');
        });
    }
};
