<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void
    {
        // 1. Thêm cột code
        Schema::table('invoices', function (Blueprint $table) {
            $table->string('code', 20)->nullable()->after('id');
        });

        // 2. Gán giá trị code cho các bản ghi hiện có
        DB::table('invoices')->get()->each(function ($invoice) {
            DB::table('invoices')
              ->where('id', $invoice->id)
              ->update([
                  'code' => 'INV' . str_pad($invoice->id, 6, '0', STR_PAD_LEFT)
              ]);
        });

        // 3. Thêm unique index cho code
        Schema::table('invoices', function (Blueprint $table) {
            $table->unique('code');
        });
    }

    public function down(): void
    {
        Schema::table('invoices', function (Blueprint $table) {
            // Chỉ drop cột code, index unique sẽ tự động bị xóa
            $table->dropColumn('code');
        });
    }
};
