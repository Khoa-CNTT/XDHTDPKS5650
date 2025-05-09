<?php

namespace App\Http\Controllers\FE;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\RoomType;
use Illuminate\Support\Facades\Storage;

class CateRoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = RoomType::all();
        return view('admin.cateroom', compact('data'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('admin.CateRoom.cateroomcreate');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate(
            [
                'room_type' => 'required|string|max:255|unique:room_categories,room_type',
                'adult' => 'required|integer|min:1',
                'children' => 'required|integer|min:0',
                'size' => 'required|integer|min:10',
                'image' => 'nullable|url|max:255',
                'status' => 'required|boolean',
            ],
            [
                'room_type.required' => 'Bạn phải nhập loại phòng.',
                'room_type.unique'   => 'Loại phòng này đã tồn tại.',
                'adult.min'          => 'Số người lớn phải tối thiểu 1.',
                'children.min'       => 'Số trẻ em không được âm.',
                'size.min'           => 'Diện tích phải tối thiểu 10',
                'image.url'          => 'Link ảnh không hợp lệ.',
            ]
        );
        $category = new \App\Models\RoomType();
        $category->room_type = $data['room_type'];
        $category->adult     = $data['adult'];
        $category->children  = $data['children'];
        $category->size      = $data['size'];
        $category->image     = $data['image'] ?? null;
        $category->status    = $data['status'];

        $category->save();

        return redirect()
            ->route('categories.index')
            ->with('success', 'Thêm loại phòng thành công!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //hiển thị 1 dữ liệu chi tiết
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $roomType = RoomType::findOrFail($id);
        return view('admin.CateRoom.cateroomedit', compact('roomType'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = $request->validate(
            [
                'room_type' => 'required|string|max:255|unique:room_categories,room_type,' . $id,
                'adult' => 'required|integer|min:1',
                'children' => 'required|integer|min:0',
                'size' => 'required|integer|min:10',
                'image' => 'nullable|urlmax:255',
                'status' => 'required|boolean',
            ],
            [
                'room_type.required' => 'Bạn phải nhập loại phòng.',
                'room_type.unique'   => 'Loại phòng này đã tồn tại.',
                'adult.min'          => 'Số người lớn phải tối thiểu 1.',
                'children.min'       => 'Số trẻ em không được âm.',
                'size.min'           => 'Diện tích phải tối thiểu 10',
                'image.url'          => 'Link ảnh không hợp lệ.',
            ]
        );
        $category = RoomType::findOrFail($id);

        $category->room_type = $data['room_type'];
        $category->adult     = $data['adult'];
        $category->children  = $data['children'];
        $category->size      = $data['size'];
        $category->status    = $data['status'];

        // Cập nhật link ảnh nếu có
        if (!empty($data['image'])) {
            $category->image = $data['image'];
        }

        $category->save();

        return redirect()->route('categories.index')->with('success', 'Cập nhật danh mục phòng thành công!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Tìm loại phòng theo ID
        $type = RoomType::findOrFail($id);

        // Xóa ảnh nếu có
        if ($type->image && Storage::exists('public/' . $type->image)) {
            Storage::delete('public/' . $type->image);
        }

        // Xóa loại phòng
        if ($type->delete()) {
            return redirect()->route('categories.index')->with('success', 'Room type deleted successfully.');
        } else {
            return redirect()->back()->with('error', 'Failed to delete room type.');
        }
    }
}
