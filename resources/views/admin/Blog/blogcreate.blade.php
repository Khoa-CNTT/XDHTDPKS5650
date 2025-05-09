@extends('layouts.app')

@section('content')
    <div class="container">
        <h2>Create Blog</h2>

        @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
            @foreach ($errors->all() as $error)
            <li>{{ $error }}</li>
            @endforeach
            </ul>
        </div>
        @endif

        <form action="{{ route('blogs.store') }}" method="POST" enctype="multipart/form-data">
            @csrf

            <div class="mb-3">
                <label for="blog_name" class="form-label">Blog Name</label>
                <input type="text" id="blog_name" name="blog_name" class="form-control" placeholder="Enter blog name" required>
            </div>

            <div class="mb-3">
                <label for="short_describe" class="form-label">Short Description</label>
                <textarea id="short_describe" name="short_describe" class="form-control" placeholder="Enter short description" rows="3" required></textarea>
            </div>

            <div class="mb-3">
                <label for="detail_describe" class="form-label">Detail Description</label>
                <textarea id="detail_describe" name="detail_describe" class="form-control" placeholder="Enter detail description" rows="5" required></textarea>
            </div>

            <div class="mb-3">
                <label for="status" class="form-label">Status</label>
                <select id="status" name="status" class="form-select" required>
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                </select>
            </div>

            <div class="mb-3">
                <label for="img" class="form-label">Image (URL)</label>
                <input type="text" id="img" name="img" class="form-control" placeholder="Enter image URL">
            </div>

            <button type="submit" class="btn btn-primary">Save</button>
        </form>
    </div>
@endsection
