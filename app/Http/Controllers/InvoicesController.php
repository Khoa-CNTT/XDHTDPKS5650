<?php

namespace App\Http\Controllers;

use App\Models\Invoices;
use App\Models\Staff;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class InvoicesController extends Controller
{

    public function index()
    {
        $data = Invoices::all();
        return response()->json([
            'invoices'  =>  $data
        ]);
    }
    public function indexWeb()
    {
        $invoices = Invoices::all(); // Lấy tất cả hóa đơn
        $users = User::all();
        return view('admin.invoice', compact('invoices', 'users')); // Trả về view với dữ liệu
    }
    public function change(Request $request)
    {
        $invoices = Invoices::find($request->id);
        if ($invoices) {
            if ($invoices->status == 1) {
                $invoices->status = 1;
            } else {
                $invoices->status = 0;
            }
            $invoices->save();

            return response()->json([
                'status' => true,
                'message' => "Đã  đổi trạng thái thanh toán!"
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => "Lỗi xảy ra!"
            ]);
        }
    }
}
