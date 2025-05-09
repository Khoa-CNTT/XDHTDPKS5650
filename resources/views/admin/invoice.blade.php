@extends('layouts.app')

@section('content')
<div class="container py-4">
    <h2>Invoices</h2>
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
                <th>User</th>
                <th>Room</th>
                <th>Order</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Payment Method</th>
                <th>Note</th>
                <th>Total</th>
                <th>Type</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($invoices as $invoice)
                <tr>
                    <td>{{ $invoice->id }}</td>
                    <td>{{ $invoice->user->name ?? 'N/A' }}</td>
                    <td>{{ $invoice->room->name ?? 'N/A' }}</td>
                    <td>{{ $invoice->order->id ?? 'N/A' }}</td>
                    <td>{{ $invoice->firstName }}</td>
                    <td>{{ $invoice->lastName }}</td>
                    <td>{{ $invoice->email }}</td>
                    <td>{{ $invoice->phone }}</td>
                    <td>{{ $invoice->paymentMethod }}</td>
                    <td>{{ $invoice->note }}</td>
                    <td>${{ number_format($invoice->total, 2) }}</td>
                    <td>{{ $invoice->type }}</td>
                    <td>{{ $invoice->status ? 'Paid' : 'Unpaid' }}</td>
                    <td>
                        <form action="{{ route('invoices.change') }}" method="POST" style="display: inline-block;">
                            @csrf
                            <input type="hidden" name="id" value="{{ $invoice->id }}">
                            <button type="submit" class="btn btn-sm {{ $invoice->status ? 'btn-danger' : 'btn-success' }}">
                                {{ $invoice->status ? 'Mark as Unpaid' : 'Mark as Paid' }}
                            </button>
                        </form>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endsection
