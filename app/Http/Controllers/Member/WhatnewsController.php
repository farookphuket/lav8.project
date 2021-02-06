<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\Whatnews;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;
use Auth;

class WhatnewsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $getWhatNews = Whatnews::with("user")
            ->orderBy("created_at","desc")
            ->paginate(13)
            ->onEachSide(1);
        return response()->json(["whatnews" => $getWhatNews],200);
    }

    public function wnFullRead($id){
        $whatnews = Whatnews::with("user")
                            ->where("id",$id)
                            ->firstOrFail();

        return view("Member.whatnews.show")->with([
            "wn" => $whatnews,
        "meta_title" => $whatnews->whatnews_title]); 
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

        $valid = request()->validate(
            [
            "whatnews_title" => ['required','min:8'],
            "whatnews_body" => ['required','min:55'],
            ]
        );



        Whatnews::create([
            'user_id' => Auth::user()->id,
            'is_public' => request()->is_public?1:0,
            'whatnews_title' => request()->whatnews_title,
            'whatnews_body' => xx_clean(request()->whatnews_body)
        ]);

       // return redirect()->route('member.home.index')->with(Session::flash('success','your post has been created'));
        // do ajax on 10 Jan 2021
        $msg = "<span class=\"alert alert-success\">Data has been created!</span>";
        return response()->json([
            "msg" => $msg
        ],200);

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Whatnews  $whatnews
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $whatnews = Whatnews::with('user')->where('id',$id)->first();
        return response()->json(["whatnews" => $whatnews],200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Whatnews  $whatnews
     * @return \Illuminate\Http\Response
     */
    public function edit(Whatnews $whatnews)
    {
        return response()->json(["whatnews" => $whatnews],200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Whatnews  $whatnews
     * @return \Illuminate\Http\Response
     */
    public function update(Whatnews $whatnews)
    {
                
        $valid = request()->validate(
            [
            "whatnews_title" => ['required','min:8'],
            "whatnews_body" => ['required','min:15'],
            ]
        );


        $clean_body = xx_clean(request()->whatnews_body);

        Whatnews::where('id',$whatnews->id)->update([
            'is_public' => request()->is_public?1:0,
            'whatnews_title' => request()->whatnews_title,
            'whatnews_body' => $clean_body,
            'updated_at' => now()
        ]);

        $msg = "<span class=\"alert alert-success\">Success: item has been update</span>";
        return response()->json(['msg'=>$msg]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Whatnews  $whatnews
     * @return \Illuminate\Http\Response
     */
    public function destroy(Whatnews $whatnews)
    {
        //
        Whatnews::where('id',$whatnews->id)->delete();
        //return redirect()->route('member.home.index');
        $msg = "<span class=\"alert alert-success\">
            success item has been remove</span>";
        return response()->json(["msg" => $msg],200);
    }
}
