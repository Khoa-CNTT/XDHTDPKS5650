@extends('layouts.app')

@section('content')
    <div class="container">
        <h2>Create Service</h2>

        @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
            @foreach ($errors->all() as $error)
            <li>{{ $error }}</li>
            @endforeach
            </ul>
        </div>
        @endif

        <form action="{{ route('services.store') }}" method="POST">
            @csrf

            <div class="mb-3">
                <label for="service_name" class="form-label">Service Name</label>
                <input type="text" id="service_name" name="service_name" class="form-control" placeholder="Enter service name" required>
            </div>
            <div class="mb-3">
                <label for="price" class="form-label">Price</label>
                <input type="text" id="prive" name="price" class="form-control" placeholder="Enter service price" required>
            </div>

            <button type="submit" class="btn btn-primary">Save</button>
        </form>
    </div>
@endsection
