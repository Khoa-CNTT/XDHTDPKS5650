<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CountryController extends Controller
{
    public function index()
    {
        $all = config('countries');

        return response()->json($all);
    }
    public function show($id_country)
    {
        $all = config('countries');

        $country = $all[$id_country] ?? null;

        if (! $country) {
            return response()->json([
                'error' => 'Country not found'
            ], 404);
        }

        return response()->json($country);
    }
}
