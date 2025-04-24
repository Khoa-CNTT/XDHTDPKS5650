<?php

namespace App\Http\Requests\Staff;

use Illuminate\Foundation\Http\FormRequest;

class RoomRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'room_name'        => 'required|min:3',
            'price'             => 'required|numeric|min:0',
            'id_room_categories'=> 'required|exists:room_categories,id',
            'status'            => 'required|boolean',
        ];
    }

    public function messages()
    {
        return [
            'room_name.*'               => 'Tên Phòng Phải Từ 3 Ký Tự',
            'price.*'                   => 'Giá mặc định không được để trống',
            'id_room_categories.*'      => 'Loại Phòng không được để trống',
            'status.*'                  => 'Tình trạng không được để trống',
        ];
    }
}
