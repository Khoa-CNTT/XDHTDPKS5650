@extends('layouts.app')

@section('content')
<div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>Service Management</h2>
        <a href="{{ route('services.create') }}" class="btn btn-primary">
            <i class="fas fa-plus me-1"></i> Create Service
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
                <th>Service Name</th>
                <th>Price</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($service as $service)
                <tr>
                    <td>{{ $service->id }}</td>
                    <td>{{ $service->service_name }}</td>
                    <td>{{ number_format($service->price, 0, ',', '.') }}</td>
                    <td>
                        <a href="{{ route('services.edit', [$service->id]) }}" class="btn btn-sm btn-warning">
                            <i class="fas fa-edit"></i> Edit
                        </a>
                        <button class="btn btn-sm btn-danger btn-delete-service" data-bs-toggle="modal" data-bs-target="#deleteServiceModal"
                            data-service="{{ json_encode($service) }}">
                            <i class="fas fa-trash-alt"></i> Delete
                        </button>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
</div>

<!-- Delete Service Modal -->
<div class="modal fade" id="deleteServiceModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <form id="deleteServiceForm" action="" method="POST">
                @csrf
                @method('DELETE')
                <div class="modal-header bg-danger text-white">
                    <h5 class="modal-title"><i class="fas fa-trash-alt me-2"></i>Delete Service</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Are you sure you want to delete this service?</p>
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
        const deleteButtons = document.querySelectorAll('.btn-delete-service');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function () {
                const service = JSON.parse(this.getAttribute('data-service'));
                const deleteForm = document.getElementById('deleteServiceForm');
                deleteForm.action = `/services/${service.id}`;
            });
        });
    });
</script>
@endsection
