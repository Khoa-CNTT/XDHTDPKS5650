@extends('layouts.app')

@section('content')
    <div class="container">
        <h2>Edit Staff</h2>

        @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
            @foreach ($errors->all() as $error)
            <li>{{ $error }}</li>
            @endforeach
            </ul>
        </div>
        @endif

        <form action="{{ route('staffs.update', [$staff->id]) }}" method="POST" enctype="multipart/form-data">
            @method('PUT')
            @csrf

            <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" id="name" name="name" class="form-control" value="{{ $staff->name }}" required>
            </div>

            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" id="email" name="email" class="form-control" value="{{ $staff->email }}" required>
            </div>

            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" id="password" name="password" class="form-control"  placeholder="Enter new password (leave blank to keep current)">
            </div>

            <div class="mb-3">
                <label for="phone" class="form-label">Phone</label>
                <input type="text" id="phone" name="phone" class="form-control" value="{{ $staff->phone }}" required>
            </div>

            <div class="mb-3">
                <label for="address" class="form-label">Address</label>
                <input type="text" id="address" name="address" class="form-control" value="{{ $staff->address }}" required>
            </div>

            <div class="mb-3">
                <label for="avatar" class="form-label">Avatar (URL)</label>
                <input type="text" id="avatar" name="avatar" class="form-control" value="{{ $staff->avatar }}">
            </div>

            <!-- Hiển thị ảnh mẫu từ URL -->
            @if($staff->avatar)
            <div class="mb-3">
                <label for="avatarPreview" class="form-label">Avatar Preview</label>
                <img id="avatarPreview" src="{{ asset($staff->avatar) }}" alt="Avatar Preview" class="img-thumbnail" style="width: 150px;">
            </div>
            @endif

            <div class="mb-3">
                <label for="level" class="form-label">Level</label>
                <select id="level" name="level" class="form-select" required>
                    <option value="2" {{ $staff->level == 2 ? 'selected' : '' }}>Bậc thấp</option>
                    <option value="3" {{ $staff->level == 3 ? 'selected' : '' }}>Bậc cao</option>
                </select>

            </div>

            <button type="submit" class="btn btn-warning mb-3">Update</button>
        </form>
    </div>
@endsection
