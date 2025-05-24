<?php

// app/Http/Controllers/PaymentController.php

namespace App\Http\Controllers;

use App\Models\Invoices;
use App\Notifications\InvoicePaidNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;

class PaymentController extends Controller
{
    public function showQRView(Request $request, $invoice_id)
    {
        $invoice = Invoices::findOrFail($invoice_id);

        $this->sendInvoicePaidMail($invoice_id);
        $amount = $invoice->total;
        $desc = 'THANH TOAN HOA DON ' . $invoice->code;

        $type = $request->query('type', 'bank');

        if ($type === 'momo') {
            $qrText = "2|99|0934895674|Thai|{$amount}|{$desc}";
            $qrImage = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" . urlencode($qrText);
        } else {
            $accountNo = '190387442';
            $accountName = 'TRAN TAN HUNG';
            $bankCode = 'TCB';

            $qrImage = "https://img.vietqr.io/image/{$bankCode}-{$accountNo}-compact.png?amount={$amount}&addInfo=" . urlencode($desc) . "&accountName=" . urlencode($accountName);
        }

        return view('payment.momo', compact('qrImage', 'amount', 'desc', 'invoice', 'type'));
    }
    public function getQRLink(Request $request, $invoice_id)
    {
        $type = $request->query('type', 'bank');

        // Tạo link đến view HTML
        $link = route('qr.view', ['invoice_id' => $invoice_id, 'type' => $type]);

        return response()->json([
            'qr_page_link' => $link
        ]);
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
        if(!$invoice_id) {
            return response()->json(['error' => 'Invoice ID is required'], 400);
        }
        $invoice = Invoices::findOrFail($invoice_id);
        \Illuminate\Support\Facades\Notification::route('mail', $invoice->email)
            ->notify(new InvoicePaidNotification($invoice));
        return 'Mail sent!';
    }
}
