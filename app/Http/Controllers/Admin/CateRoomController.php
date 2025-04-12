<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Admin\CateRoomRequest;
use App\Models\RoomType;

class CateRoomController extends Controller
{
    public function index()
    {
        $data = RoomType::all();
        return response()->json([$data]);
    }
    public function create()
    {
        //
    }
    public function store(CateRoomRequest $request)
    {
        $data = $request->all();
        if(RoomType::create($data)){
            return response()->json(["Create Room type success."]);
        }else{
            return response()->json(["Create Room type error."]);
        }
    }
    public function show(string $id)
    {
        //
    }
    public function edit(string $id)
    {
        $type = RoomType::find($id);
        return response()->json([$type]);
    }
    public function update(CateRoomRequest $request, string $id)
    {
        $data = $request->all();
        $type = RoomType::findOrFail($id);
        if($type->update($data)){
            return response()->json(["Edit Room type success."]);
        }else{
            return response()->json(["Edit Room type error."]);
        }
    }
    public function destroy(string $id)
    {
        if(RoomType::where('id',$id)->delete()){
            return response()->json(["Delete Room type success."]);
        }else{
            return response()->json(["Delete Room type error."]);
        }
    }
}
