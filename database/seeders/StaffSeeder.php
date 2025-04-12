<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class StaffSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('staffs')->delete();
        DB::table('staffs')->truncate();
        DB::table('staffs')->insert([
            [
                'name'          =>  'Hưng',
                'email'         =>  'trantanhung2003@gmail.com',
                'password'      =>  '123456',
                'phone'         =>  '0708133735',
                'address'       =>  '01 Nguyễn Văn Linh',
                'avatar'        =>  '2134455',
                'level'         =>  '3',
            ],
        ]);
    }
}
