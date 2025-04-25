<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Http\Requests\Staff\BlogRequest;
use App\Models\Blog;
use App\Models\Staff;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class BlogController extends Controller
{
    public function index(){

        $data = Blog::all();
        return response()->json([
            'blog'  =>  $data
        ]);
    }
    public function store(BlogRequest $request){
        $data = $request->all();
        if(Blog::create($data))
        {
            return response()->json([
                'status'    =>  true,
                'message'   =>  'Success create!'
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
        $data = Blog::find($id);
        return response()->json([$data]);
    }
    public function update(Request $request){
        $data = $request->all();

        if(Blog::find($request->id)->update($data))
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
        if(Blog::find($id)->delete())
        {
            return response()->json([
                'status'    =>  true,
                'message'   =>  'Đã xoá phòng thành công!'
            ]);
        } else {
            return response()->json([
                'status'    =>  false,
                'message'   =>  'Lỗi'
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
