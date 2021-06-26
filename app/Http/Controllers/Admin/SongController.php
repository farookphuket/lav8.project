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
        $songs = Song::with('user')
                    ->with("artist")
                    ->with("album")
                    ->orderBy("posted_at","DESC")
                    ->paginate(24)
                    ->onEachSide(1);
        $artists = $this->getArtistList();
        $albums = $this->getAlbumList();

        return response()->json([
            "songs"=>$songs,
            "artists" => $artists,
            "albums" => $albums
        ]);
    }

    public function getArtistList(){

        $artist_lists = DB::table($this->artist_table)->get();
        return $artist_lists;
    }
    public function getArtist($artist){
        $get = DB::table($this->artist_table)->where("name",$artist)->first();
        return $get;
    }

    public function getAlbumList(){
        $album = Album::get();
        return $album;
    }
    public function getAlbum($album){
        $get = Album::where("name",$album)->firstOrFail();
        return $get;
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

    public function makeArtist($name=false){
        
        $ar_id = 0;     
        $save = 0;
        if(!$name):
            $name = request()->artist;
        endif;
        $get = Artist::where("name",$name)->get();
        if(count($get) == 0):
            // will create new artist name 
            $save = Artist::create([
                "name" => xx_clean($name)
            ]);
            $ar_id = $save->id;
            $this->backupInsertArtist();
        else:
            foreach($get as $ar):
                $ar_id = $ar->id;
            endforeach;
        endif;
        return $ar_id;
    }

    public function makeAlbum($name=false){

        $al_id = 0;
        $save = 0;
        if(!$name):
            $name = request()->album;
        endif;
        $get = Album::where("name",$name)->get();
        if(count($get) == 0):
            $save = Album::create([
                "name" => xx_clean($name)
            ]);
            $al_id = $save->id;
            $this->backupInsertAlbum();
        else:
            foreach($get as $ar):
                $al_id = $ar->id;
            endforeach;
        endif;
        return $al_id;
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
        
        $artist_id = $this->makeArtist(request()->artist);
        $album_id = $this->makeAlbum(request()->album);
        $song = request()->song;
        $cover = request()->cover;
        $posted_at = date("Y-m-d H:m:i",strtotime(request()->posted_at));
        $url = request()->url;
        $song_id = Song::create([
            "name" => xx_clean($song),
            "user_id" => Auth::user()->id,
            "artist_id" => $artist_id,
            "album_id" => $album_id,
            "cover" => $cover,
            "posted_at" => $posted_at,
            "url" => $url
        ]);

        // ====== make a backup
        $this->backupInsertSong();


        $msg = "<span class=\"badge badge-success\">Success : Song created
           
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
        $song = Song::with("user")
                    ->with("artist") 
                    ->with("album") 
                    ->where("name",$song->name)->first();
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
        $ar_id = $this->makeArtist(request()->artist);
        $al_id = $this->makeAlbum(request()->album);
        $song = request()->song;

        $cover = request()->cover;
        $posted_at = date("Y-m-d H:m:i",strtotime(request()->posted_at));
        $url = request()->url;
        Song::where("id",$id)->update([
            "album_id" => $al_id,
            "artist_id" => $ar_id,
            "name" => xx_clean($song),
            "cover" => $cover,
            "posted_at" => $posted_at,
            "url" => $url,
            "updated_at" => now()
        ]);

        $msg = "<span class=\"badge badge-success\">
            Success : item has been updated</span>";
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
        $del = Song::find($id);
        $del->delete();
        $msg = "<span class=\"badge badge-success\">
            Success : Item has been remove</span>";
        return response()->json(["msg" => $msg]);
    }


    /* backup script 25 June 2021 */
    public  function backupInsertSong(){
        $song = Song::latest()->first();
        $file = base_path("DB/Song_list.sqlite");
        $content = "/* ============== Auto back up ".date("Y-m-d H:i:s");
        $content .= " ========= to {$this->song_table} */";
        $content .= "
INSERT INTO `{$this->song_table}`(`artist_id`,`album_id`,`user_id`,
`name`,`posted_at`,`cover`,`url`,`created_at`,`updated_at`) VALUES(
    '{$song->artist_id}','{$song->album_id}','{$song->user_id}','{$song->name}',
    '{$song->posted_at}','{$song->cover}','{$song->url}','{$song->created_at}',
    '{$song->updated_at}'
);

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
    /* backup script 25 June 2021 */


}
