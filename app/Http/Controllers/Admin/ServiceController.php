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
    // Kiểm tra quyền truy cập
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

    // Hiển thị danh sách dịch vụ (API)
    public function index()
    {
        $data = Service::all();
        return response()->json(['services' => $data]);
    }

    // Hiển thị danh sách dịch vụ (Web)
    public function indexWeb()
    {
        $services = Service::all(); // Lấy tất cả dịch vụ
        return view('admin.service', compact('services')); // Trả về view với dữ liệu
    }

    // Thêm mới dịch vụ (API)
    public function store(ServiceRequest $request)
    {
        $featureId = 4; // Create service

        if (!$this->hasPermission($featureId)) {
            return response()->json([
                'error' => 'You are not allowed to use this function'
            ], 403);
        }

        $data = $request->all();
        if (Service::create($data)) {
            return response()->json(["Create service success."]);
        } else {
            return response()->json(["Create service error."]);
        }
    }

    // Thêm mới dịch vụ (Web)
    public function storeWeb(ServiceRequest $request)
    {
        $featureId = 4; // Create service

        if (!$this->hasPermission($featureId)) {
            return redirect()->back()->with('error', 'You are not allowed to use this function.');
        }

        $data = $request->all();
        if (Service::create($data)) {
            return redirect()->route('admin.service.indexWeb')->with('success', 'Service created successfully!');
        } else {
            return redirect()->back()->with('error', 'Failed to create service.');
        }
    }

    // Hiển thị form chỉnh sửa dịch vụ (Web)


    // Cập nhật dịch vụ (Web)
    public function updateWeb(ServiceRequest $request, string $id)
    {
        $featureId = 5; // Update service

        if (!$this->hasPermission($featureId)) {
            return redirect()->back()->with('error', 'You are not allowed to use this function.');
        }

        $data = $request->all();
        $service = Service::find($id); // Tìm dịch vụ theo ID
        if ($service && $service->update($data)) {
            return redirect()->route('admin.service.indexWeb')->with('success', 'Service updated successfully!');
        } else {
            return redirect()->back()->with('error', 'Failed to update service.');
        }
    }

    // Xóa dịch vụ (API)
    public function destroy(string $id)
    {
        $featureId = 5; // Delete service

        if (!$this->hasPermission($featureId)) {
            return response()->json([
                'error' => 'You are not allowed to use this function'
            ], 403);
        }

        if (Service::where('id', $id)->delete()) {
            return response()->json(["Delete service success."]);
        } else {
            return response()->json(["Delete service error."]);
        }
    }

    // Xóa dịch vụ (Web)
    public function destroyWeb(string $id)
    {
        $featureId = 5; // Delete service

        if (!$this->hasPermission($featureId)) {
            return redirect()->back()->with('error', 'You are not allowed to use this function.');
        }

        $service = Service::find($id); // Tìm dịch vụ theo ID
        if ($service && $service->delete()) {
            return redirect()->route('admin.service.indexWeb')->with('success', 'Service deleted successfully!');
        } else {
            return redirect()->back()->with('error', 'Failed to delete service.');
        }
    }
}
