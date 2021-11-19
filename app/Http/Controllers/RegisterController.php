<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use DB;

class RegisterController extends Controller
{
    protected $confirm_table = "password_resets";
    protected $user_table = "users";
    protected $user_role_table = "role_user";
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return view("auth.register");

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
        // validate form 
        $validate = request()->validate([
            "name" => ["required","string","unique:users,name"],
            "email" => ["required","email","unique:users,email"],
            "password" => ["required","min:6",
            "confirmed","required_with:password_confirmation"],
            "password_confirmation" => ["required","same:password"]
        ]);

        // unset the password_confirmation 
        unset($validate["password_confirmation"]);

        // hash the password
        $validate["password"] = Hash::make(request()->password);

        // create new user
        User::create($validate);
        
        // attach the new user to role member 
        $getUser = User::latest()->first();
        DB::table("role_user")
            ->insert([
                "user_id" => $getUser->id,
                "role_id" => '2',
                "created_at" => now(),
                "updated_at" => now()
            ]);
        // sent the user confirmation link via email
        $this->sentUserConfirm();

        $msg = "<span class=\"alert alert-success\">Success: 
            you have registerd!</span>";
        return response()->json([
            "msg" => $msg
        ]);
    }

    public function sentUserConfirm(){

        $get = User::where("email",request()->email)->first();

        $str = Str::random(60);  
        $link = URL::to("/userHasConfirmed/{$str}"); 
        $website = request()->getHttpHost();

        // --- add data 
        DB::table($this->confirm_table)->insert([
            "email" => $get->email,
            "token" => $str,
            "created_at" => now()
        ]);
        $data = array(
            "name" => $get['name'],
            "title" => 'Please DO-NOT-REPLY!',
            "link" => $link,
            "website" => $website
        );
        Mail::send('mail.user-confirmation-email',$data,function($msg) use ($get){
            $msg->from('no-reply@'.request()->getHttpHost());
            $msg->to($get['email'],'no-reply-back')->subject("Dear 
            {$get['name']} thank you for join us!
            ");
        });
    }

    public function userHasConfirmed($token){

        $get = DB::table($this->confirm_table)
                ->whereDate('created_at',date("Y-m-d"))
                ->where("token",$token)->first();
        if(isset($get->email)):
            // update email confirm for this user 
            User::where("email",$get->email)
            ->update([
                "email_verified_at" => now()
            ]);
            // make a backup for this new user 
            $this->backupUser();
            $msg = "<span class=\"alert alert-success\">
Tank you for join us!</span>";
        else:
        $msg = "<span class=\"alert alert-danger\">
Sorry : but the link is seem to be expired</span>";
        endif;

        return view("auth.user-has-confirmed")->with([
            "msg" => $msg
        ]);
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

    /* ============ make backup user */
    public function backupUser(){
        $u = User::latest()->first();
        $file = base_path("DB/user_list.sqlite");
        $cont = "/* =========backup user ".date("Y-m-d H:i:s");
        $cont .= " =========================== */";
        $cont .= "
INSERT INTO `{$this->user_table}`(`name`,`email`,`password`,`email_verified_at`,
`created_at`,`updated_at`) VALUES(
    '{$u->name}','{$u->email}','{$u->password}',
    '{$u->email_verified_at}','{$u->created_at}','{$u->updated_at}');

/* =========== attach the user {$u->name} to role member ======== */ 
 INSERT INTO `{$this->user_role_table}`(`user_id`,`role_id`,`created_at`,
     `updated_at`)VALUES(
         '{$u->id}','2','{$u->created_at}','{$u->updated_at}');
";
        write2text($file,$cont);


    }
    /* ============ make backup user */

}
