<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Song;
use App\Models\Artist;
use App\Models\Album;

use App\Models\User;
use DB;
use Auth;
use Illuminate\Http\Request;

class SongController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    protected $artist_table = 'artists';
    protected $artist_name = "";

    protected $album_table = "albums";
    protected $album_name = "";
    protected $album_id = 0;

    protected $song_table = 'songs';

    public function index()
    {
        return view("Admin.Song.index");
    }

    public function getSongList(){
        $songs = Song::with('album')
                        ->with('artist')
                        ->with('user')
                        ->get();
        return response()->json([
            "songs" => $songs
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


        $d_eg = date("Y-m-d H:i:s");
        $valid = request()->validate([
            "song_name" => ["required"],
            "artist_id" => ["required"],
            "album_id" => ["required"],
            "song_url" => ["required"],
            "posted_at" => ["required","date_format:Y-m-d H:i:s"],
        ],
        [
            "artist_id.required" => "Error ! please select one artist",
            "album_id.required" => "Error ! select one album",
            "posted_at.date_format" => "Error! please enter format {$d_eg}"
        ]);


        $image_name = "/img/no_image.jpg";
        $new_name = "";
        if(request()->hasFile('song_cover')):
            // user has upload file
            $new_name = Auth::user()->email."_";
            $new_name .= date("Y-m-d")."_".request()
                ->file("song_cover")->getClientOriginalName();
            request()->file("song_cover")
                     ->move(public_path("user_upload"),$new_name);
            $image_name = "/user_upload/".$new_name;
        endif;
        if(filter_var(request()->song_cover_url,FILTER_VALIDATE_URL)):
            $image_name = request()->song_cover_url;
        endif;

        // prepare data 
        unset($valid["artist_id"]); // no need to save
        unset($valid["album_id"]); // no need to save
        $valid["song_cover"] = $image_name;
        $valid["user_id"] = Auth::user()->id;
        $valid["song_url"] = request()->song_url;
        $valid["posted_at"] = date("Y-m-d H:i:s",strtotime(request()->posted_at));
        $valid["song_name"] = xx_clean(request()->song_name);

        // create song
        Song::create($valid);

        // get last insert field
        $new_song = Song::latest()->first();

        // album 
        DB::table('album_song')
            ->insert([
                'album_id' => request()->album_id,
                'song_id' => $new_song->id,
                'created_at' => now(),
                'updated_at' => now()
            ]); 

        // artist 
        DB::table('artist_song')
            ->insert([
                'artist_id' => request()->artist_id,
                'song_id' => $new_song->id,
                'created_at' => now(),
                'updated_at' => now()
            ]); 

        // backup song 
        Song::backupSong($new_song->id,"insert");

        

        $msg = "<span class=\"text-success\">
                    Success : Song created 
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
    public function show(Song $song)
    {
        // this method has not call from anywhere
        $song = Song::with("user")
                    ->with("artist") 
                    ->with("album") 
                    ->where("id",$song->id)
                    ->first();
        return response()->json([
            "song" => $song
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
        $d_eg = date("Y-m-d H:i:s");
        
        $valid = request()->validate([
            "song_name" => ["required"],
            "artist_id" => ["required"],
            "album_id" => ["required"],
            "song_url" => ["required"],
            "posted_at" => ["required"],
        ],
        [
            "artist_id.required" => "Error ! please select one artist",
            "album_id.required" => "Error ! select one album",
            "posted_at.date_format" => "Error! please enter date time like {$d_eg}"
        ]);

        // we have to delete old image if it exited
        $old_data = Song::find($id);
        $old_pic = $old_data->song_cover;



        $image_name = $old_pic; // do not delete the current photo on update
        $new_name = "";
        if(request()->hasFile('song_cover')):
            // user has upload file

            if(file_exists(public_path($old_pic))):
                unlink(public_path($old_pic));
            endif;
            $new_name = Auth::user()->email."_";
            $new_name .= date("Y-m-d")."_".request()
                ->file("song_cover")->getClientOriginalName();
            request()->file("song_cover")
                     ->move(public_path("user_upload"),$new_name);
            $image_name = "/user_upload/".$new_name;

        endif;
        if(filter_var(request()->song_cover_url,FILTER_VALIDATE_URL)):
            $image_name = request()->song_cover_url;
        endif;

        // prepare data 
        unset($valid["artist_id"]); // no need to save
        unset($valid["album_id"]); // no need to save
        $valid["song_cover"] = $image_name;
        $valid["song_url"] = request()->song_url;
        $valid["posted_at"] = request()->posted_at;
        $valid["song_name"] = xx_clean(request()->song_name);

        // create song
        Song::where("id",$id)
            ->update($valid);

        $new_song = Song::find($id);


        // sync album 
        $this->albumSync(request()->album_id,$id);

        // sync artist
        $this->artistSync(request()->artist_id,$id);

        // backup song 
        Song::backupSong($new_song->id,"insert");

        

        $msg = "<span class=\"text-success\">
                    Success : Song info has been updated
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
        // get the specific data 
        $del = Song::find($id);

        // get the cover image 
        $img_cover = $del->song_cover;

        //check if the cover image has file on server 
        if(file_exists(public_path("user_upload")."/{$img_cover}")):
            // if file is exited then delete 
            unlink(public_path("user_upload")."/{$img_cover}");
        endif;

        // make backup 
        Song::backupSong($id);

        // since the relationship has set the album,artist link will be auto 
        // remove

        $del->delete();
        $msg = "<span class=\"badge badge-success\">
            Success : Item has been remove</span>";
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
