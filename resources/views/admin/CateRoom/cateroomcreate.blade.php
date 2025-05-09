@extends('layouts.app')

@section('content')
    <div class="container">
        <h2>Create Room Type</h2>
        @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
            @foreach ($errors->all() as $error)
            <li>{{ $error }}</li>
            @endforeach
            </ul>
        </div>
        @endif
        <form action="{{ route('categories.store') }}" method="POST" enctype="multipart/form-data">
            @csrf
            <div class="mb-3">
                <label for="roomType" class="form-label">Room Type</label>
                <input type="text" id="roomType" name="room_type" class="form-control" placeholder="Enter room type" required>
            </div>
            <div class="mb-3">
                <label for="adult" class="form-label">Adult</label>
                <input type="number" id="adult" name="adult" class="form-control" placeholder="Enter number of adults" required>
            </div>
            <div class="mb-3">
                <label for="children" class="form-label">Children</label>
                <input type="number" id="children" name="children" class="form-control" placeholder="Enter number of children" required>
            </div>
            <div class="mb-3">
                <label for="size" class="form-label">Size (m²)</label>
                <input type="number" id="size" name="size" class="form-control" placeholder="Enter room size" required>
            </div>
            <div class="mb-3">
                <label for="image" class="form-label">Image (URL)</label>
                <input type="text" id="image" name="image" class="form-control" placeholder="Enter image URL">
            </div>
            <div class="mb-3">
                <label for="status" class="form-label">Status</label>
                <select id="status" name="status" class="form-select" required>
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary">Save</button>
        </form>
    </div>
@endsection
