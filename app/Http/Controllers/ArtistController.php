<?php

namespace App\Http\Controllers;

use App\Models\Song;
use App\Models\Artist;
use Illuminate\Http\Request;

use App\Models\User;
use Auth;

class ArtistController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    protected $canEdit;

    public function index()
    {
        //
        if(Auth::user()->id):
            $this->canEdit = true;
        endif;
        return $this->canEdit;
    }

    public function getartist(){
        $ar = Artist::orderBy("created_at","desc")
                        ->paginate(24);
        return response()->json([
            "artist" => $ar
        ]);
    }

    // search 21 Oct 2021
    public function search(){
        $key = request()->q;
        $res = Artist::where("artist_name","LIKE","%{$key}%")
                        ->paginate(2);

        return response()->json([
            "search_result" => $res
        ]);
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store()
    {
        // save artist
        $valid = request()->validate([
            "artist_name" => ["required"]
        ]);

        // upload 
        $image_name = '/img/no_image.jpg';
        $new_name = "";
        if(request()->hasFile('artist_cover')):
            // if the user upload file 
            // will move file to the public path

            $new_name .= Auth::user()->email."_".date("Y-m-d")."_";
            $new_name .= request()->file('artist_cover')->getClientOriginalName();

            // move upload file to user_upload directory
            request()->file('artist_cover')
                     ->move(public_path('user_upload'),$new_name); 
            $image_name = "/user_upload/".$new_name;

        endif;

        if(filter_var(request()->url_cover,FILTER_VALIDATE_URL)):
            $image_name = request()->url_cover;

        endif;
        // prepare data 
        $valid["artist_name"] = xx_clean(request()->artist_name);
        $valid["artist_cover"] = $image_name;
        $valid["artist_bio"] = xx_clean(request()->artist_bio);

        Artist::create($valid);

        // get data 
        $ar = Artist::latest()->first();

        // backup 
        Artist::backupArtist($ar->id,"insert");

        $msg = "<span class=\"text-success font-weight-bold\">
            Success : artist has been created. 
</span>";
        return response()->json([
            "msg" => $msg
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Song  $song
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $ar = Artist::find($id);
        return response()->json([
            "artist" => $ar
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Song  $song
     * @return \Illuminate\Http\Response
     */
    public function edit(Song $song)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Song  $song
     * @return \Illuminate\Http\Response
     */
    public function update($id)
    {

        // save artist
        $valid = request()->validate([
            "artist_name" => ["required"]
        ]);

        // old image 
        $o_data = Artist::find($id);
        $old_pic = $o_data->artist_cover;

        // upload 
        $image_name = '/img/no_image.jpg';
        $new_name = "";
        if(request()->hasFile('artist_cover')):

            // check if the old pic 
            if(file_exists(public_path("user_upload")."/{$old_pic}")):
                unlink(public_path("user_upload")."/{$old_pic}");
            endif;
            // if the user upload file 
            // will move file to the public path

            $new_name .= Auth::user()->email."_".date("Y-m-d")."_";
            $new_name .= request()->file('artist_cover')->getClientOriginalName();

            // move upload file to user_upload directory
            request()->file('artist_cover')
                     ->move(public_path('user_upload'),$new_name); 
            $image_name = "/user_upload/".$new_name;

        endif;

        if(filter_var(request()->url_cover,FILTER_VALIDATE_URL)):
            $image_name = request()->url_cover;

        endif;
        // prepare data 
        $valid["artist_name"] = xx_clean(request()->artist_name);
        $valid["artist_cover"] = $image_name;
        $valid["artist_bio"] = xx_clean(request()->artist_bio);

        Artist::where("id",$id)
            ->update($valid);

        // get data 
        $ar = Artist::find($id);

        // backup 
        Artist::backupArtist($ar->id,"edit");

        $msg = "<span class=\"text-success font-weight-bold\">
            Success : artist has been updated. 
</span>";
        return response()->json([
            "msg" => $msg
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Song  $song
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $del = Artist::where("id",$id)->first();

        // backup data 
        Artist::backupArtist($id);

        $del->delete();

        $msg = "<span class=\"text-success\">
            Success : artist has been deleted</span>";
        return response()->json([
            "msg" => $msg
        ]);
    }
}
