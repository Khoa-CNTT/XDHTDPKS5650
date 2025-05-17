<?php

namespace App\Http\Controllers\FE;

use App\Http\Controllers\Controller;
use App\Models\Rate;
use App\Models\Room;
use App\Models\User;
use Illuminate\Http\Request;

class RateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $rate = Rate::all();
        $user = User::all();
        $room = Room::all();
        return view('admin.rate', compact('user', 'room', 'rate'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
