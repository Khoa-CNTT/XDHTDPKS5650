<?php

namespace App\Http\Controllers\FE;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductCate;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Product::all();
        $productType = ProductCate::all(); // hoặc RoomCategory nếu bạn dùng tên đó
        return view('admin.Product', compact('data', 'productType'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $productType = ProductCate::all();
        return view('admin.Product.productcreate', compact('productType'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate(
            [
                'name'        => 'required|string|max:255',
                'price'       => 'required|integer|min:0',
                'status'      => 'required|boolean',
                'id_category' => 'required|exists:product_categories,id',
                'image'       => 'nullable|url',
            ],
            [
                'price.min'           => 'Giá sản phẩm phải tối thiểu 0.',
                'image.url'           => 'Trường hình ảnh phải là một đường dẫn hợp l',
            ]
        );
        $product = new Product();
        $product->id_user     = 1;
        $product->name        = $data['name'];
        $product->price       = $data['price'];
        $product->status      = $data['status'];
        $product->id_category = $data['id_category'];

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('uploads/products'), $imageName);
            $product->image = 'uploads/products/' . $imageName;
        }

        $product->save();

        return redirect()
            ->route('products.index')
            ->with('success', 'Thêm sản phẩm thành công!');
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
        $product = Product::findOrFail($id);
        $productType = ProductCate::all(); // Nếu bạn cần danh sách loại phòng
        return view('admin.Product.productedit', compact('product', 'productType'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $data = $request->validate(
            [
                'name'        => 'required|string|max:255' . $product->id,
                'price'       => 'required|integer|min:0',
                'status'      => 'required|boolean',
                'id_category' => 'required|exists:product_categories,id',
                'image'       => 'nullable|url',
            ],
            [
                'name.unique' => 'Tên sản phẩm đã tồn tại.',
                'price.min'   => 'Giá sản phẩm phải tối thiểu 0.',
                'image.url'   => 'Trường hình ảnh phải là một đường dẫn hợp lệ.',
            ]
        );

        $product->name        = $data['name'];
        $product->price       = $data['price'];
        $product->status      = $data['status'];
        $product->id_category = $data['id_category'];
        $product->image       = $data['image'] ?? null;

        $product->save();

        return redirect()
            ->route('products.index')
            ->with('success', 'Cập nhật sản phẩm thành công!');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $room = Product::findOrFail($id);

        $room->delete();
        return redirect()->route('products.index')->with('success', 'Product deleted successfully.');
    }
}
