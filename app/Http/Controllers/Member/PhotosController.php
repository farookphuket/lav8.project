<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\Photo;
use Auth;
use Illuminate\Http\Request;

class PhotosController extends Controller
{


    protected $photo_table;

    public function __construct(){
        $this->photo_table = "photos";
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       return view("Member.Photos.index"); 
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function getPhotos(){
        $photos = Photo::with("user")
                        ->orderBy("created_at","DESC")
                        ->paginate(24)
                        ->onEachSide(1);
        return response()->json([
            "photos" => $photos
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
        $title = request()->title;
        $embed = request()->embed;
        Photo::create([
            "title" => $title,
            "embed" => $embed,
            "user_id" => Auth::user()->id
        ]);

        //========= make a backup 
        $this->backupInsertPhoto();

        $msg = "<span class=\"badge badge-success\">
            Success : item has been save!</span>";
        return response()->json([
            "msg" => $msg
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Photo  $photo
     * @return \Illuminate\Http\Response
     */
    public function show(Photo $photo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Photo  $photo
     * @return \Illuminate\Http\Response
     */
    public function edit(Photo $photo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Photo  $photo
     * @return \Illuminate\Http\Response
     */
    public function update($id)
    {
        //

        $title = request()->title;
        $embed = request()->embed;
        Photo::where("id",$id)
            ->update([
            "title" => $title,
            "embed" => $embed
        ]);
        $msg = "<span class=\"badge badge-success\">
            Success : item {$id} has been updated!</span>";
        return response()->json([
            "msg" => $msg
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Photo  $photo
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //

        $del = Photo::find($id);
        $del->delete();
        $msg = "<span class=\"badge badge-success\">
            Success : item has been deleted!</span>";
        return response()->json([
            "msg" => $msg
        ]);
    }

    /* ==================== backup photo 27 June 2021 START =================*/ 
    public function backupInsertPhoto(){
        $ph = Photo::latest()->first();
        $file = base_path("DB/photo_list.sqlite");
        $cont = "/* ================= backup `{$this->photo_table}` ";
        $cont .= " ======  ".date("Y-m-d H:i:s")." =============== */";
        $cont .= "
INSERT INTO `{$this->photo_table}`(`user_id`,`title`,`embed`,
`created_at`,`updated_at`) VALUES(
    '{$ph->user_id}','{$ph->title}','{$ph->embed}',
    '{$ph->created_at}','{$ph->updated_at}');
";
        write2text($file,$cont);
    }

    
    /* ==================== backup photo 27 June 2021 END ===================*/ 


}
