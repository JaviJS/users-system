<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use Illuminate\Http\Request;
use Exception;
use App\Models\User;
class UserController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {

            $users = User::all();
            
            return response()->json(['code' => 200, 'status' => true, 'message' => 'Usuarios listados con éxito.', 'data' => $users]);

        } catch (\Throwable $th) {
            return response()->json(['code' => $th->getCode(), 'status' => false, 'message' => 'Error al listar usuarios.']);
        }

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        try {

            $user = User::create($request->all());

            if (!$user) {
                throw new Exception('Error al crear a usuario.', 500);
            }

            return response()->json(['code' => 200, 'status' => true, 'message' => 'Usuario creado con éxito.', 'data' => $user]);

        } catch (\Throwable $th) {
            return response()->json(['code' => $th->getCode(), 'status' => false, 'message' => $th->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {

        try {

            $user = User::where('id', $id)->first();

            if (!$user) {
                throw new Exception('Usuario no encontrado', 404);
            }

            return response()->json(['code' => 200, 'status' => true, 'message' => 'Usuario encontrado con éxito.', 'data' => $user]);

        } catch (\Throwable $th) {
            return response()->json(['code' => $th->getCode(), 'status' => false, 'message' => $th->getMessage()]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreUserRequest $request, string $id)
    {
        try {

            $user = User::where('id', $id)->first();

            if (!$user) {
                throw new Exception('Usuario no encontrado', 404);
            }

            $user =  $user->update($request->all());

            if (!$user) {
                throw new Exception('Error al modificar usuario.', 500);
            }

            return response()->json(['code' => 200, 'status' => true, 'message' => 'Usuario modificado con éxito.', 'data' => $user]);

        } catch (\Throwable $th) {
            return response()->json(['code' => $th->getCode(), 'status' => false, 'message' => $th->getMessage()]);
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
         try {

            $user = User::where('id', $id)->first();

            if (!$user) {
                throw new Exception('Usuario no encontrado', 404);
            }

            $user =  $user->delete();

            if (!$user) {
                throw new Exception('Error al eliminar a usuario.', 500);
            }

            return response()->json(['code' => 200, 'status' => true, 'message' => 'Usuario eliminado con éxito.']);

        } catch (\Throwable $th) {
            return response()->json(['code' => $th->getCode(), 'status' => false, 'message' => $th->getMessage()]);
        }
    }
}
