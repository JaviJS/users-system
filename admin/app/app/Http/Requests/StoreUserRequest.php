<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
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
        $userId = $this->route('id');

        $rules = [
            'name'  => ['required', 'regex:/^[a-zA-ZñÑáéíóúüÁÉÍÓÚÜ ]+$/u', 'max:255'], 
            'email' => ['required', 'email', 'unique:users,email,'. $userId, 'max:255'], 
            'phone' => ['required', 'regex:/^\+56\d{9}$/'],
        ];

        if ($this->isMethod('post')) {
            $rules['email'] = ['required', 'email',  'unique:users,email'];
        }
        
        return $rules;
    }

    public function attributes()
    {
        return [
            'name'   => 'nombre completo',
            'email'  => 'correo electrónico',
            'phone'  => 'teléfono',
        ];
    }
}

   


