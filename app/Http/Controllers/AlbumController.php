<?php

namespace App\Http\Controllers;

use App\Models\Album;
use Illuminate\Http\Request;
use Auth;

class AlbumController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }


    public function getalbum(){
        $al = Album::orderBy("created_at","DESC")
                        ->paginate(24);
        return response()->json([
            "album" => $al
        ]);
    }

    /**
     * undocumented function
     *
     * @return void
     */
    public function search()
    {
        $q = request()->q;
        $search_result = Album::where("album_name","LIKE","%{$q}%")
                            ->paginate(2);
        return response()->json([
            'search_result' => $search_result
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
            "album_name" => ["required"]
        ]);

        // upload file 
        $image_name = "/img/no_image.jpg";
        $new_name = "";

        if(request()->hasFile('album_cover')):
            // change name of the file then move to /user_upload/ dir
            $new_name = Auth::user()->email."_";
            $new_name .= date('Y-m-d')."_".request()->file("album_cover")
                                                  ->getClientOriginalName();

            request()->file("album_cover")->move(public_path("user_upload"),$new_name);
            // name of to store in table
            $image_name = "/user_upload/".$new_name;
             
        endif;
        if(filter_var(request()->album_pic_url,FILTER_VALIDATE_URL)):
            
            $image_name = request()->album_pic_url;
        endif;

        // prepare data
        $valid["album_cover"] = $image_name;
        Album::create($valid);

        // get data 
        $al = Album::latest()->first();

        // backup 
        Album::backupAlbum($al->id,"insert");

        // result display
        $msg = "<span class=\"text-success\">
            Success : album has been save</span>";
        return response()->json([
            "msg" => $msg
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Album  $album
     * @return \Illuminate\Http\Response
     */
    public function show(Album $album)
    {
        $al = Album::find($album->id);

        return response()->json([
            "album" => $al
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Album  $album
     * @return \Illuminate\Http\Response
     */
    public function edit(Album $album)
    {
        
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Album  $album
     * @return \Illuminate\Http\Response
     */
    public function update($id)
    {
        //

        $valid = request()->validate([
            "album_name" => ["required"]
        ]);

        // get old image data
        $o_data = Album::find($id);
        $old_pic = public_path("user_upload")."/{$o_data->album_cover}";

        if(file_exists($old_pic)):
            dd(public_path("user_upload")."/{$old_pic}");
        endif;


        // upload file 
        $image_name = "/img/no_image.jpg";

        if(request()->hasFile('album_cover')):
            $image_name = "/user_upload/".Auth::user()->email."_";
            $image_name .= date('Y-m-d')."_".request()->file("album_cover")
                                                  ->getClientOriginalName();
            request()->file("album_cover")->move(public_path("user_upload"),$image_name);
        endif;
        if(filter_var(request()->album_pic_url,FILTER_VALIDATE_URL)):
            
            $image_name = request()->album_pic_url;
        endif;

        // prepare data
        $valid["album_cover"] = $image_name;
        Album::where("id",$id)
            ->update($valid);

        // get data 
        $al = $o_data->id;

        // backup 
        Album::backupAlbum($al->id,"edit");

        // result display
        $msg = "<span class=\"text-success\">
            Success : album has been updated</span>";
        return response()->json([
            "msg" => $msg
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Album  $album
     * @return \Illuminate\Http\Response
     */
    public function destroy(Album $album)
    {
        //
    }
}
