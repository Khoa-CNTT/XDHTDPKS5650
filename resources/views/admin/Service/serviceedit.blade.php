@extends('layouts.app')

@section('content')
    <div class="container">
        <h2>Edit Service</h2>

        @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
            @foreach ($errors->all() as $error)
            <li>{{ $error }}</li>
            @endforeach
            </ul>
        </div>
        @endif

        <form action="{{ route('services.update', [$service->id]) }}" method="POST">
            @method('PUT')
            @csrf

            <div class="mb-3">
                <label for="service_name" class="form-label">Service Name</label>
                <input type="text" id="service_name" name="service_name" class="form-control" value="{{ $service->service_name }}" required>
            </div>

            <div class="mb-3">
                <label for="price" class="form-label">Price</label>
                <input type="text" id="price" name="price" class="form-control" value="{{ (int)$service->price }}" required>
            </div>

            <button type="submit" class="btn btn-warning">Update</button>
        </form>
    </div>
@endsection

