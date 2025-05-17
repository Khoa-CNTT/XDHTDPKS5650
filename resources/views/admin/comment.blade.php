@extends('layouts.app')

@section('content')
<div class="container py-4">
    <h2>Comments</h2>

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
                <th>User</th>
                <th>Text</th>
                <th>Parent Comment</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($comments as $comment)
                <tr>
                    <td>{{ $comment->id }}</td>
                    <td>{{ $comment->user->name ?? 'N/A' }}</td>
                    <td>{{ $comment->text }}</td>
                    <td>{{ $comment->id_parent ? 'Reply to #' . $comment->id_parent : 'N/A' }}</td>
                    <td>
                        <button class="btn btn-sm btn-danger btn-delete-comment" data-bs-toggle="modal" data-bs-target="#deleteCommentModal"
                                data-id="{{ $comment->id }}">
                            <i class="fas fa-trash-alt"></i> Delete
                        </button>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
</div>

<!-- Delete Comment Modal -->
<div class="modal fade" id="deleteCommentModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <form id="deleteCommentForm" action="" method="POST">
                @csrf
                @method('DELETE')
                <div class="modal-header bg-danger text-white">
                    <h5 class="modal-title"><i class="fas fa-trash-alt me-2"></i>Delete Comment</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Are you sure you want to delete this comment?</p>
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
        const deleteButtons = document.querySelectorAll('.btn-delete-comment');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function () {
                const commentId = this.getAttribute('data-id');
                const deleteForm = document.getElementById('deleteCommentForm');
                deleteForm.action = `/comments/${commentId}`;
            });
        });
    });
</script>
@endsection
