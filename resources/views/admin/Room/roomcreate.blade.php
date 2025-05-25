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
                <label for="price" class="form-label">Price (VNĐ)</label>
                <input type="number" id="price" name="price" class="form-control" placeholder="Enter price" required>
            </div>

            <div class="mb-3">
                <label class="form-label">Room Images</label>

                {{-- Option 1: Upload ảnh từ máy --}}
                <input type="file" name="upload_images[]" class="form-control mb-2" multiple>

                {{-- Option 2: Nhập link ảnh thủ công --}}
                <div id="image-links-container">
                    <input type="text" name="image_links[]" class="form-control mb-2" placeholder="Enter image URL">
                </div>
                <button type="button" class="btn btn-secondary btn-sm" onclick="addImageLink()">+ Add Image Link</button>
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
