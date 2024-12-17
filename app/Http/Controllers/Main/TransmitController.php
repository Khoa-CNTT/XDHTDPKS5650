<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\RoomType;
use App\Models\Room;
use App\Models\Service;
use App\Models\Product;

class TransmitController extends Controller
{
    public function listRoom(){
        $data = Room::with('roomCategory')->where('status', 1)->get();
        return response()->json($data);
    }
    public function detailRoom(string $id){
        $data = Room::with('roomCategory')->where('id',$id)->get();
        return response()->json($data);
    }
    public function listService(){
        $data = Service::get();
        return response()->json($data);
    }
    public function listProduct(){
        $data = Product::where('status', 1)->get();
        return response()->json($data);
    }
}
