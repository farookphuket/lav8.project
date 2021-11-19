<?php

namespace App\Http\Controllers\Admin;
use Auth;
use App\Models\Photo;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PhotosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       return view("Admin.Photos.index");
    }


    public function getPhotos(){
        $photos = Photo::with("user")
                    ->orderBy("created_at","DESC")
                    ->paginate(24)
                    ->onEachSide(1);
        return response()->json([
            "photos" => $photos
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

        Photo::create([
            "user_id" => Auth::user()->id,
            "title" => $title,
            "embed" => $embed
        ]);
        $msg = "<span class=\"badge badge-success\">
            Success : data has been created!</span>";
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
    public function show($id)
    {
        //
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

        Photo::where("id",$id)
            ->update([
                "title" => $title,
                "embed" => $embed
            ]);

        $msg = "<span class=\"badge badge-success\">
            success :  item {$id} has been updated!</span>";
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
        $del = Photo::find($id);
        $del->delete();
        $msg = "<span class=\"badge badge-success\">
            success : {$id} item has been deleted!</span>";
        return response()->json([
            "msg" => $msg
        ]);
    }
}
