@extends('layouts.app')

@section('content')
    <div class="container py-4">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2>Room Types</h2>
            <a href="{{ route('categories.create') }}" class="btn btn-primary">
                <i class="fas fa-plus me-1"></i> Create Room Type
            </a>
        </div>

        {{-- Hiển thị thông báo --}}
        @if (session('success'))
            <div class="alert alert-success">{{ session('success') }}</div>
        @endif
        @if (session('error'))
            <div class="alert alert-danger">{{ session('error') }}</div>
        @endif

        {{-- Bảng danh sách Room Types --}}
        <table class="table table-bordered bg-white">
            <thead class="table-secondary">
                <tr>
                    <th>ID</th>
                    <th>Room Type</th>
                    <th>Adult</th>
                    <th>Children</th>
                    <th>Size</th>
                    <th>Image</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($data as $roomType)
                    <tr>
                        <td>{{ $roomType->id }}</td>
                        <td>{{ $roomType->room_type }}</td>
                        <td>{{ $roomType->adult }}</td>
                        <td>{{ $roomType->children }}</td>
                        <td>{{ $roomType->size }} m²</td>
                        <td>
                            @if ($roomType->image)
                                <img src="{{ $roomType->image }}" alt="Room Image" class="rounded" width="50" height="50">
                            @else
                                <span>No Image</span>
                            @endif
                        </td>
                        <td>{{ $roomType->status ? 'Active' : 'Inactive' }}</td>
                        <td>
                            <a href="{{route('categories.edit',[$roomType->id])}}"
                                class="btn btn-sm btn-warning"> Edit
                                <i class="fas fa-edit"></i>
                            </a>
                            <button class="btn btn-sm btn-danger btn-delete-room" data-bs-toggle="modal"
                                data-bs-target="#deleteRoomTypeModal" data-room="{{ json_encode($roomType) }}">
                                <i class="fas fa-trash-alt"></i> Delete
                            </button>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    {{-- Modal Delete Room Type --}}
    <div class="modal fade" id="deleteRoomTypeModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <form id="deleteRoomTypeForm" action="" method="POST">
                    @csrf
                    @method('DELETE')
                    <div class="modal-header bg-danger text-white">
                        <h5 class="modal-title"><i class="fas fa-trash-alt me-2"></i>Delete Room Type</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>Are you sure you want to delete this room type?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="submit" class="btn btn-danger"><i class="fas fa-trash-alt me-1"></i>Delete</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const deleteButtons = document.querySelectorAll('.btn-delete-room');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const room = JSON.parse(this.getAttribute('data-room'));
                const deleteForm = document.getElementById('deleteRoomTypeForm');
                deleteForm.action = `/categories/${room.id}`;
            });
        });
    });
</script>
