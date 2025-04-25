<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FeatureSeeder extends Seeder
{
    public function run()
    {
        DB::table('features')->delete();
        // Seed lại dữ liệu nếu muốn
        DB::table('features')->insert([
            ["id" => 1, "feature_name" => "Create Category Room"],
            ["id" => 2, "feature_name" => "Update Category Room"],
            ["id" => 3, "feature_name" => "Delete Category Room"],
            ["id" => 4, "feature_name" => "Create Service"],
            ["id" => 5, "feature_name" => "Delete Service"],
            ["id" => 6, "feature_name" => "Create Category Product"],
            ["id" => 7, "feature_name" => "Update Category Product"],
            ["id" => 8, "feature_name" => "Delete Category Product"],
        ]);
    }
}

