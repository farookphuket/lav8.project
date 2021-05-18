<?php

namespace App\Http\Controllers;


use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;
use DB;
use Carbon\Carbon;

class PasswordResetController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //not allow to direct access
        return redirect('/');
    }

    public function passreset($ti){


        $get = DB::table('password_resets')
                                    ->where('token',$ti)
                                    ->get();

        $since = '';
        $email = '';
        $token = '';

        foreach($get as $item):
            $since = strtotime($item->created_at)+(60*12);
            $email = $item->email;
            $token = $item->token;
        endforeach;

        $end = $since-time();
        $left = round((int)$end/60);

        $msg = "";

        if($end < 0):
            $msg = "<span class=\"badge badge-danger\">
            Sorry your link has expired! please try again later.</span>";
        else:
            $msg = "<span class=\"badge badge-success\"> 
                    you have  {$left}  minute left 
                    </span>";
        endif;
        
        //dd($msg);

        return view('auth.password-reset-form')->with([
            "msg" => $msg,
            "timeout" => $left,
            "email" => $email,
            "resettoken" => $token
                ]);
    }

    public function checkTimeLeft(){
        /* 
         * call by vue to check how long does user has left before the link has expire 
         * */
        $reqToken = request()->reqToken;
        return"check time";


    }

    public function hello(){

        $email = request()->email;

        $is_user = User::where('email',$email)
                                ->get();
        $num = count($is_user);

        $msg = '';
        $id = '';
        $user_mail = '';
        if($num == 0):
            $msg = "<span class=\"badge badge-danger\">Error : account not 
            found you have to register first!</span>";
        else:

            
            foreach($is_user as $it):
                $this->htmlMail($it->id);
                $user_mail = $it->email;
            endforeach;

                $msg = "<span class=\"badge badge-success\"> 
                    Success : please check your e-mail {$user_mail} </span>";
        
        endif;

        return response()->json([
            'msg' => $msg
        ],200);
    }


    public function htmlMail($u){

        $get = User::find($u)->toArray();

        $str_ran = Str::random(60);
        $link = URL::to('/passreset/'.$str_ran);

        

        DB::table('password_resets')->insert([
            'email' => $get['email'],
            'token' => $str_ran,
            'created_at' => now()
        ]);
    
        $data = array(
            "name" => $get['name'],
            "title" => 'Password Reset auto service DO-NOT-REPLY!',
            "reset_link" => $link
        );
        Mail::send('mail.reset-passwd-mail',$data,function($msg) use ($get){
            $msg->from('no-reply@cannot-reply.nohost');
            $msg->to($get['email'],'no-reply-back')->subject("Dear 
            {$get['name']} we notice that you sent a request for password reset!");
        });


    }



    public function getmyresetinfo(){
        $ip = getUserIp();
        
        // for the future improve
        return response()->json([
            'ip' => $ip
        ],200);
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
    public function show($token)
    {

        $get = DB::table('password_resets')
                                    ->where('token',$token)
                                    ->get();

        $since = '';
        $email = '';
        $token = '';

        foreach($get as $item):
            $since = strtotime($item->created_at)+(60*25);
            $email = $item->email;
            $token = $item->token;
        endforeach;

        $end = $since-time();
        $left = round((int)$end/60);

        $msg = "";

        if($end < 0):
            $msg = "<span class=\"badge badge-danger\">
            Sorry your link has expired! please try again later.</span>";
        else:
            $msg = "<span class=\"badge badge-success\">
                        you have  {$left}  minute left 
                    </span>";
        endif;
        
        //dd($msg);

        return response()->json([
            "email" => $email,
            "token" => $token,
            "msg" => $msg,
            "timeleft" => $left
        ]);
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
    public function update()
    {
        $email = request()->email;

        $pCheck = request()->validate([
            "passwd" => ["required","min:8"]
        ]);

        $passNew = request()->passwd;

        $pHash = Hash::make($passNew);
        $get = User::where('email',$email)->first();

        

        User::where('email',$email)
            ->update([
                'password' => $pHash,
                'updated_at' => now()
            ]);


        $msg = "<span class=\"badge badge-success\">your password has been 
            updated<br /> 
                you can login with your new password now </span>";

        return response()->json(['msg' => $msg],200);
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
