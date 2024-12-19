<?php

namespace App\Http\Requests\Main;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
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
            'name'=>'required',
            'email'=>'required|email|unique:users,email',
            'phone'=>'nullable|min:10|max:10',
            'password'=>'required|min:8|max:30',
            //'avatar'=>'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ];
    }
    public function messages()
    {
        return[
            'required'=>':attribute không được để trống',
            'email'=>':attribute sai định dạng',
            'unique'=>':attribute đã tồn tại',
            'min'=>':attribute phải nhiều hơn 8 ký tự',
            'max'=>':attribute phải ít hơn 30 ký tự',
            // 'image'=>':attribute không phải là ảnh',
            // 'mimes'=>':attribute phải định dạng jpeg,png,jpg,gif',
            'name.required' => 'Tên không được để trống',
            'email.required' => 'Email không được để trống',
            'email.email' => 'Email sai định dạng',
            'email.unique' => 'Email đã tồn tại',
            'password.required' => 'Mật khẩu không được để trống',
            'password.min' => 'Mật khẩu phải ít nhất 8 ký tự',
            'password.max' => 'Mật khẩu phải ít hơn 30 ký tự',
            'phone.min' => 'Số điện thoại phải có 10 ký tự',
            'phone.max' => 'Số điện thoại phải có 10 ký tự',
            // 'avatar.image' => 'Avatar không phải là ảnh',
            // 'avatar.mimes' => 'Avatar phải có định dạng jpeg, png, jpg, gif',
            // 'avatar.max' => 'Avatar quá kích thước',
        ];
    }
}
