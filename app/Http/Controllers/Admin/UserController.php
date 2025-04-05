<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StaffRequest;
use App\Models\Staff;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function staffCreate(StaffRequest $request)
    {
        $data = $request->all();
        if(Staff::create($data)){
            return response()->json(["Create Staff success."]);
        }else{
            return response()->json(["Create Staff error."]);
        }
    }
    public function staffList(){
        $data = Staff::all();
        return response()->json([$data]);
    }
    public function destroy(string $id)
    {
        if(Staff::where('id',$id)->delete()){
            return response()->json(["Delete Staff success."]);
        }else{
            return response()->json(["Delete Staff error."]);
        }
    }
}
