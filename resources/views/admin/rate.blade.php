@extends('layouts.app')

@section('content')
<div class="container py-4">
    <h2>Rate</h2>

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
                <th>Room</th>
                <th>Stars</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($rate as $rate)
                <tr>
                    <td>{{ $rate->id }}</td>
                    <td>{{ $rate->user->name ?? 'N/A' }}</td>
                    <td>{{ $rate->room->room_name ?? 'N/A' }}</td>
                    <td>{{ $rate->stars }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</div>

<!-- Delete Rate Modal -->
<div class="modal fade" id="deleteRateModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <form id="deleteRateForm" action="" method="POST">
                @csrf
                @method('DELETE')
                <div class="modal-header bg-danger text-white">
                    <h5 class="modal-title"><i class="fas fa-trash-alt me-2"></i>Delete Rating</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Are you sure you want to delete this rating?</p>
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
        const deleteButtons = document.querySelectorAll('.btn-delete-rate');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function () {
                const rateId = this.getAttribute('data-id');
                const deleteForm = document.getElementById('deleteRateForm');
                deleteForm.action = `/rates/${rateId}`;
            });
        });
    });
</script>
@endsection
