<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FeatureSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('features')->delete();

        DB::table('features')->truncate();

        DB::table('features')->insert([
            ["id" => 1, "feature_name" => "List Room"],
            ["id" => 2, "feature_name" => "Create Room"],
            ["id" => 3, "feature_name" => "Update Room"],
            ["id" => 4, "feature_name" => "Delete Room"],
            ["id" => 5, "feature_name" => "Change Status Room"],
            ["id" => 6, "feature_name" => "List Blog"],
            ["id" => 7, "feature_name" => "Create Blog"],
            ["id" => 8, "feature_name" => "Update Blog"],
            ["id" => 9, "feature_name" => "Delete Blog"],
            ["id" => 10, "feature_name" => "Change Status Blog"],
            ["id" => 11, "feature_name" => "List Staff"],
            ["id" => 12, "feature_name" => "Create Room"],
            ['id' => 13, 'feature_name' => 'Update Room'],
            ['id' => 14, 'feature_name' => 'Delete Room'],
            ['id' => 15, 'feature_name' => 'List Product'],
            ['id' => 16, 'feature_name' => 'Create Product'],
            ['id' => 17, 'feature_name' => 'Update Product'],
            ['id' => 18, 'feature_name' => 'Delete Product'],
        ]);
    }
}
