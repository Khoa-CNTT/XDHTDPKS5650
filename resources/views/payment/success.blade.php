<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Thanh toán thành công</title>
    <style>
        body {
            background: url('https://upload.wikimedia.org/wikipedia/vi/6/6c/Manchester_United_FC_crest.svg') no-repeat center center;
            background-size: 120px;
            font-family: Arial, sans-serif;
            padding: 50px;
            text-align: center;
        }
        .box {
            background-color: #ffffffcc;
            padding: 30px;
            border-radius: 20px;
            box-shadow: 0 0 12px #aaa;
            display: inline-block;
            max-width: 500px;
        }
        .box h2 {
            color: #2e8b57;
        }
        .info {
            text-align: left;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="box">
        <h2>✅ Thanh toán thành công</h2>
        <p>Mã hóa đơn: <strong>{{ $invoice->code }}</strong></p>
        <div class="info">
            <p><strong>Tên khách:</strong> {{ $invoice->name }}</p>
            <p><strong>Email:</strong> {{ $invoice->email }}</p>
            <p><strong>SĐT:</strong> {{ $invoice->phone }}</p>
            <p><strong>Phòng:</strong> {{ optional($invoice->room)->room_name }}</p>
            <p><strong>Tổng tiền:</strong> {{ number_format($invoice->total, 0, ',', '.') }} VNĐ</p>
            <p><strong>Thời gian:</strong> {{ $invoice->issueDate }} → {{ $invoice->dueDate }}</p>
        </div>
    </div>
</body>
</html>
