<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('invoices', function (Blueprint $table) {
            // 1. Drop foreign key constraint trước
            $table->dropForeign(['id_order']);

            // 2. (Nếu có index riêng, có thể drop)
            // $table->dropIndex(['id_order']);

            // 3. Drop column
            $table->dropColumn('id_order');
        });
    }

    public function down(): void
    {
        Schema::table('invoices', function (Blueprint $table) {
            // Rollback: thêm lại cột
            $table->string('id_order')->after('id_user');

            // Nếu muốn, khôi phục index và foreign key
            // $table->index('id_order');
            // $table->foreign('id_order')
            //       ->references('your_order_column')
            //       ->on('orders')
            //       ->onDelete('cascade');
        });
    }
};


