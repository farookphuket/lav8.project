<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Video;
use Auth;

class VideoController extends Controller
{


    protected $video_table;

    public function __construct(){
        $this->video_table = "videos";
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return view("Admin.Videos.index");
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getVideos(){
        $videos = Video::with("user")
            ->orderBy("created_at","DESC")
            ->paginate(15)
            ->onEachSide(1);
        return response()->json([
            "videos" => $videos
        ]);
    }


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
        //
        $title = request()->title;
        $embed = request()->embed;

        Video::create([
            "user_id" => Auth::user()->id,
            "title" => $title,
            "embed" => $embed
        ]);

        // get the last insert record 
        $vi = Video::latest()->first();

        // make backup to file 
        $this->backupInsertVideo($vi->id);

        $msg = "<span class=\"badge badge-success p-2\">
            Success : video link has been added </span>";
        return response()->json([
            "msg" => $msg
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Video $video)
    {
        //

        $get = Video::with("user")->where("id",$video->id)->get();
        return response()->json([
            "video" => $get
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update($id)
    {
        $title = request()->title;
        $embed = request()->embed;
        Video::where("id",$id)
            ->update([
                "title" => $title,
                "embed" => $embed
            ]);

        // make backup to file 
        $this->backupUpdateVideo($id);
        
        $msg = "<span class=\"badge badge-warning p-2\">
            Success : video link has been Updated! </span>";
        return response()->json([
            "msg" => $msg
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $del = Video::find($id);
        $del->delete();
        $msg = "<span class=\"badge badge-success p-2\">Sucess : Item has been 
            remove</span>";
        return response()->json(["msg" => $msg]);
    }



    /* ==================== backup video 20 July 2021 START =================*/ 
    public function backupInsertVideo($id){
        $vi = Video::find($id);
        $file = base_path("DB/video_list.sqlite");
        $cont = "
\n
/* ========================================================================= */
/* === auto insert script to `{$this->video_table}` ".date("Y-m-d H:i:s")."  */
INSERT INTO `{$this->video_table}`(`user_id`,`title`,`embed`,`created_at`,
`updated_at`) VALUES(
    '{$vi->user_id}',
    '{$vi->title}',
    '{$vi->embed}',
    '{$vi->created_at}',
    '{$vi->updated_at}');
\n
";

        write2text($file,$cont);
    }

    
    /* ==================== backup video 20 July 2021 END ===================*/ 

    /* =================== backup update video 20 July 2021 ================ */
    public function backupUpdateVideo($id){
        $vi = Video::find($id);
        $file = base_path("DB/video_list.sqlite");
        $cont = "
\n 
/* ==== script created ".date("Y-m-d H:i:s")." ============================= */
/* auto update script table `{$this->video_table}` ========================= */
\n
UPDATE `{$this->video_table}` SET title='{$vi->title}',
embed='{$vi->embed}',
updated_at='{$vi->updated_at}'
WHERE id='{$vi->id}';
";
        write2text($file,$cont);
    }

    /* =================== backup update video 20 July 2021 ================ */


}
