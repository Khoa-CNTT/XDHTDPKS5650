<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login</title>

    <!-- Bootstrap 5 CDN -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Google Fonts & Custom Style -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
            color: #fff;
        }

        .card {
            background-color: #1e293b;
            border: none;
            border-radius: 12px;
            padding: 2rem;
            color: #fff;
        }

        .form-control {
            background-color: #334155;
            border: 1px solid #475569;
            color: #fff;
        }

        .form-control:focus {
            box-shadow: none;
            border-color: #60a5fa;
        }

        .btn-primary {
            background-color: #3b82f6;
            border: none;
        }

        .btn-primary:hover {
            background-color: #2563eb;
        }

        .invalid-feedback {
            color: #f87171;
        }

        .alert-danger {
            background-color: #dc2626;
            border: none;
        }

        .alert-success {
            background-color: #16a34a;
            border: none;
        }
    </style>
</head>
<body>

<div class="d-flex justify-content-center align-items-center vh-100">
    <div class="card shadow w-100" style="max-width: 420px;">
        <h3 class="text-center mb-4"> Admin Login</h3>

        {{-- Hiển thị thông báo lỗi --}}
        {{-- Hiển thị thông báo thành công --}}
        @if (session('success'))
            <div class="alert alert-success">{{ session('success') }}</div>
        @endif

        {{-- Hiển thị lỗi --}}
        @if ($errors->any())
            <div class="alert alert-danger">
                <ul class="mb-0">
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <form action="{{ route('login.post') }}" method="POST">
    @csrf

    <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
            type="email"
            name="email"
            id="email"
            class="form-control"
            placeholder="Enter email"
            value="{{ old('email') }}"
            required
        >
        @error('email')
            <div class="invalid-feedback">{{ $message }}</div>
        @enderror
    </div>

    <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input
            type="password"
            name="password"
            id="password"
            class="form-control"
            placeholder="Enter password"
            required
        >
        @error('password')
            <div class="invalid-feedback">{{ $message }}</div>
        @enderror
    </div>

    <div class="mb-3">
        <label class="form-label">Đăng nhập với vai trò:</label>
        <div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="role" id="admin" value="admin" checked>
                <label class="form-check-label" for="admin">Admin</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="role" id="staff" value="staff">
                <label class="form-check-label" for="staff">Staff</label>
            </div>
        </div>
        @error('role')
            <div class="text-danger mt-1">{{ $message }}</div>
        @enderror
    </div>

    <button type="submit" class="btn btn-primary w-100">Login</button>
</form>

    </div>
</div>

</body>
</html>
