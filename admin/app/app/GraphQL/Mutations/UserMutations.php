<?php

namespace App\GraphQL\Mutations;

use App\Models\User;
use Illuminate\Validation\Rule;
use Exception;
use Validator;

class UserMutations
{
    public function createUser($root, array $args)
    {
        $validator = Validator::make($args['input'], [
            'name' => ['required', 'regex:/^[a-zA-ZñÑáéíóúüÁÉÍÓÚÜ ]+$/u', 'max:255'],
            'email' => ['required', 'email', 'unique:users,email', 'max:255'],
            'phone' => ['required', 'regex:/^\\+56\\d{9}$/']
        ], [], [
            'name' => 'nombre',
            'email' => 'correo electrónico',
            'phone' => 'teléfono'
        ]);

        $validator->validate();
        try {
            $user = User::create($args['input']);

            if (!$user) {
                throw new Exception('Error al crear a usuario.', 500);
            }

            return ['code' => 200, 'status' => true, 'message' => 'Usuario creado con éxito.', 'data' => $user];

        } catch (\Throwable $th) {
           return  ['code' => $th->getCode(), 'status' => false, 'message' => $th->getMessage(),  'data' => null];
        }
    }

    public function updateUser($root, array $args)
    {

        $id = $args['id'];

        $validator = Validator::make($args['input'], [
            'name' => ['required', 'regex:/^[a-zA-ZñÑáéíóúüÁÉÍÓÚÜ ]+$/u', 'max:255'],
            'email' => ['required', 'email', 'unique:users,email,' . $id, 'max:255'],
            'phone' => ['required', 'regex:/^\\+56\\d{9}$/']
        ], [], [
            'name' => 'nombre',
            'email' => 'correo electrónico',
            'phone' => 'teléfono'
        ]);

        $validator->validate();

        try {

            $user = User::find($id);

            if (!$user) {
                throw new Exception('Usuario no encontrado', 404);
            }

            $success = $user->update($args['input']);

            if (!$success) {
                throw new Exception('Error al modificar usuario.', 500);
            }

           return ['code' => 200, 'status' => true, 'message' => 'Usuario modificado con éxito.', 'data' => $user->fresh()];

        } catch (\Throwable $th) {
           return ['code' => $th->getCode(), 'status' => false, 'message' => $th->getMessage(),  'data' => null];
        }
    }

    public function deleteUser($root, array $args)
    {
        try {

            $id = $args['id'];

            $user = User::where('id', $id)->first();

            if (!$user) {
                throw new Exception('Usuario no encontrado', 404);
            }

            $user = $user->delete();

            if (!$user) {
                throw new Exception('Error al eliminar a usuario.', 500);
            }

            return ['code' => 200, 'status' => true, 'message' => 'Usuario eliminado con éxito.', 'data' => $user];

        } catch (\Throwable $th) {
            return ['code' => $th->getCode(), 'status' => false, 'message' => $th->getMessage(),  'data' => null];
        }
    }
}
