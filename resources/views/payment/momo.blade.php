
<div class="container py-4">
    <h2>Quét mã QR để thanh toán</h2>
    <p>Số tiền: <strong>{{ number_format($amount) }} VNĐ</strong></p>
    <p>Nội dung: <strong>{{ $desc }}</strong></p>
    <div>
        <img src="{{ $qrData }}" alt="QR Payment" style="max-width:300px;">
    </div>
    <p>Vui lòng quét mã bằng app ngân hàng hoặc ví điện tử để thanh toán.</p>
</div>
