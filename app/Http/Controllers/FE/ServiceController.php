<?php

namespace App\Http\Controllers\FE;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $service = Service::all(); // Lấy tất cả bài viết
        return view('admin.Service', compact('service')); // Trả về view với dữ liệu
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $service = Service::all();
        return view('admin.Service.servicecreate', compact('service')); // Trả về view với dữ liệu
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data   =    $request->validate(
            [
                'service_name' => 'required|string|max:255',
            ],
            [
                'service_name.max' => 'Tên dịch vụ không được vượt quá 255 ký tự',
            ]
        );
        // Tạo mới một đối tượng Blog
        $service = new Service();
        $service->service_name = $data['service_name'];
        // Lưu blog vào cơ sở dữ liệu
        $service->save();

        return redirect()
            ->route('services.index') // Chuyển hướng về trang danh sách blog
            ->with('success', 'Thêm dịch vụ thành công!');
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
        $service = Service::findOrFail($id);
        return view('admin.Service.serviceedit', compact('service'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $service = Service::findOrFail($id);

        $data = $request->validate(
            [
                'service_name' => 'required|string|max:255',
            ],
            [
                'service_name.max' => 'Tên dịch vụ không được vượt quá 255 ký tự',
            ]
        );
        $service->service_name = $data['service_name'];
        // Lưu blog vào cơ sở dữ liệu
        $service->save();
        return redirect()->route('services.index')->with('success', 'Cập nhật dịch vụ thành công!');
    }
    public function destroy(string $id)
    {
        $service = Service::findOrFail($id);
        $service->delete();
        return redirect()->route('services.index')->with('success', 'Xóa dịch vụ thành công!');
    }
}
