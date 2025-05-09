<?php

namespace App\Http\Controllers\FE;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BlogController extends Controller
{
    // Hiển thị danh sách blog (Web)
    public function index()
    {
        $blog = Blog::all(); // Lấy tất cả bài viết
        return view('admin.Blog', compact('blog')); // Trả về view với dữ liệu
    }
    public function create()
    {
        $blog = Blog::all();
        return view('admin.Blog.blogcreate', compact('blog'));
    }
    // Thêm mới blog (Web)
    public function store(Request $request)
    {
        $data   =    $request->validate([
            'blog_name' => 'required|string|max:255',
            'short_describe' => 'required|string|max:500',
            'detail_describe' => 'required|string',
            'status' => 'required|boolean',
            'img' => 'required|nullable|url',
        ],
        [
            'img.url' => 'Địa chỉ ảnh không hợp lệ',
        ]);
        // Tạo mới một đối tượng Blog
        $blog = new Blog();
        $blog->blog_name = $data['blog_name'];
        $blog->short_describe = $data['short_describe'];
        $blog->detail_describe = $data['detail_describe'];
        $blog->status = $data['status'];
        $blog->img = $data['img']; // Đường dẫn ảnh (nếu có)
        // Lưu blog vào cơ sở dữ liệu
        $blog->save();

        return redirect()
            ->route('blogs.index') // Chuyển hướng về trang danh sách blog
            ->with('success', 'Thêm bài viết thành công!');
    }

    // Hiển thị form chỉnh sửa blog (Web)
    public function edit(string $id)
    {
        $blog = Blog::findOrFail($id);
        return view('admin.Blog.blogedit', compact('blog'));
    }

    // Cập nhật blog (Web)
    public function update(Request $request, $id)
    {
        $blog = Blog::findOrFail($id);

        $data = $request->validate([
            'blog_name' => 'required|string|max:255',
            'short_describe' => 'required|string|max:500',
            'detail_describe' => 'required|string',
            'status' => 'required|boolean',
            'img' => 'nullable|url',
        ],
        [
            'status.required' => 'Trạng thái là bắt buộc.',
            'img.url' => 'Địa chỉ ảnh không hợp lệ',
        ]);

        $blog->blog_name = $data['blog_name'];
        $blog->short_describe = $data['short_describe'];
        $blog->detail_describe = $data['detail_describe'];
        $blog->status = $data['status'];
        $blog->img = $data['img']; // Đường dẫn ảnh (nếu có)

        // Lưu blog vào cơ sở dữ liệu
        if (!empty($data['img'])) {
            $blog->img = $data['img'];
        }

        $blog->save();

        return redirect()->route('blogs.index')->with('success', 'Cập nhật bài viết thành công!');
    }

    // Xóa blog (Web)
    public function destroy($id)
    {
        $blog = Blog::find($id);

        // Xóa ảnh nếu có
        if ($blog->img && Storage::exists('public/' . $blog->img)) {
            Storage::delete('public/' . $blog->img);
        }

        if ($blog->delete()) {
            return redirect()->route('blogs.index')->with('success', 'Blog deleted successfully!');
        } else {
            return redirect()->back()->with('error', 'Failed to delete blog.');
        }
    }
}
