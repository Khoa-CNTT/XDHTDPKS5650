<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Admin\ServiceRequest;
use App\Models\Service;
use App\Models\Staff;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ServiceController extends Controller
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
        $data = Service::all();
        return response()->json([$data]);
    }
    public function create()
    {
        //
    }
    public function store(ServiceRequest $request)
    {
        $featureId = 4; // create ser

        if (!$this->hasPermission($featureId)) {
        return response()->json([
            'error' => 'You are not allowed to use this function'
            ], 403);
        }
        $data = $request->all();
        if(Service::create($data)){
            return response()->json(["Create service success."]);
        }else{
            return response()->json(["Create service error."]);
        }
    }
    public function show(string $id)
    {
        //
    }
    public function edit(string $id)
    {
        //
    }
    public function update(Request $request, string $id)
    {
        //
    }
    public function destroy(string $id)
    {
        $featureId = 5; // Del ser

        if (!$this->hasPermission($featureId)) {
        return response()->json([
            'error' => 'You are not allowed to use this function'
            ], 403);
        }
        if(Service::where('id',$id)->delete()){
            return response()->json(["Delete service success."]);
        }else{
            return response()->json(["Delete service error."]);
        }
    }
}
