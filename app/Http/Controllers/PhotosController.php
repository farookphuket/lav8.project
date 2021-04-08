<?php

namespace App\Http\Controllers;

use App\Models\Photo;
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
        $get = Photo::latest()->first();

        return view("Pub.Photos.index")->with(["photo" => $get]);
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

  //  public function search(){
  //      $search = request()->search;
  //      $photos = Photo::where("title","LIKE","%$search%")
  //                      ->orderBy("created_at","DESC")
  //                      ->get();
  //      return response()->json([
  //          "photos" => $photos 
  //      ]);
  //  }

    public function search(){
        $search = request()->search;
        $photos = Photo::with("user")
                    ->where("title","LIKE","%$search%")
                        ->orderBy("created_at","DESC")
                        ->get();
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Photo  $photo
     * @return \Illuminate\Http\Response
     */
    public function show(Photo $photo)
    {
        $photo = Photo::with("user")
                ->where("id",$photo->id)
                ->get();
        return response()->json([
            "photo" => $photo
        ]);
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
    public function update(Request $request, Photo $photo)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Photo  $photo
     * @return \Illuminate\Http\Response
     */
    public function destroy(Photo $photo)
    {
        //
    }
}
