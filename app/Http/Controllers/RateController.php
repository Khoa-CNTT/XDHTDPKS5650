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
        $data = request()->all();
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
    public function edit(string $id)
    {
        $data = Rate::find($id);
        return response()->json([$data]);
    }
    public function update(Request $request){
        $data = $request->all();

        if(Rate::find($request->id)->update($data))
        {
            return response()->json([
                'status'    =>  true,
                'message'   =>  'Update success!'
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
    public function logout(){
        auth()->user()->tokens()->delete();
        return response()->json(
            [
                'message'=>'success'
            ],
            200
        );
    }
}
