@extends('layouts.app')

@section('content')
    <div class="container">
        <h2>Edit Room Type</h2>

        @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
            @foreach ($errors->all() as $error)
            <li>{{ $error }}</li>
            @endforeach
            </ul>
        </div>
        @endif

        <form action="{{ route('cateproducts.update', [$roomType->id]) }}" method="POST">
            @method('PUT')
            @csrf

            <div class="mb-3">
                <label for="roomType" class="form-label">Room Type</label>
                <input type="text" id="roomType" name="room_type" class="form-control" value="{{ $roomType->room_type }}" required>
            </div>

            <div class="mb-3">
                <label for="adult" class="form-label">Adult</label>
                <input type="number" id="adult" name="adult" class="form-control" value="{{ $roomType->adult }}" required>
            </div>

            <div class="mb-3">
                <label for="children" class="form-label">Children</label>
                <input type="number" id="children" name="children" class="form-control" value="{{ $roomType->children }}" required>
            </div>

            <div class="mb-3">
                <label for="size" class="form-label">Size (m²)</label>
                <input type="number" id="size" name="size" class="form-control" value="{{ $roomType->size }}" required>
            </div>

            <div class="mb-3">
                <label for="image" class="form-label">Image (URL)</label>
                <input type="text" id="image" name="image" class="form-control" value="{{ $roomType->image }}">
            </div>

            <!-- Hiển thị ảnh mẫu từ URL -->
            @if($roomType->image)
            <div class="mb-3">
                <label for="imagePreview" class="form-label">Image Preview</label>
                <img id="imagePreview" src="{{ asset($roomType->image) }}" alt="Image Preview" class="img-thumbnail" style="width: 150px;">
            </div>
            @endif

            <div class="mb-3">
                <label for="status" class="form-label">Status</label>
                <select id="status" name="status" class="form-select" required>
                    <option value="1" {{ $roomType->status ? 'selected' : '' }}>Active</option>
                    <option value="0" {{ !$roomType->status ? 'selected' : '' }}>Inactive</option>
                </select>
            </div>

            <button type="submit" class="btn btn-warning mb-3">Update</button>
        </form>
    </div>
@endsection
