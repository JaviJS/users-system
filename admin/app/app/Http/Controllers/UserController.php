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
    public function index(Request $request)
    {
        try {

            $search = $request->query('search');

            $searchItems = ['name', 'email', 'phone'];
            $searchWords = explode(' ', $search);
            $orWhere = [];

            foreach ($searchWords as $word) {
                foreach ($searchItems as $filter) {
                    $orWhere[] = [$filter, 'LIKE', '%' . $word . '%'];
                }
            }

            $users = User::query()
                ->when(!empty($searchWords), function ($query) use ($searchWords, $searchItems) {
                    $query->where(function ($q) use ($searchWords, $searchItems) {

                        foreach ($searchWords as $word) {
                            $q->where(function ($q2) use ($word, $searchItems) {
                                foreach ($searchItems as $index => $field) {
                                    if ($index === 0) {
                                        $q2->where($field, 'LIKE', "%$word%");
                                    } else {
                                        $q2->orWhere($field, 'LIKE', "%$word%");
                                    }
                                }
                            });
                        }
                    });
                })
                ->get();

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

            $user = $user->update($request->all());

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

            $user = $user->delete();

            if (!$user) {
                throw new Exception('Error al eliminar a usuario.', 500);
            }

            return response()->json(['code' => 200, 'status' => true, 'message' => 'Usuario eliminado con éxito.']);

        } catch (\Throwable $th) {
            return response()->json(['code' => $th->getCode(), 'status' => false, 'message' => $th->getMessage()]);
        }
    }
}
