@extends('layouts.app')

@section('content')
    <div class="container">
        <h2>Edit Room</h2>

        @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
            @foreach ($errors->all() as $error)
            <li>{{ $error }}</li>
            @endforeach
            </ul>
        </div>
        @endif

        <form action="{{ route('rooms.update', [$room->id]) }}" method="POST">
            @method('PUT')
            @csrf

            <div class="mb-3">
                <label for="room_name" class="form-label">Room Name</label>
                <input type="text" id="room_name" name="room_name" class="form-control" value="{{ $room->room_name }}" required>
            </div>

            <div class="mb-3">
                <label for="room_type" class="form-label">Room Type</label>
                <select id="id_room_categories" name="id_room_categories" class="form-select" required>
                    @foreach ($roomType as $type)
                        <option value="{{ $type->id }}" {{ $room->id_room_categories == $type->id ? 'selected' : '' }}>
                            {{ $type->room_type }}
                        </option>
                    @endforeach
                </select>

            </div>

            <div class="mb-3">
                <label for="price" class="form-label">Price</label>
                <input type="number" id="price" name="price" class="form-control" value="{{ $room->price }}" required>
            </div>

            <div class="mb-3">
                <label for="status" class="form-label">Status</label>
                <select id="status" name="status" class="form-select" required>
                    <option value="1" {{ $room->status == 1 ? 'selected' : '' }}>Available</option>
                    <option value="0" {{ $room->status == 0 ? 'selected' : '' }}>Unavailable</option>
                </select>
            </div>

            <button type="submit" class="btn btn-warning">Update</button>
        </form>
    </div>
@endsection
