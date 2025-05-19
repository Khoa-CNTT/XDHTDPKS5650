<?php

// app/Http/Controllers/PaymentController.php

namespace App\Http\Controllers;

use App\Models\Invoices;
use App\Notifications\InvoicePaidNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;

class PaymentController extends Controller
{
    public function showQR(Request $request, $invoice_id)
    {
        $invoice = Invoices::findOrFail($invoice_id);

        $amount = $invoice->total;
        $desc = 'THANH TOAN HOA DON ' . $invoice->code;

        // Loại thanh toán: momo | bank
        $type = $request->query('type', 'bank'); // ?type=momo để test MOMO

        if ($type === 'momo') {
            // Mã QR cho Momo (dạng text, MoMo hỗ trợ quét chuyển tiền)
            $qrText = "2|99|0708133735|Hung|{$amount}|{$desc}";
            $qrImage = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" . urlencode($qrText);
        } else {
            // Mã QR VietQR cho ngân hàng Techcombank (TCB), tài khoản đích
            $accountNo = '190387442'; // Số tài khoản Techcombank
            $accountName = 'TRAN TAN HUNG';
            $bankCode = 'TCB';

            $qrImage = "https://img.vietqr.io/image/{$bankCode}-{$accountNo}-compact.png?amount={$amount}&addInfo=" . urlencode($desc) . "&accountName=" . urlencode($accountName);
        }

        return view('payment.momo', compact('qrImage', 'amount', 'desc', 'invoice', 'type'));
    }
    public function paymentSuccess($invoice_id)
    {
        $invoice = Invoices::findOrFail($invoice_id);

        // Cập nhật trạng thái nếu chưa thanh toán
        if ($invoice->payment_status == 0) {
            $invoice->payment_status = 1;
            $invoice->save();

            // Gửi mail
            Notification::route('mail', $invoice->email)
                ->notify(new InvoicePaidNotification($invoice));
        }

        return view('payment.success', ['invoice' => $invoice]);
    }
    public function sendInvoicePaidMail($invoice_id)
{
    $invoice = Invoices::findOrFail($invoice_id);

    if ($invoice->payment_status == 1) {
        \Illuminate\Support\Facades\Notification::route('mail', $invoice->email)
            ->notify(new InvoicePaidNotification($invoice));
    }

    return 'Mail sent!';
}
}
