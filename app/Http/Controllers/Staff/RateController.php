<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Http\Requests\RateRequest;
use App\Models\Invoices;
use App\Models\Rate;
use App\Models\Staff;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

// use Illuminate\Support\Facades\Auth;

class RateController extends Controller
{
   
    public function index()
    {
        $data = Rate::all();
        return response()->json([
            'rate'  =>  $data
        ]);
    }
    public function store(RateRequest $request)
    {
        $invoice = Invoices::where('id', $request->id_invoice)
                ->where('id_user', auth()->id())
                ->where('id_room', $request->id_room)
                ->where('payment_status', 1)
                ->where('check_rate', 0)
                ->first();

        if (!$invoice) {
            return response()->json([
                'status' => false,
                'message' => 'Bạn không thể đánh giá phòng này. Có thể bạn chưa thanh toán hoặc đã đánh giá hóa đơn này rồi.',
            ], 403);
        }

        $rate = Rate::create([
            'id_user' => auth()->id(),
            'id_room' => $request->id_room,
            'stars' => $request->stars,
        ]);

        $invoice->check_rate = 1;
        $invoice->save();

        return response()->json([
            'status' => true,
            'message' => 'Đánh giá thành công!',
            'data' => $rate,
        ], 201);
    }

    public function destroy($id)
    {
        if (Rate::find($id)->delete()) {
            return response()->json([
                'status'    =>  true,
                'message'   =>  'Success delete!'
            ]);
        } else {
            return response()->json([
                'status'    =>  false,
                'message'   =>  'Error'
            ]);
        }
    }
    public function logout()
    {
        auth()->user()->tokens()->delete();
        return response()->json(
            [
                'message' => 'success'
            ],
            200
        );
    }
}
