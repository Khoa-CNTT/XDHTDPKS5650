<?php

namespace App\Http\Controllers\FE;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductCate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CateProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = ProductCate::all();
        return view('admin.cateproduct', compact('data'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('admin.CateProduct.cateproductcreate');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate(
            [
                'CateName' => 'required|string|max:255|unique:product_categories,CateName',
            ],
            [
                'CateName.unique'   => 'Tên danh mục này đã tồn tại.',
            ]
        );

        $category = new ProductCate();
        $category->CateName = $data['CateName'];

        $category->save();

        return redirect()
            ->route('cateproducts.index') // điều chỉnh route nếu cần
            ->with('success', 'Thêm danh mục sản phẩm thành công!');
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
        $productType = ProductCate::findOrFail($id);
        return view('admin.CateProduct.cateproductedit', compact('productType'));
    }

    /**
     * Update the specified resource in storage.
     */

    public function update(Request $request, $id)
    {
        $data = $request->validate(
            [
                'CateName' => 'required|string|max:255|unique:product_categories,CateName,' . $id,
            ],
            [
                'CateName.required' => 'Bạn phải nhập tên danh mục.',
                'CateName.unique'   => 'Tên danh mục này đã tồn tại.',
            ]
        );

        $category = ProductCate::findOrFail($id);
        $category->CateName = $data['CateName'];

        $category->save();

        return redirect()
            ->route('cateproducts.index')
            ->with('success', 'Cập nhật danh mục sản phẩm thành công!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Tìm loại phòng theo ID
        $type = ProductCate::findOrFail($id);

        // Xóa ảnh nếu có
        if ($type->image && Storage::exists('public/' . $type->image)) {
            Storage::delete('public/' . $type->image);
        }

        // Xóa loại phòng
        if ($type->delete()) {
            return redirect()->route('cateproducts.index')->with('success', 'Room type deleted successfully.');
        } else {
            return redirect()->back()->with('error', 'Failed to delete room type.');
        }
    }
}
