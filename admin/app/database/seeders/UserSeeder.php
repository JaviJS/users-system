<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\{User};

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $usersPath = file_get_contents('database/data/users.json');
        $users = collect(json_decode($usersPath));

        $users->each(function ($u) {
            User::create([
                'name' => $u->name,
                'email' => $u->email,
                'phone' => $u->phone
            ]);
        });
    }
}