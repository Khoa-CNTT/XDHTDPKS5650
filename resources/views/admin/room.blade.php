@extends('layouts.app')

@section('content')
<div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>Rooms</h2>
        <a href="{{ route('rooms.create') }}" class="btn btn-primary">
            <i class="fas fa-plus me-1"></i> Create Room
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
                <th>Name</th>
                <th>Price</th>
                <th>Status</th>
                <th>Category</th>
                <th>More Services</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($data as $room)
                <tr>
                    <td>{{ $room->id }}</td>
                    <td>{{ $room->room_name }}</td>
                    <td>{{ number_format($room->price, 0, ',', '.') }} VNĐ</td>
                    <td>{{ $room->status ? 'Available' : 'Unavailable' }}</td>
                    @foreach ($roomType as $type)
                        @if ($room->id_room_categories == $type->id)
                            <td>{{ $type->room_type }}</td>
                        @endif
                    @endforeach
                    <td>{{ !empty($room->more_service) ? $room->more_service : 'None' }}</td>
                    <td>
                        <a href="{{route('rooms.edit',[$room->id])}}" class="btn btn-sm btn-warning">
                            <i class="fas fa-edit"></i> Edit
                        </a>
                        <button class="btn btn-sm btn-danger btn-delete-room" data-bs-toggle="modal" data-bs-target="#deleteRoomModal"
                            data-room="{{ json_encode($room) }}">
                            <i class="fas fa-trash-alt"></i> Delete
                        </button>
                        <button class="btn btn-sm btn-success btn-create-room-auto"
                                data-room-id="{{ $room->id }}">
                            <i class="fas fa-plus-circle"></i> Rental Detail auto
                        </button>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
</div>

<!-- Delete Room Modal -->
<div class="modal fade" id="deleteRoomModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <form id="deleteRoomForm" action="" method="POST">
                @csrf
                @method('DELETE')
                <div class="modal-header bg-danger text-white">
                    <h5 class="modal-title"><i class="fas fa-trash-alt me-2"></i>Delete Room</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Are you sure you want to delete this room?</p>
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
        const deleteButtons = document.querySelectorAll('.btn-delete-room');
        const buttons = document.querySelectorAll('.btn-create-room-auto');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function () {
                const room = JSON.parse(this.getAttribute('data-room'));
                const deleteForm = document.getElementById('deleteRoomForm');
                deleteForm.action = `/rooms/${room.id}`;
            });
        });
        buttons.forEach(button => {
            button.addEventListener('click', function () {
                const roomId = this.getAttribute('data-room-id');

                fetch('http://127.0.0.1:8000/api/staff/create-rental-detail', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-CSRF-TOKEN': '{{ csrf_token() }}'
                    },
                    body: JSON.stringify({
                        id_room: roomId
                    })
                })
                .then(response => response.json())
                .then(data => {
                    toastr.success('Đã tạo phòng tự động thành công!');
                })
                .catch((error) => {
                    toastr.error('Có lỗi xảy ra khi tạo phòng tự động!');
                });
            });
        });
    });
</script>
@endsection
