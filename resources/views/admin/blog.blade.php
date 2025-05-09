@extends('layouts.app')

@section('content')
<div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>Blog Management</h2>
        <a href="{{ route('blogs.create') }}" class="btn btn-primary">
            <i class="fas fa-plus me-1"></i> Create Blog
        </a>
    </div>

    @if (session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif
    @if (session('error'))
        <div class="alert alert-danger">{{ session('error') }}</div>
    @endif

    <table class="table table-bordered bg-white">
        <thead class="table-secondary">
            <tr>
                <th>ID</th>
                <th>Blog Name</th>
                <th>Short Description</th>
                <th>Detail Description</th>
                <th>Status</th>
                <th>Image</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($blog as $blog)
                <tr>
                    <td>{{ $blog->id }}</td>
                    <td>{{ $blog->blog_name }}</td>
                    <td>{{ Str::limit($blog->short_describe, 50) }}</td>
                    <td>{{ Str::limit($blog->detail_describe, 50) }}</td>
                    <td>{{ $blog->status ? 'Active' : 'Inactive' }}</td>
                    <td>
                        @if ($blog->img)
                            <img src="{{ $blog->img }}" alt="Blog Image" class="rounded" width="50" height="50">
                        @else
                            <span>No Image</span>
                        @endif
                    </td>
                    <td>
                        <a href="{{ route('blogs.edit', $blog->id) }}" class="btn btn-sm btn-warning">
                            <i class="fas fa-edit"></i> Edit
                        </a>
                        <button class="btn btn-sm btn-danger btn-delete-blog" data-bs-toggle="modal" data-bs-target="#deleteBlogModal"
                            data-blog="{{ json_encode($blog) }}">
                            <i class="fas fa-trash-alt"></i> Delete
                        </button>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
</div>

<!-- Delete Blog Modal -->
<div class="modal fade" id="deleteBlogModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <form id="deleteBlogForm" action="" method="POST">
                @csrf
                @method('DELETE')
                <div class="modal-header bg-danger text-white">
                    <h5 class="modal-title"><i class="fas fa-trash-alt me-2"></i>Delete Blog</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Are you sure you want to delete this blog?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="submit" class="btn btn-danger"><i class="fas fa-trash-alt me-1"></i>Delete</button>
                </div>
            </form>
        </div>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function () {
        const deleteButtons = document.querySelectorAll('.btn-delete-blog');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function () {
                const blog = JSON.parse(this.getAttribute('data-blog'));
                const deleteForm = document.getElementById('deleteBlogForm');
                deleteForm.action = `/blogs/${blog.id}`;
            });
        });
    });
</script>
@endsection
