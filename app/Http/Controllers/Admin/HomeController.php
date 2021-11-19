<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Whatnews;
use App\Models\Template;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Auth;

class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if(!Auth::user()->id):
            return redirect('login');
        else:
            $wn = Whatnews::latest()->paginate(15);
            $template = Template::where("section","whatnews")->get();
        return view('Admin.index')->with([
            "wnlist" => $wn,
            "template" => $template
        ]);

        endif;
    }


    
    public function profile(){
        
        $user = User::where('id',Auth::user()->id)->first();
        return view('Admin.profile')->with('user_info',$user);

    }


    public function updateadminprofile(){

        // run the validate methods
        request()->validate([
            "name" => ["required","min:3"],
            "email" => ["required","email","email:rfc"],
            "passconf" => ["required"]
        ]);
        $email = request()->email;
        $name = request()->name;
        $passwd = request()->passwd;
        $passconf = request()->passconf;

        if(!Hash::check($passconf,Auth::user()->password)):
            // will not update the profile because the password is incorrect
            $msg = "<span class=\"badge badge-danger\">Error : Wrong password</span>";
        else:
            
            
            $has_pass_msg = '';
            if($passwd):
                $exex = $this->updatePassAdmin();
                $curpass = Auth::user()->password; 
                $has_pass_msg = " and the curpas is {$curpass} the new pass {$exex}";
            else:
                $this->updateAdminInfo();
            endif;

            $msg = "<span class=\"badge badge-success\">Success : Profile {$has_pass_msg } has updated</span>";
        endif;


        return response()->json([
            'msg' => $msg
        ]);
    }

    public function updatePassAdmin(){

        $passnew = Hash::make(request()->passwd);
        User::where('id',Auth::user()->id)
            ->update([
                'password' => $passnew
            ]);
        return $passnew;

    }
    public function updateAdminInfo(){
        User::where('id',Auth::user()->id)
            ->update([
                'name' => request()->name,
                'email' => request()->email,
                'updated_at' => now()
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        //
    }
}
