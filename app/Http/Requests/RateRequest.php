<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;
use App\Models\Invoices;
use Illuminate\Support\Facades\Auth;

class RateRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Cho phép tất cả user login sử dụng request này
        return Auth::check();
    }

    public function rules(): array
    {
        return [
            'id_room' => 'required|exists:rooms,id',
            'stars' => 'required|integer|min:1|max:5',
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $id_user = Auth()->id();
            $id_room = $this->input('id_room');

            $hasBooked = Invoices::where('id_user', $id_user)
                                 ->where('id_room', $id_room)
                                 ->exists();

            if (!$hasBooked) {
                $validator->errors()->add('id_room', 'You must book this room before rating it.');
            }
        });
    }
}

