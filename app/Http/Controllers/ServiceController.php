<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Admin\ServiceRequest;
use App\Models\Service;

class ServiceController extends Controller
{
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
        if(Service::where('id',$id)->delete()){
            return response()->json(["Delete service success."]);
        }else{
            return response()->json(["Delete service error."]);
        }
    }
}
