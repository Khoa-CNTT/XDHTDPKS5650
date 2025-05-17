<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Staff;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $data = $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
            'role'     => 'required|in:admin,staff',
        ]);

        if ($data['role'] === 'staff') {
            $staff = Staff::where('email', $data['email'])->first();

            if ($staff) {
                $inputPassword = $data['password'];
                $storedPassword = $staff->password;

                if (!Str::startsWith($storedPassword, '$2y$')) {
                    if ($inputPassword === $storedPassword) {
                        $staff->password = Hash::make($inputPassword);
                        $staff->save();

                        Auth::guard('staff')->login($staff);
                        $request->session()->regenerate();
                        return redirect()->intended('/')->with('success', 'Staff login');
                    }
                } else {
                    // Nếu là Bcrypt thì check bình thường
                    if (Hash::check($inputPassword, $storedPassword)) {
                        Auth::guard('staff')->login($staff);
                        $request->session()->regenerate();
                        return redirect()->intended('/')->with('success', 'Staff login');
                    }
                }
            }
            return back()->withErrors([
                'email' => 'Email hoặc mật khẩu không đúng.',
            ])->withInput();
        }

        if ($data['role'] === 'admin') {
            $user = User::where('email', $data['email'])
            ->where('level', 1)
            ->first();

            if ($user) {
                $inputPassword = $data['password'];
                $storedPassword = $user->password;

                if (!Str::startsWith($storedPassword, '$2y$')) {
                    if ($inputPassword === $storedPassword) {
                        $user->password = Hash::make($inputPassword);
                        $user->save();

                        Auth::guard('web')->login($user);
                        $request->session()->regenerate();
                        return redirect()->intended('/')->with('success', 'Admin login');
                    }
                } else {
                    if (Hash::check($inputPassword, $storedPassword)) {
                        Auth::guard('web')->login($user);
                        $request->session()->regenerate();
                        return redirect()->intended('/')->with('success', 'Admin login');
                    }
                }
            }
            return back()->withErrors([
                'email' => 'Email hoặc mật khẩu không đúng.',
            ])->withInput();
        }
    }

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();
        Auth::guard('staff')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/login')->with('success', 'Đã đăng xuất.');
    }
}
