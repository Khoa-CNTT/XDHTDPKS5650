<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void
    {
        // Bước 1: Thêm cột code, cho phép null và chưa unique
        Schema::table('invoices', function (Blueprint $table) {
            $table->string('code', 20)->nullable()->after('id');
        });

        // Bước 2: Gán mã tạm cho các hóa đơn đã có
        DB::table('invoices')->get()->each(function ($invoice) {
            DB::table('invoices')
              ->where('id', $invoice->id)
              ->update(['code' => 'INV' . str_pad($invoice->id, 6, '0', STR_PAD_LEFT)]);
        });

        Schema::table('invoices', function (Blueprint $table) {
            $table->unique('code');
        });
    }

    public function down(): void
    {
        Schema::table('invoices', function (Blueprint $table) {
            $table->dropUnique(['code']);
            $table->dropColumn('code');
        });
    }
};



