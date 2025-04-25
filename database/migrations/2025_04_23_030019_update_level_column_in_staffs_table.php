<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateLevelColumnInStaffsTable extends Migration
{
    public function up()
    {
        Schema::table('staffs', function (Blueprint $table) {
            $table->unsignedInteger('level')
                  ->default(3)
                  ->change();
        });
    }

    public function down()
    {
        Schema::table('staffs', function (Blueprint $table) {
            $table->unsignedInteger('level')
                  ->default(4)
                  ->change();
        });
    }
}

