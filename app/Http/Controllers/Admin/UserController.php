<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Role;
use Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $users = User::where('name','!=','farook')
                    ->orderBy('created_at','desc')
                                ->paginate(10);
        return view('Admin.Users.index')->with([
            'users'=>$users
        ]);
    }

    public function getUserList(){
        $users = User::with("roles")
            ->orderBy("created_at","desc")
            ->paginate(3)
            ->onEachSide(1);

        $roles = Role::all();
        return response()->json([
            "users" => $users,
            "roles" => $roles
        ]);
    }



    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store()
    {


        $user = User::create([
            "name" => request()->name,
            "email" => request()->email,
            "password" => Hash::make("password")
        ]);
        $nUser = User::where("id",$user->id)->first();
        $nUser->roles()->attach(request()->roles);
        $msg = "<span class=\"alert alert-success\">
            User has been created!</span>";
        return response()->json(["msg" => $msg]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */


    public function show(User $user)
    {
        return response()->json(["user" => $user]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $user = User::where("id",$id)->with("roles")->get();

        return response()->json(["user" => $user]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update($id)
    {
        $user = User::where("id",$id)->update([
            "name" => request()->name,
            "email" => request()->email,
            "updated_at" => now()
        ]); 

        $user = User::where("id",$id)->first();
        $user->roles()->sync(request()->roles);
        $msg = "<span class=\"alert alert-success\">
            user has been updated</span>";
        return response()->json(["msg" => $msg]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        if(Auth::user()->id == $user->id):
            $msg = "<span class=\"alert alert-danger\">
            you cannot delete your self</span>";
        else:
            $del = $user;
            $del->delete();
            $del->roles()->detach();
            $msg = "<span class=\"alert alert-success\">
            user has been Deleted!</span>";
        endif;

        return response()->json(["msg" => $msg]);
    }
}
