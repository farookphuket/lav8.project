<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Song;
use App\Models\Search;
use App\Models\Album;
use App\Models\Artist;
use Illuminate\Http\Request;

use Auth;
use DB;

class SongController extends Controller
{

    
    public function index()
    {
        return view("Member.Song.index");
    }


    public function getsong(){

        $my_song = Song::where("user_id",Auth::user()->id)
                        ->orderBy("created_at","DESC")
                        ->paginate(24);
        return response()->json([
            "my_song" => $my_song
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
        $now = date("Y-m-d H:i:s");
        $artist_id = request()->artist_id; // get artist id
        $album_id = request()->album_id;// get album id

        $valid = request()->validate([
            "song_name" => ["required"],
            "artist_id" => ["required"],
            "album_id" => ["required"],
            "posted_at" => ["required","date_format:Y-m-d H:i:s"],
            "song_url" => ["required","url"],
            ],
            [
                "artist_id.required" => "Error! please select artist!",
                "album_id.required" => "Error! please select album!",
                "posted_at.date_format" => "Date Error! Please enter eg: {$now}"
            ]
        );

        $image_name = '/img/no_image.jpg';
        $new_name = "";
        // upload file 
        if(request()->hasFile("song_cover")):
            $new_name = Auth::user()->email."_";
            $new_name .= date("Y-m-d")."_".request()->file("song_cover")->getClientOriginalName();
            request()->file("song_cover")->move(public_path("user_upload"),$new_name);

            // specified path with the image name
            $image_name = "/user_upload/".$new_name;
        endif;

        if(filter_var(request()->song_cover_url,FILTER_VALIDATE_URL)):
            // if the user paste the image url
            $image_name = request()->song_cover_url;
        endif;

        // unset the artist_id,album_id as no field in table songs
        unset($valid["artist_id"]);
        unset($valid["album_id"]);

        // preparing data 
        $valid["user_id"] = Auth::user()->id;
        $valid["song_name"] = xx_clean(request()->song_name);
        $valid["song_cover"] = $image_name;
        $valid["song_url"] = request()->song_url;

        // create song 
        Song::create($valid);

        // get the last record
        $so = Song::latest()->first();

        // sync album 
        $this->albumSync($album_id,$so->id);

        // sync artist 
        $this->artistSync($artist_id,$so->id);

        // make a backup 
        Song::backupSong($so->id,"insert");

        // make search 
        Search::makeSearch($so->id,"songs");

        $msg = "
<span class=\"text-success\">Success : your song has been created 
</span>
";
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
    public function show(Song $song)
    {

        
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
        // get the current data 
        $o_data = Song::find($id);
        $old_pic = $o_data->song_cover;

        $now = date("Y-m-d H:i:s");
        $artist_id = request()->artist_id; // get artist id
        $album_id = request()->album_id;// get album id

        $valid = request()->validate([
            "song_name" => ["required"],
            "artist_id" => ["required"],
            "album_id" => ["required"],
            "posted_at" => ["required","date_format:Y-m-d H:i:s"],
            "song_url" => ["required","url"],
            ],
            [
                "artist_id.required" => "Error! please select artist!",
                "album_id.required" => "Error! please select album!",
                "posted_at.date_format" => "Date Error! Please enter eg: {$now}"
            ]
        );

        $image_name = '/img/no_image.jpg';
        $new_name = "";
        // upload file 
        if(request()->hasFile("song_cover")):
            if(file_exists(public_path($old_pic))):
                unlink(public_path($old_pic));
            endif;
            $new_name = Auth::user()->email."_";
            $new_name .= date("Y-m-d")."_".request()->file("song_cover")->getClientOriginalName();
            request()->file("song_cover")->move(public_path("user_upload"),$new_name);

            // specified path with the image name
            $image_name = "/user_upload/".$new_name;
        endif;

        if(filter_var(request()->song_cover_url,FILTER_VALIDATE_URL)):
            // if the user paste the image url
            $image_name = request()->song_cover_url;
        endif;

        // unset the artist_id,album_id as no field in table songs
        unset($valid["artist_id"]);
        unset($valid["album_id"]);

        // preparing data 
        $valid["song_name"] = xx_clean(request()->song_name);
        $valid["song_cover"] = $image_name;
        $valid["song_url"] = request()->song_url;

        // create song 
        Song::where("id",$id)
            ->update($valid);

        // get the last record
        $so = Song::find($id);

        // sync album 
        $this->albumSync($album_id,$so->id);

        // sync artist 
        $this->artistSync($artist_id,$so->id);

        $msg = "
<span class=\"text-success\">Success : your song has been updated 
</span>
";
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


        $song = Song::find($id);


        // check if user has file upload if so delete the file
        $img = $song->song_cover;
        if(file_exists(public_path($img))):
            unlink(public_path($img));
        endif;

        $song->delete();

        $msg = "<span class=\"badge badge-success\">Success : song id ({$id}) has been 
            deleted!</span>";
       return response()->json(["msg" => $msg]);
    }


    /* albumSync is to make sure that this song will only be link 
     * to one album
     * */
    public function albumSync($album_id,$song_id){
        $sData = DB::table("album_song")
                        ->where("album_id",$album_id)
                        ->where("song_id",$song_id)
                        ->get();
        if(count($sData) != 0):
            foreach($sData as $row):
                DB::table("album_song")
                    ->where("id",$row->id)
                    ->delete();
            endforeach;
        endif;
        DB::table("album_song")->insert([
            "song_id" => $song_id,
            "album_id" => $album_id,
            "created_at" => now(),
            "updated_at" => now()
        ]);
    }

    public function artistSync($artist_id,$song_id){
        $sData = DB::table("artist_song")
                        ->where("artist_id",$artist_id)
                        ->where("song_id",$song_id)
                        ->get();
        if(count($sData) != 0):
            foreach($sData as $row):
                DB::table("artist_song")
                    ->where("id",$row->id)
                    ->delete();
            endforeach;
        endif;
        DB::table("artist_song")->insert([
            "song_id" => $song_id,
            "artist_id" => $artist_id,
            "created_at" => now(),
            "updated_at" => now()
        ]);
    }

}
