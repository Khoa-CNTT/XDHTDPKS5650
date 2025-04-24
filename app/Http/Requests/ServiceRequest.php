<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class ServiceRequest extends FormRequest
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
            'service_name'=>'required',
        ];
    }
    public function messages()
    {
        return[
            'required'=>':attribute không được để trống',
        ];
    }
    public function attributes()
    {
        return [
            'service_name'=>'Tên dịch vụ',
        ];
    }
}
