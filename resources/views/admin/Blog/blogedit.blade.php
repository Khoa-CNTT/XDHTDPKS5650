@extends('layouts.app')

@section('content')
    <div class="container">
        <h2>Edit Blog</h2>

        @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
            @foreach ($errors->all() as $error)
            <li>{{ $error }}</li>
            @endforeach
            </ul>
        </div>
        @endif

        <form action="{{ route('blogs.update', [$blog->id]) }}" method="POST" enctype="multipart/form-data">
            @method('PUT')
            @csrf

            <div class="mb-3">
                <label for="blog_name" class="form-label">Blog Name</label>
                <input type="text" id="blog_name" name="blog_name" class="form-control" value="{{ $blog->blog_name }}" required>
            </div>

            <div class="mb-3">
                <label for="short_describe" class="form-label">Short Description</label>
                <textarea id="short_describe" name="short_describe" class="form-control" rows="3" required>{{ $blog->short_describe }}</textarea>
            </div>

            <div class="mb-3">
                <label for="detail_describe" class="form-label">Detail Description</label>
                <textarea id="detail_describe" name="detail_describe" class="form-control" rows="5" required>{{ $blog->detail_describe }}</textarea>
            </div>

            <div class="mb-3">
                <label for="status" class="form-label">Status</label>
                <select id="status" name="status" class="form-select" required>
                    <option value="1" {{ $blog->status == 1 ? 'selected' : '' }}>Active</option>
                    <option value="0" {{ $blog->status == 0 ? 'selected' : '' }}>Inactive</option>
                </select>
            </div>

            <div class="mb-3">
                <label for="image" class="form-label">Image (URL)</label>
                <input type="text" id="img" name="img" class="form-control" value="{{ $blog->img }}">
            </div>
            @if($blog->img)
            <div class="mb-3">
                <label for="imagePreview" class="form-label">Image Preview</label>
                <img id="img" src="{{ asset($blog->img) }}" alt="Image Preview" class="img-thumbnail" style="width: 150px;">
            </div>
            @endif

            <button type="submit" class="btn btn-warning">Update</button>
        </form>
    </div>
@endsection
