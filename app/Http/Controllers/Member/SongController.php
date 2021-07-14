<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Song;
use App\Models\Album;
use App\Models\Artist;
use Illuminate\Http\Request;

use Auth;
use DB;

class SongController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    protected $canEdit;

    protected $song_table;
    protected $artist_table;
    protected $album_table;
    /**
     * undocumented function
     *
     * @return void
     */
    protected $artist;
    protected $album;
    public function __construct()
    {

        $this->artist = Artist::where("name", request()->artist)->first();
        $this->album = Album::where("name",request()->album)->first();

        $this->song_table = "songs";
        $this->artist_table = "artists";
        $this->album_table = "albums";
    }
    
    public function index()
    {
        //
        if(!Auth::user()->id):
            redirect("login");
        else:
            $this->canEdit = true;
        endif;
        return view("Member.Song",["canEdit" => $this->canEdit]);
    }

    public function search(){
        $se = request()->search;
        $songs = Song::where("name","LIKE","%{$se}%")
                        ->with("user")
                        ->with("album")
                        ->with("artist")
                        ->orderBy("posted_at","desc")
                        ->limit(10)
                        ->get();
                        

        return response()->json(["songs" => $songs]);
    }


    public function getSongList(){
        $songs = Song::with("user")
                        ->with("artist")
                        ->with("album")
                        ->orderBy("posted_at","desc")
                        ->paginate(24)
                        ->onEachSide(1);
        $artists = Artist::all();
        $albums = Album::all();
        return response()->json([
            "songs" => $songs,
            "albums" => $albums,
            "artists" => $artists 
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



     //   $valid = request()->validate([
     //       "song" => ["required","min:2"],
     //       "album" => ["required","min:2"],
     //       "url" => ["required"]
     //   ]);

        $al_id = $this->makeAlbum(request()->album);
        $ar_id = $this->makeArtist(request()->artist);
        $song = request()->song;

        //$post_date = date("Y-m-d H:i:s",now())
        $create_song = Song::create([
            "name" => xx_clean($song),
            "user_id" => Auth::user()->id,
            "artist_id" => $ar_id,
            "album_id" => $al_id,
            "url" => request()->url,
            "cover" => request()->cover,
            "posted_at" => now()
        ]);

        //===== backup
        $this->backupInsertSong();
        
        $msg = "<span class=\"badge badge-success\">Success : Data has been 
            created!</span>";
        return response()->json(["msg" => $msg]);
    }


    public function makeAlbum($name=false){
        $album = $this->album;
        $al_id = 0;
        if(!$album):
            $album = Album::create([
                "name" => xx_clean($name)
            ]);
            $al_id = $album->id;

            // backup
            $this->backupInsertAlbum();
        else:
            $al_id = $album->id;
       endif; 
        return $al_id;
    }

    public function makeArtist($name=false){
        $artist = $this->artist;
        $ar_id = 0;
        if(!$artist):
            $artist = Artist::create([
                "name" => xx_clean($name)
            ]);
            $ar_id = $artist->id;
            $this->backupInsertArtist();
        else:
            $ar_id = $artist->id;
       endif; 
        return $ar_id;
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Song  $song
     * @return \Illuminate\Http\Response
     */
    public function show(Song $song)
    {
        $song = Song::where("id",$song->id)
            ->with("user")
            ->with("arist")
            ->with("album")->get();

        return response()->json(["song" => $song]);
        
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
        //


        $al_id = $this->makeAlbum(request()->album);
        $ar_id = $this->makeArtist(request()->artist);
        $song = request()->song;

        //$post_date = date("Y-m-d H:i:s",now())
        $update_song = Song::where("id",$id)->update([
            "name" => xx_clean($song),
            "artist_id" => $ar_id,
            "album_id" => $al_id,
            "url" => request()->url,
            "cover" => request()->cover,
            "updated_at" => now()
        ]);
        $msg = "<span class=\"badge badge-success\">Success : Data ({$id}) has been 
            updated!</span>";
       return response()->json(["msg" => $msg]);
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
        $song->delete();

        $msg = "<span class=\"badge badge-success\">Success : Data ({$id}) has been 
            deleted!</span>";
       return response()->json(["msg" => $msg]);
    }

    /* =========== make backup START =======================*/

    public  function backupInsertSong(){
        $song = Song::latest()->first();
        $file = base_path("DB/Song_list.sqlite");
        $content = "/* ============== Auto back up ".date("Y-m-d H:i:s");
        $content .= " ========= to {$this->song_table} */";
        $content .= "
INSERT INTO `{$this->song_table}`(`artist_id`,`album_id`,`user_id`,
`name`,`posted_at`,`cover`,`url`,`created_at`,`updated_at`) VALUES(
    '{$song->artist_id}',
    '{$song->album_id}',
    '{$song->user_id}',
    '{$song->name}',
    '{$song->posted_at}',
    '{$song->cover}',
    '{$song->url}',
    '{$song->created_at}',
    '{$song->updated_at}');

";
    write2text($file,$content);
    }

    public function backupInsertArtist(){
        
        $ar = DB::table($this->artist_table)->latest()->first();
        $file = base_path("DB/Artist_list.sqlite");
        $con1 = "/* ========= auto script ".date("Y-m-d H:i:s");
        $con1 .= " ====== to {$this->artist_table}*/";
        $con1 .= "
INSERT INTO `{$this->artist_table}`(`name`,`created_at`,`updated_at`) 
VALUES(
'{$ar->name}','{$ar->created_at}','{$ar->updated_at}'
);
";
        write2text($file,$con1);
    }


    public function backupInsertAlbum(){
        $ab = DB::table($this->album_table)->latest()->first();
        $file = base_path("DB/Album_list.sqlite");

        $con2 = "/* ========= auto script ".date("Y-m-d H:i:s");
        $con2 .= " ====== to {$this->album_table}*/";
        $con2 .= "
INSERT INTO `{$this->album_table}`(`name`,`created_at`,`updated_at`) 
VALUES(
'{$ab->name}','{$ab->created_at}','{$ab->updated_at}'
);
";
        write2text($file,$con2);
    }
    /* =========== make backup End =======================*/

}
