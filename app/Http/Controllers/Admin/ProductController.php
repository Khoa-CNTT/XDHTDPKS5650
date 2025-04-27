<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Admin\ProductRequest;
use App\Models\Product;
use App\Models\ProductCate;
use App\Models\Staff;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
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
        $data = Product::all();
        return response()->json([$data]);
    }
    public function create()
    {
        //
    }
    public function store(ProductRequest $request)
    {
        $data = $request->all();
        if(Product::create($data)){
            return response()->json(["Create product success."]);
        }else{
            return response()->json(["Create product error."]);
        }
    }
    public function storeCate(Request $request)
    {
        $featureId = 6; // Create Cate Pr

        if (!$this->hasPermission($featureId)) {
        return response()->json([
            'error' => 'You are not allowed to use this function'
            ], 403);
        }
        $validatedData = $request->validate(
            ['CateName' => 'required'],
            ['CateName.required' => 'Tên danh mục không được để trống.']
        );
        try {
            if (ProductCate::create($validatedData)) {
                return response()->json(["message" => "Create success."], 201);
            } else {
                return response()->json(["message" => "Create error."], 500);
            }
        } catch (\Exception $e) {
            return response()->json(["message" => "Error: " . $e->getMessage()], 500);
        }
    }
    public function show(string $id)
    {
        //
    }
    public function edit(string $id)
    {
        $data = Product::find($id);
        return response()->json([$data]);
    }
    public function update(ProductRequest $request, string $id)
    {
        $featureId = 7; // Update Cate Pr

        if (!$this->hasPermission($featureId)) {
        return response()->json([
            'error' => 'You are not allowed to use this function'
            ], 403);
        }
        $data = $request->all();
        $product = Product::findOrFail($id);
        if($product->update($data)){
            return response()->json(["Edit product success."]);
        }else{
            return response()->json(["Edit product error."]);
        }
    }
    public function destroy(string $id)
    {
        $featureId = 8; // Del Cate Pr

        if (!$this->hasPermission($featureId)) {
        return response()->json([
            'error' => 'You are not allowed to use this function'
            ], 403);
        }
        if(ProductCate::where('id',$id)->delete()){
            return response()->json(["Delete product success."]);
        }else{
            return response()->json(["Delete product error."]);
        }
    }
    public function destroyCate(string $id)
    {
        if(ProductCate::where('id',$id)->delete()){
            return response()->json(["Delete category success."]);
        }else{
            return response()->json(["Delete category error."]);
        }
    }
    public function change(string $id)
    {
        $product = Product::find($id);
        if($product) {
            $product->status = $product->status == 1 ? 0 : 1;

            $product->save();

            return response()->json([
                'status' => true,
                'message' => "Change status success!"
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => "Change status error!"
            ]);
        }
    }
    public function listCate()
    {
        $data = ProductCate::all();
        return response()->json([$data]);
    }
}
