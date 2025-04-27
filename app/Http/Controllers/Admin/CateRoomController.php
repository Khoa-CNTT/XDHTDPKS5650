<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Admin\CateRoomRequest;
use App\Models\RoomType;
use App\Models\Staff;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CateRoomController extends Controller
{
    public function hasPermission($featureId)
    {
        $user = Auth::user();

        // Nếu là admin (level 1 ở bảng users) => toàn quyền
        if ($user->level == 1) {
            return true;
        }

        // Tìm nhân viên có email trùng với user
        $staff = Staff::where('email', $user->email)->first();

        // Không phải nhân viên thì không có quyền
        if (!$staff) {
            return false;
        }

        // Lấy danh sách chức năng được phép theo level
        $allowedFeatureIds = DB::table('level_feature_permissions')
            ->where('level', $staff->level)
            ->pluck('id_feature')
            ->toArray();

        return in_array($featureId, $allowedFeatureIds);
    }
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
        $featureId = 1; // create cate room

        if (!$this->hasPermission($featureId)) {
        return response()->json([
            'error' => 'You are not allowed to use this function'
            ], 403);
        }
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
        $featureId = 2; // update cate room

        if (!$this->hasPermission($featureId)) {
        return response()->json([
            'error' => 'You are not allowed to use this function'
            ], 403);
        }
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
        $featureId = 3; // Del Cate Room

        if (!$this->hasPermission($featureId)) {
        return response()->json([
            'error' => 'You are not allowed to use this function'
            ], 403);
        }
        if(RoomType::where('id',$id)->delete()){
            return response()->json(["Delete Room type success."]);
        }else{
            return response()->json(["Delete Room type error."]);
        }
    }
}
