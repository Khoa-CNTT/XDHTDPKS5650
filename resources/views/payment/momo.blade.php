<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Thanh toán hóa đơn</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #f7f9fc;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        .card {
            background: white;
            padding: 30px;
            border-radius: 16px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
            max-width: 400px;
            width: 100%;
            text-align: center;
        }

        .card h2 {
            color: #333;
            margin-bottom: 10px;
        }

        .card p {
            color: #555;
            margin: 6px 0;
        }

        .qr-box {
            margin: 20px 0;
            padding: 15px;
            background: #f0f2f5;
            border-radius: 12px;
        }

        .qr-box img {
            width: 250px;
            height: 250px;
            border-radius: 8px;
        }

        .footer-note {
            font-size: 14px;
            color: #888;
            margin-top: 10px;
        }

        .amount {
            font-size: 20px;
            font-weight: bold;
            color: #2b6cb0;
        }

        .desc {
            font-size: 15px;
            color: #666;
        }
    </style>
</head>
<body>

    <div class="card">
        <h2>Thanh toán hóa đơn</h2>
        <p><strong>Mã hoá đơn:</strong> {{ $invoice->code }}</p>
        <p class="amount">{{ number_format($amount, 0, ',', '.') }} VNĐ</p>
        <p class="desc">{{ $desc }}</p>

        <div class="qr-box">
            <img src="{{ $qrImage }}" alt="QR Code">
        </div>

        <div class="footer-note">
            Quét mã bằng {{ $type === 'momo' ? 'ứng dụng MoMo' : 'ứng dụng ngân hàng' }} để thanh toán.
        </div>
    </div>

</body>
</html>
