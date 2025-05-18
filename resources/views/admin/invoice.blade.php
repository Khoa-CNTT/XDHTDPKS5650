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
                <th>Code</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Payment Method</th>
                <th>Note</th>
                <th>Total</th>
                <th>Type</th>
                <th>Status payment</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($invoices as $invoice)
                <tr>
                    <td>{{ $invoice->id }}</td>
                    <td>{{ $invoice->code }}</td>
                    <td>{{ $invoice->name }}</td>
                    <td>{{ $invoice->email }}</td>
                    <td>{{ $invoice->phone }}</td>
                    <td>
                        @if ($invoice->paymentMethod == 0)
                            Indirect payment
                        @elseif ($invoice->paymentMethod == 1)
                            Direct payment
                        @endif
                    </td>
                    <td>{{ $invoice->note ? $invoice->note : 'None' }}</td>
                    <td>{{ number_format($invoice->total, 0, ',', '.') }} ₫</td>
                    <td>{{ $invoice->type }}</td>
                    <td>
                        @if($invoice->payment_status)
                            <span class="text-success"><i class="fas fa-check"></i> Paid</span>
                        @else
                            <span class="text-danger"><i class="fas fa-times"></i> Unpaid</span>
                        @endif
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endsection
