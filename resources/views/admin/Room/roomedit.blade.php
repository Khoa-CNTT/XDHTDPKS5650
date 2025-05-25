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

        <form action="{{ route('rooms.update', [$room->id]) }}" method="POST" enctype="multipart/form-data">
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

            <div class="mb-3">
                <label class="form-label">Current Images</label>
                <div>
                    @php
                        $images = [];
                        if (is_string($room->images)) {
                            $images = json_decode($room->images, true) ?: [];
                        } elseif (is_array($room->images)) {
                            $images = $room->images;
                        }
                    @endphp

                    @foreach ($images as $index => $img)
                        <div style="display: inline-block; position: relative; margin-right: 10px; margin-bottom: 10px;">
                            <img src="{{ $img }}" alt="Room Image" style="max-width: 150px; display: block;">
                            <label style="display: block; text-align: center;">
                                <input type="checkbox" name="remove_images[]" value="{{ $img }}">
                                Delete
                            </label>
                        </div>
                    @endforeach
                </div>
            </div>
            
            <div class="mb-3">
                <label class="form-label">Room Images</label>

                <input type="file" name="upload_images[]" class="form-control mb-2" multiple>

                <div id="image-links-container">
                    <input type="text" name="image_links[]" class="form-control mb-2" placeholder="Enter image URL">
                </div>
                <button type="button" class="btn btn-secondary btn-sm" onclick="addImageLink()">+ Add Image Link</button>
            </div>

            <button type="submit" class="btn btn-warning">Update</button>
        </form>
    </div>
@endsection
@section('scripts')
<script>
    function addImageLink() {
        const container = document.getElementById('image-links-container');
        const input = document.createElement('input');
        input.type = 'text';
        input.name = 'image_links[]';
        input.className = 'form-control mb-2';
        input.placeholder = 'Enter image URL';
        container.appendChild(input);
    }
</script>
@endsection
