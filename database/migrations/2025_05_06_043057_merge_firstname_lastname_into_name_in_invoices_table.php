<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('invoices', function (Blueprint $table) {
            $table->string('name')->nullable()->after('id');
        });

        DB::table('invoices')->update([
            'name' => DB::raw("CONCAT(firstname, ' ', lastname)")
        ]);

        Schema::table('invoices', function (Blueprint $table) {
            $table->dropColumn(['firstname', 'lastname']);
        });
    }

    public function down(): void
    {
        Schema::table('invoices', function (Blueprint $table) {
            $table->string('firstname')->nullable()->after('id');
            $table->string('lastname')->nullable()->after('firstname');
        });

        DB::table('invoices')->update([
            'firstname' => DB::raw("SUBSTRING_INDEX(name, ' ', 1)"),
            'lastname'  => DB::raw("SUBSTRING_INDEX(name, ' ', -1)")
        ]);

        Schema::table('invoices', function (Blueprint $table) {
            $table->dropColumn('name');
        });
    }
};

