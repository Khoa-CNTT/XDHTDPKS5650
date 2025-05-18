<?php

namespace App\Http\Controllers;

use App\Models\Invoices;
use Illuminate\Http\Request;

class PaymentController extends Controller
{


    public function showQR(Request $request, $invoice_id)
    {
        // Lấy hóa đơn theo id
        $invoice = Invoices::findOrFail($invoice_id);

        $phone = '0905523175'; // Số điện thoại nhận tiền MOMO
        $amount = $invoice->total; // Số tiền từ hóa đơn
        $desc = 'THANH TOAN HOA DON ' . $invoice->id; // Nội dung chuyển khoản

        // Tạo link QR MOMO (dạng URL, khách quét sẽ tự động điền thông tin)
        $qrData = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=momo://?action=pay&phone={$phone}&amount={4000}&comment={$desc}";

        return view('payment.momo', compact('qrData', 'amount', 'desc', 'invoice'));
    }
}
