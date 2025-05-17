@extends('layouts.app')

@section('content')

    {{-- Sử dụng Bootstrap để căn giữa nội dung --}}
    {{-- Thêm class min-vh-100 để đảm bảo chiều cao tối thiểu là 100% viewport --}}
    {{-- Sử dụng Flexbox để căn giữa nội dung theo chiều dọc và chiều ngang --}}
    <div class="d-flex align-items-center justify-content-center min-vh-100">
        {{-- Container giữ nguyên để giới hạn chiều rộng nếu cần --}}
        <div class="container">
            {{-- Card chứa nội dung, thêm text-center để căn giữa text bên trong --}}
            <div class="card shadow text-center">
                {{-- Thêm card-body để cấu trúc tốt hơn và dễ dàng thêm padding --}}
                <div class="card-body p-5"> {{-- p-5 thêm padding lớn xung quanh nội dung --}}
                    {{-- Sử dụng display-* class cho tiêu đề lớn hơn, có thể đổi thành h1 --}}
                    <h1 class="display-4 mb-3">Welcome to Admin Dashboard</h1>
                    {{-- Sử dụng fs-* class cho đoạn văn lớn hơn --}}
                    <p class="fs-5">This is your admin page, where you can manage the system.</p>
                </div>
            </div>
        </div>
    </div>
@endsection
