<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CommentRequest extends FormRequest
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
            'text' => ['required', 'string', function ($value, $fail) {
                $bannedWords = ['hỗn', 'tục', 'tuc', 'chửi', 'chui']; // Danh sách từ cấm
                foreach ($bannedWords as $word) {
                    if (stripos($value, $word) !== false) {
                        $fail('Your comment contains prohibited words!');
                    }
                }
            }],
            'id_parent' => 'nullable|exists:comments,id',
        ];
    }
    public function messages()
    {
        return [
            'text.required' => 'The comment cannot be empty!',
        ];
    }
}
