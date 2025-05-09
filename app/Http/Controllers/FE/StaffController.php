<?php

namespace App\Http\Controllers\FE;

use App\Http\Controllers\Controller;
use App\Models\Staff;
use Illuminate\Http\Request;

class StaffController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Staff::all();
        return view('admin.staff', compact('data'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('admin.Staff.staffcreate');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:staffs,email',
            'password' => 'required|min:9',
            'phone'    => 'required|regex:/^0\d{9}$/',
            'address'  => 'required|string|max:255',
            'avatar'   => 'nullable|url',
            'level' => 'required|integer|in:2,3',
        ], [
            'email.email'        => 'Email không hợp lệ.',
            'email.unique'       => 'Email đã tồn tại.',
            'password.min'       => 'Mật khẩu tối thiểu 9 ký tự.',
            'phone.regex'        => 'Số điện thoại không đúng định dạng (bắt đầu bằng 0 và đủ 10 số).',
            'avatar.url'         => 'Đường dẫn avatar không hợp lệ.',
        ]);

        $staff = new \App\Models\Staff();
        $staff->name     = $data['name'];
        $staff->email    = $data['email'];
        $staff->password = bcrypt($data['password']); // Băm mật khẩu
        $staff->phone    = $data['phone'] ?? null;
        $staff->address  = $data['address'] ?? null;
        $staff->avatar   = $data['avatar'] ?? null;
        $staff->level    = $data['level'];

        $staff->save();

        return redirect()
            ->route('staff.index')
            ->with('success', 'Thêm nhân viên thành công!');
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
        $staff = Staff::findOrFail($id);
        return view('admin.Staff.staffedit', compact('staff'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {

        $data = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:staffs,email,'. $id ,
            'password' => 'nullable|min:9', // không bắt buộc đổi mật khẩu
            'phone'    => 'required|regex:/^0\d{9}$/',
            'address'  => 'required|string|max:255',
            'avatar'   => 'nullable|url',
            'level' => 'required|integer|in:2,3',
        ], [
            'email.email'        => 'Email không hợp lệ.',
            'email.unique'       => 'Email đã tồn tại.',
            'password.min'       => 'Mật khẩu tối thiểu 9 ký tự.',
            'phone.regex'        => 'Số điện thoại không đúng định dạng (bắt đầu bằng 0 và đủ 10 số).',
            'avatar.url'         => 'Đường dẫn avatar không hợp lệ.',
        ]);
        $staff = Staff::findOrFail($id);

        $staff->name    = $data['name'];
        $staff->email   = $data['email'];
        $staff->phone   = $data['phone'];
        $staff->address = $data['address'];
        $staff->avatar  = $data['avatar'] ?? null;
        $staff->level   = $data['level'];

        // Nếu có nhập mật khẩu mới thì cập nhật
        if (!empty($data['password'])) {
            $staff->password = bcrypt($data['password']);
        }

        $staff->save();

        return redirect()
            ->route('staffs.index')
            ->with('success', 'Cập nhật nhân viên thành công!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Staff::where('id', $id)->delete();
        return redirect()->route('staffs.index')->with('success', 'Staff deleted successfully.');
    }
}
