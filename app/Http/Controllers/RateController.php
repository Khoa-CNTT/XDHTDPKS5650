<?php

namespace App\Http\Controllers;

use App\Models\Rate;
use Illuminate\Http\Request;

class RateController extends Controller
{
    public function index(){
        $data = Rate::all();
        return response()->json([
            'rate'  =>  $data
        ]);
    }
    public function store(Request $request){
        $data       = request()->all();
        $user       = $request->user();
        // $hasBooked  = Invoices::where('id_user', $user->id)
        //                         ->get();

        // if (!$hasBooked) {
        //     return response()->json([
        //         'status'    => false,
        //         'message'   => 'You must book a room first!']);
        // }
        if(Rate::create($data)){
            return response()->json([
                'status'    => true,
                'message'   => 'Success create!'
            ]);
        } else {
            return response()->json([
                'status'    =>  false,
                'message'   =>  'Error'
            ]);
        }
    }
    public function destroy($id)
    {
        if(Rate::find($id)->delete())
        {
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
}
