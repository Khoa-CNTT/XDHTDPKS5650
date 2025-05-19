{{-- filepath: c:\xampp\htdocs\BE_Hotel\Hotel_backup_1\Hotel_1\resources\views\admin\user.blade.php --}}
@extends('layouts.app')

@section('content')
<div class="container py-4">
    <h2>Quản lý User</h2>
    <table class="table table-bordered bg-white">
        <thead class="table-secondary">
            <tr>
                <th>Tên</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Địa chỉ</th>
                <th>Avatar</th>
                <th>Quốc gia</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($users as $user)
                <tr>
                    <td>{{ $user->name }}</td>
                    <td>{{ $user->email }}</td>
                    <td>{{ $user->phone }}</td>
                    <td>{{ $user->address }}</td>
                    <td>
                        @if ($user->avatar)
                            <img src="{{ $user->avatar }}" alt="avatar" style="width:40px;height:40px;object-fit:cover;">
                        @else
                            <span class="text-muted">Không có</span>
                        @endif
                    </td>
                    <td>{{ $user->country }}</td>
                    <td>
                        <button class="btn btn-danger btn-sm btn-delete-user"
                                data-user-id="{{ $user->id }}"
                                data-user-name="{{ $user->name }}">
                            Delete
                        </button>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
</div>

<!-- Modal xác nhận xóa -->
<div class="modal fade" id="deleteUserModal" tabindex="-1" aria-labelledby="deleteUserModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <form id="deleteUserForm" method="POST">
        @csrf
        @method('DELETE')
        <div class="modal-header">
          <h5 class="modal-title" id="deleteUserModalLabel">Xác nhận xóa user</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Đóng"></button>
        </div>
        <div class="modal-body">
          Bạn có chắc muốn xóa user <strong id="deleteUserName"></strong>?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
          <button type="submit" class="btn btn-danger">Xóa</button>
        </div>
      </form>
    </div>
  </div>
</div>

@endsection

@push('scripts')
<script>
document.addEventListener('DOMContentLoaded', function () {
    var deleteUserModal = new bootstrap.Modal(document.getElementById('deleteUserModal'));
    var deleteUserForm = document.getElementById('deleteUserForm');
    var deleteUserName = document.getElementById('deleteUserName');

    document.querySelectorAll('.btn-delete-user').forEach(function(btn) {
        btn.addEventListener('click', function () {
            var userId = this.getAttribute('data-user-id');
            var userName = this.getAttribute('data-user-name');
            deleteUserForm.action = '/users/' + userId;
            deleteUserName.textContent = userName;
            deleteUserModal.show();
        });
    });
});
</script>
@endpush

