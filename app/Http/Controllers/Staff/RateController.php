<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Http\Requests\RateRequest;
use App\Models\Invoices;
use App\Models\Rate;
use App\Models\Staff;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

// use Illuminate\Support\Facades\Auth;

class RateController extends Controller
{
   
    public function index()
    {
        $data = Rate::all();
        return response()->json([
            'rate'  =>  $data
        ]);
    }
    public function store(RateRequest $request)
    {
        $rate = Rate::create([
            'id_user' => Auth()->id(),
            'id_room' => $request->id_room,
            'stars' => $request->stars,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Successfully rated!',
            'data' => $rate,
        ], 201);
    }

    public function destroy($id)
    {
        if (Rate::find($id)->delete()) {
            return response()->json([
                'status'    =>  true,
                'message'   =>  'Success delete!'
            ]);
        } else {
            return response()->json([
                'status'    =>  false,
                'message'   =>  'Error'
            ]);
        }
    }
    public function logout()
    {
        auth()->user()->tokens()->delete();
        return response()->json(
            [
                'message' => 'success'
            ],
            200
        );
    }
}
