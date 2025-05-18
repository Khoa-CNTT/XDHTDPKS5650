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
            ],
            [
                'room_name.unique'            => 'Tên phòng đã tồn tại.',
                'price.min'                   => 'Giá phải tối thiểu 100.',
                'more_service.max'            => 'Dịch vụ thêm không được vượt quá 500 ký tự.',
            ]
        );

        $room = new \App\Models\Room();
        $room->room_name          = $data['room_name'];
        $room->price              = $data['price'];
        $room->status             = $data['status'];
        $room->id_room_categories = $data['id_room_categories'];
        $room->more_service       = $data['more_service'] ?? null;

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
    $roomType = RoomType::all(); // Nếu bạn cần danh sách loại phòng
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
            ],
            [
                'room_name.unique'            => 'Tên phòng đã tồn tại.',
                'price.min'                   => 'Giá phải tối thiểu 100.',
                'more_service.max'            => 'Dịch vụ thêm không được vượt quá 500 ký tự.',
            ]
        );

        $room = Room::findOrFail($id);
        $room->room_name          = $data['room_name'];
        $room->price              = $data['price'];
        $room->status             = $data['status'];
        $room->id_room_categories = $data['id_room_categories'];
        $room->more_service       = $data['more_service'] ?? null;

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
