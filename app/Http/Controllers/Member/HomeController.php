<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Template;
use App\Models\Whatnews;
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
        //
        if(Auth::user()->is_admin):
            return redirect()->route("admin.home.index");
        endif;
        $wn = Whatnews::where('is_public',1)
                       ->orWhere('user_id',Auth::user()->id)
                       ->orderBy('created_at','desc')
                       ->paginate(6);
        $templates = Template::where("section","whatnews")->get();
        //dd($wn);
        return view('Member.index')->with([
            "whatnews" => $wn,
            "templates" => $templates
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
        $valid = request()->validate([
            "title" => ["required","min:8"]
        ]);
        if(!$valid):
            $msg = "Error : NOT PASS form validation!";
        else:
            Whatnews::create([
                "whatnews_title" => request()->title,
                "whatnews_body" => xx_clean(request()->body),
                "user_id" => Auth::user()->id,
                "is_public" => !request()->is_public?0:1
            ]);

        $msg = "<span class=\"alert alert-success\">
            your post has created</span>";
        endif;

        return response()->json(['msg' => $msg]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $wn = Whatnews::where('id',$id)->get();
        return response()->json(['wm_item' => $wn],200);
    }

    public function profile(){
        
        $user = User::where('id',Auth::user()->id)->first();
        //dd($user);
        return view('Member.profile')->with([
            "user_info" => $user
        ]);

    }

    public function updateUserProfile(){



     $validate =  request()->validate([
            'name' => ['required','min:3'],
            "email" => ["required","email:rfc"],
            "passconf" => ["required"]
        ]);


     if(!Hash::check(request()->passconf,Auth::user()->password)):
        $msg = "<span class=\"badge badge-danger\">Error : wrong password!</span>";
     else:
         $has_passwd_message = "";
         if(isset(request()->passwd)):
             $validate = request()->validate([
                 "passwd" => ["min:8"]
             ]);

            // just for debugging
            $this->updatePassword();
            $has_passwd_message = " and your new password ";
         else:

            $this->updateInfo();
         endif;

        $msg = "<span class=\"badge badge-success\">Success : your profile {$has_passwd_message} changed has been save! </span>";
     endif;

        return response()->json([
            "msg" => $msg
        ]);
    }

    public function updateInfo(){
        $name = Auth::user()->name;
        User::where('id',Auth::user()->id)
            ->update([
                "name" => request()->name,
                "email" => request()->email,
                "updated_at" => now()
            ]);
        return $name;
    }
    public function updatePassword(){
        $name = Auth::user()->name;
        $pHash = Hash::make(request()->passwd);
        User::where('id',Auth::user()->id)
            ->update([
                "password" => $pHash
            ]);
        return $name;
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $wm = Whatnews::findOrFail($id);
        return response()->json(['editMe'=>$wm],200);
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
        //
        $valid = request()->validate([
            "title" => ["required","min:8"],
            "body" => ["required","min:50"]
        ]);
        if(!$valid):
            $msg = "Error : form validation";
        else:
            Whatnews::where("id",$id)
                ->update([
                    "whatnews_title" => request()->title,
                    "whatnews_body" => xx_clean(request()->body),
                    "is_public" => !request()->is_public?0:1,
                    "updated_at" => now()
                ]);
        $msg = "<span class=\"alert alert-success\">
Your post @{$id} has been updated</span>";
        endif;
        return response()->json([
            "msg" => $msg
        ],200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $del = Whatnews::findOrFail($id);
        $del->delete();

        $msg = "the item has been deleted";
        return response()->json([
            "msg" => $msg
        ],200);
    }
}
