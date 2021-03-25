<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Video;
use Auth;

class VideoController extends Controller
{
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
            ->paginate(24)
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
        return response()->json([
            "msg" => "Video has been created"
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

        $get = Video::where("id",$video->id)->get();
        return $response()->json([
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
        
        return response()->json([
            "msg" => "Video has been updated"
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
        $msg = "<span class=\"badge badge-success\">Suucess : Item has been 
            remove</span>";
        return response()->json(["msg" => $msg]);
    }
}
