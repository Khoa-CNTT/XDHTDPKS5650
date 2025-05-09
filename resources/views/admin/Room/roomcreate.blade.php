@extends('layouts.app')

@section('content')
    <div class="container">
        <h2>Create Room</h2>

        @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
            @foreach ($errors->all() as $error)
            <li>{{ $error }}</li>
            @endforeach
            </ul>
        </div>
        @endif

        <form action="{{ route('rooms.store') }}" method="POST" enctype="multipart/form-data">
            @csrf

            <div class="mb-3">
                <label for="room_name" class="form-label">Room Name</label>
                <input type="text" id="room_name" name="room_name" class="form-control" placeholder="Enter room name" required>
            </div>

            <div class="mb-3">
                <label for="id_room_categories" class="form-label">Room Type</label>
                <select id="id_room_categories" name="id_room_categories" class="form-select" required>
                    @foreach ($roomType as $type)
                        <option value="{{ $type->id }}">{{ $type->room_type }}</option>
                    @endforeach
                </select>

            </div>

            <div class="mb-3">
                <label for="price" class="form-label">Price</label>
                <input type="number" id="price" name="price" class="form-control" placeholder="Enter price" required>
            </div>

            <div class="mb-3">
                <label for="status" class="form-label">Status</label>
                <select id="status" name="status" class="form-select" required>
                    <option value="1">Available</option>
                    <option value="0">Unavailable</option>
                </select>
            </div>

            <button type="submit" class="btn btn-primary">Save</button>
        </form>
    </div>
@endsection
