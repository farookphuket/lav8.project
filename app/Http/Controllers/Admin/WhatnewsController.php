<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Whatnews;
use App\Models\User;
use Illuminate\Http\Request;
use Auth;

use DB;

class WhatnewsController extends Controller
{
    protected $wn_table = "whatnews";
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
        Whatnews::create([
            "whatnews_title" => xx_clean(request()->title),
            "whatnews_body" => xx_clean(request()->body),
            "user_id" => Auth::user()->id,
            "is_public" => !request()->is_public?0:1
        ]);

        // make backup 
        $this->backupInsertWN();
        $msg = "<span class=\"badge badge-success\">
                Success: item has been created</span>";

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
                "whatnews_title" => xx_clean(request()->title),
                "whatnews_body" => xx_clean(request()->body),
                "is_public" => !request()->is_public?0:1

            ]);


        // update backup 
        $this->backupUpdateWN($whatnews->id);

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

    /* =========== backup script 2 Jul 2021 =================================*/
    public function backupInsertWN(){
        $get = Whatnews::latest()->first();
        $file = base_path("DB/whatnews_default.sqlite");
        $cont = "/* =============== auto backup `{$this->wn_table}`  =====*/";
        $cont .= "
INSERT INTO `{$this->wn_table}`(`user_id`,`whatnews_title`,`whatnews_body`,`is_public`,
`created_at`,`updated_at`) VALUES(
    '{$get->user_id}',
    '{$get->whatnews_title}',
    '{$get->whatnews_body}',
    '{$get->is_public}',
    '{$get->created_at}','{$get->updated_at}');
";
        write2text($file,$cont);
    }

    public function backupUpdateWN($id){
        $get = Whatnews::find($id);
        $file = base_path("DB/whatnews_default.sqlite");
        $update = "/* ======== update script `{$this->wn_table}` ==========*/";
        $update .= "
UPDATE `{$this->wn_table}` SET whatnews_title='{$get->whatnews_title}',
whatnews_body='{$get->whatnews_body}',
is_public='{$get->is_public}',
updated_at='{$get->updated_at}' 
WHERE id='{$get->id}';

";
        $update .= "/* ==== auto update script".date("Y-m-d H:i:s")." =====*/";
        write2text($file,$update);
    }

    /* =========== backup script 2 Jul 2021 =================================*/

}
