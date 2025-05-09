@extends('layouts.app')

@section('content')
    <div class="container">
        <h2>Edit Category Product</h2>

        @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
            @foreach ($errors->all() as $error)
            <li>{{ $error }}</li>
            @endforeach
            </ul>
        </div>
        @endif

        <form action="{{ route('cateproducts.update', [$productType->id]) }}" method="POST">
            @method('PUT')
            @csrf
            <div class="mb-3">
                <label for="CateName" class="form-label">Category Name</label>
                <input type="text" id="CateName" name="CateName" class="form-control" value="{{ $productType->CateName }}" required>
            </div>
            <button type="submit" class="btn btn-warning">Update</button>
        </form>
    </div>
@endsection
