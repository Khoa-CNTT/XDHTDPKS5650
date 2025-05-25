<?php

namespace App\Http\Controllers\FE;

use App\Http\Controllers\Controller;
use App\Models\Room;
use App\Models\RoomType;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Room::with('roomCategory')->get();
        $roomType = RoomType::all();
        return view('admin.Room', compact('data','roomType'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $roomType = RoomType::all();
        return view('admin.Room.roomcreate', compact('roomType'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate(
            [
                'room_name'          => 'required|string|max:255|unique:rooms,room_name',
                'price'              => 'required|integer|min:100',
                'status'             => 'required|boolean',
                'id_room_categories' => 'required|exists:room_categories,id',
                'more_service'       => 'nullable|string|max:500',
                'upload_images.*'    => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
                'image_links.*'      => 'nullable|url',
            ],
            [
                'room_name.unique' => 'Tên phòng đã tồn tại.',
                'price.min'        => 'Giá phải tối thiểu 100.',
                'more_service.max' => 'Dịch vụ thêm không được vượt quá 500 ký tự.',
            ]
        );

        $imagePaths = [];

        // Xử lý ảnh upload từ máy
        if ($request->hasFile('upload_images')) {
            foreach ($request->file('upload_images') as $image) {
                $path = $image->store('uploads/rooms', 'public');
                $imagePaths[] = $path;
            }
        }

        // Xử lý link ảnh nhập thủ công
        if ($request->filled('image_links')) {
            foreach ($request->image_links as $link) {
                if (!empty($link)) {
                    $imagePaths[] = $link;
                }
            }
        }

        $room = new \App\Models\Room();
        $room->room_name          = $data['room_name'];
        $room->price              = $data['price'];
        $room->status             = $data['status'];
        $room->id_room_categories = $data['id_room_categories'];
        $room->more_service       = $data['more_service'] ?? null;
        $room->images             = $imagePaths;

        $room->save();

        return redirect()
            ->route('rooms.index')
            ->with('success', 'Thêm phòng thành công!');
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
    public function edit($id)
    {
        $room = Room::findOrFail($id);
        $roomType = RoomType::all();
        return view('admin.Room.roomedit', compact('room', 'roomType'));
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = $request->validate(
            [
                'room_name'          => 'required|string|max:255|unique:rooms,room_name,' . $id,
                'price'              => 'required|integer|min:100',
                'status'             => 'required|boolean',
                'id_room_categories' => 'required|exists:room_categories,id',
                'more_service'       => 'nullable|string|max:500',
                'upload_images.*'    => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
                'image_links.*'      => 'nullable|url',
                'remove_images'      => 'nullable|array',
                'remove_images.*'    => 'string',
            ],
            [
                'room_name.unique'            => 'Tên phòng đã tồn tại.',
                'price.min'                   => 'Giá phải tối thiểu 100.',
                'more_service.max'            => 'Dịch vụ thêm không được vượt quá 500 ký tự.',
                'upload_images.*.image'       => 'File tải lên phải là ảnh.',
                'upload_images.*.mimes'       => 'Ảnh phải có định dạng jpg, jpeg, png, gif.',
                'upload_images.*.max'         => 'Kích thước ảnh tối đa 2MB.',
                'image_links.*.url'           => 'Đường dẫn ảnh không hợp lệ.',
            ]
        );

        $room = Room::findOrFail($id);

        // Lấy danh sách ảnh cũ (mảng) từ database
        $oldImages = is_string($room->images) ? json_decode($room->images, true) : (array)$room->images;

        // Lấy mảng ảnh cần xóa (checkbox)
        $removeImages = $request->input('remove_images', []);

        // Lọc ảnh cũ, loại bỏ ảnh bị đánh dấu xóa
        $filteredOldImages = array_filter($oldImages, function($img) use ($removeImages) {
            return !in_array($img, $removeImages);
        });

        // Bắt đầu mảng ảnh cuối cùng với ảnh cũ còn lại
        $finalImages = $filteredOldImages;

        // Xử lý upload ảnh mới nếu có
        if ($request->hasFile('upload_images')) {
            foreach ($request->file('upload_images') as $image) {
                $path = $image->store('uploads/rooms', 'public');
                $finalImages[] = asset('storage/' . $path);  // Tạo URL ảnh lưu
            }
        }

        // Thêm các link ảnh nhập thủ công (nếu có)
        if ($request->filled('image_links')) {
            foreach ($request->input('image_links') as $link) {
                $link = trim($link);
                if (!empty($link)) {
                    $finalImages[] = $link;
                }
            }
        }

        // Cập nhật các trường khác
        $room->room_name          = $data['room_name'];
        $room->price              = $data['price'];
        $room->status             = $data['status'];
        $room->id_room_categories = $data['id_room_categories'];
        $room->more_service       = $data['more_service'] ?? null;

        $room->images             = $finalImages;

        $room->save();

        return redirect()
            ->route('rooms.index')
            ->with('success', 'Cập nhật phòng thành công!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $room = Room::findOrFail($id);

        $room->delete();
        return redirect()->route('rooms.index')->with('success', 'Room deleted successfully.');
    }
}
