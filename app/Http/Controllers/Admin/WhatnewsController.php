<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Whatnews;
use App\Models\User;
use Illuminate\Http\Request;
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
        $whatnews = Whatnews::with('user')
            ->orderBy("created_at","desc")
            ->paginate(15)
            ->onEachSide(1);

        return response()->json([
            "whatnews" => $whatnews

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
    public function store()
    {

        $valid = request()->validate([
            "title" => ["required","min:8"],
            "body" => ["required","min:50"]
        ]);

        if(!$valid):
            return response()->json([
                "errors" => $valid->errors
            ]);
        else:
            Whatnews::create([
                "whatnews_title" => request()->title,
                "whatnews_body" => xx_clean(request()->body),
                "user_id" => Auth::user()->id,
                "is_public" => !request()->is_public?0:1
            ]);

            $msg = "<span class=\"badge badge-success\">
                Success: item has been created</span>";
        endif;

        return response()->json([
            "msg" => $msg
        ]);

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Whatnews  $whatnews
     * @return \Illuminate\Http\Response
     */
    public function show(Whatnews $whatnews)
    {
        //dd($whatnews);
        return view("Admin.Whatnews.show")->with(["whatnews" => $whatnews]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Whatnews  $whatnews
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $wm = Whatnews::findOrFail($id);
        return response()->json(["wm" => $wm],200);
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
        $valid = request()->validate([
            "title" => ["required","min:10"],
            "body" => ["required","min:50"]
        ]);

        

        $msg = "";
        if(!$valid):
            //$msg = "There is something wrong ";
            return response()->json([
                "errors" => $valid->errors()
            ],401); 
        else:
        Whatnews::where("id",$whatnews->id)
            ->update([
                "whatnews_title" => request()->title,
                "whatnews_body" => xx_clean(request()->body),
                "is_public" => !request()->is_public?0:1

            ]);


        $msg = "<span class=\"alert alert-success\">
            Success : item has been updated</span>";
            
        endif;
        return response()->json(["msg" => $msg],200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Whatnews  $whatnews
     * @return \Illuminate\Http\Response
     */
    public function destroy(Whatnews $whatnews)
    {
        $whatnews->delete();
        $msg = "<span class=\"alert alert-success\">
            item has been removed</span>";
        return response()->json([
            "msg" => $msg
        ]);
    }
}
