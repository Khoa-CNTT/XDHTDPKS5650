<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LevelFeaturePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('level_feature_permissions')->truncate(); // Xoá toàn bộ và reset id

        DB::table('level_feature_permissions')->insert([
            ["level" => 2, "id_feature" => 1],
            ["level" => 2, "id_feature" => 2],
            ["level" => 2, "id_feature" => 3],
            ["level" => 2, "id_feature" => 4],
            ["level" => 2, "id_feature" => 5],
            ["level" => 2, "id_feature" => 6],
        ]);
    }
}
