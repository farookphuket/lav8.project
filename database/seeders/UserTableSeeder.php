<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\User;
use App\Models\Role;

use Illuminate\Support\Facades\Hash;
use DB;
use Eloquent;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //$this->makeUser();

        Eloquent::unguard();
        $path = 'DB/user_list.sqlite';
        DB::unprepared(file_get_contents($path));
        $this->command->info("User has been Created!!");
    }

    public function makeUser(){

        $farook = User::create([
            'name' => 'farook',
            'email' => 'farook@me.me',
            'password' => Hash::make('password'),
            'is_admin' => true
        ]);

        $admin = User::create([
            'name' => 'admin',
            'email' => 'admin@mylap.me',
            'password' => Hash::make('password'),
            'is_admin' => true
        ]);
        $member = User::create([
            'name' => 'test',
            'email' => 'test@mylap.me',
            'password' => Hash::make('password')
        ]);

        $roleAdmin = Role::create([
            "role_name" => "admin"
        ]);

        $roleMember = Role::create([
            "role_name" => "member"
        ]); 

        $farook->roles()->attach($roleAdmin);
        $admin->roles()->attach($roleAdmin);
        $member->roles()->attach($roleMember);
        return true;

    }
}
