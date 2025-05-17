@extends('layouts.app')

@section('content')
    <div class="container py-4">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2>Staff Management</h2>
            <a href="{{ route('staffs.create') }}" class="btn btn-primary">
                <i class="fas fa-plus me-1"></i> Create Staff
            </a>
        </div>
        {{-- Hiển thị thông báo lỗi --}}
        {{-- Hiển thị thông báo --}}
        @if (session('success'))
            <div class="alert alert-success">{{ session('success') }}</div>
        @endif
        @if (session('error'))
            <div class="alert alert-danger">{{ session('error') }}</div>
        @endif

        {{-- Bảng danh sách Staff --}}
        <table class="table table-bordered bg-white">
            <thead class="table-secondary">
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Avatar</th>
                    <th>Level</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($data as $staff)
                    <tr>
                        <td>{{ $staff->name }}</td>
                        <td>{{ $staff->email }}</td>
                        <td>{{ $staff->phone }}</td>
                        <td>{{ $staff->address }}</td>
                        <td>
                            @if ($staff->avatar)
                                <img src="{{ asset($staff->avatar) }}" alt="Avatar" class="rounded" width="50" height="50">
                            @else
                                <span>No Avatar</span>
                            @endif
                        </td>
                        <td>
                            @if ($staff->level == 2)
                                Bậc thấp
                            @else
                                Bậc cao
                            @endif
                        </td>
                        <td>
                            <a href="{{route('staffs.edit',[$staff->id])}}" class="btn btn-sm btn-warning">
                                <i class="fas fa-edit"></i> Edit
                            </a>
                            <button class="btn btn-sm btn-danger btn-delete-staff" data-bs-toggle="modal"
                                data-bs-target="#deleteStaffModal" data-staff="{{ json_encode($staff) }}">
                                <i class="fas fa-trash-alt"></i> Delete
                            </button>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    {{-- Modal Delete Staff --}}
    <div class="modal fade" id="deleteStaffModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <form id="deleteStaffForm" action="" method="POST">
                    @csrf
                    @method('DELETE')
                    <div class="modal-header bg-danger text-white">
                        <h5 class="modal-title"><i class="fas fa-trash-alt me-2"></i>Delete Staff</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>Are you sure you want to delete this staff?</p>
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
        const deleteButtons = document.querySelectorAll('.btn-delete-staff');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const staff = JSON.parse(this.getAttribute('data-staff'));
                const deleteForm = document.getElementById('deleteStaffForm');
                deleteForm.action = `/staffs/${staff.id}`;
            });
        });
    });
</script>
