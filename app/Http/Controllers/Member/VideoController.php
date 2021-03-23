<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\Video;
use App\Models\User;
use Illuminate\Http\Request;

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
        return view("Member.Video.index");
    }


    public function getVideos(){

        $videos = Video::with("user")
                        ->orderBy("created_at","DESC")
                        ->paginate(24)
                        ->onEachSide(1);
        return response()->json([
            "videos" => $videos
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
        //
        $title = request()->title;
        $embed = request()->embed;
        Video::create([
            "title" => $title,
            "user_id" => Auth::user()->id,
            "embed" => $embed
        ]);
        $msg = "<span class=\"badge badge-success\">
            Success: Data has been created</span>";
        return response()->json(["msg" => $msg]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Video  $video
     * @return \Illuminate\Http\Response
     */
    public function show(Video $video)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Video  $video
     * @return \Illuminate\Http\Response
     */
    public function edit(Video $video)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Video  $video
     * @return \Illuminate\Http\Response
     */
    public function update($id)
    {
        $title = request()->title;
        $embed = request()->embed;
        Video::where("id",$id)->update([
            "title" => $title,
            "embed" => $embed,
            "updated_at" => now()
        ]);
        
        $msg = "<span class=\"badge badge-success\">
            Success: Data has been updated</span>";
        return response()->json(["msg" => $msg]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Video  $video
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $del = Video::find($id);
        $del->delete(); 
        $msg = "<span class=\"badge badge-success\">
            Success: Data has been deleted!</span>";
        return response()->json(["msg" => $msg]);
    }
}
