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

    public function index()
    {
        return view("Admin.Song.index");
    }

    public function getSongList(){
        $songs = Song::with('user')->get();
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

    public function makeArtist(Artist $artist){
        
        
    }

    public function makeAlbum(Album $album){

        $al_id = request()->album_id;
        $this->album_name = request()->album;
        $get = Album::where("id",$al_id)->get();
        if(count($get) == 0):
            $al_id = Album::create([
                "name" => $this->album_name
            ]);
        else:
            Album::where("id",$al_id)->update([
                "name" => $this->album_name
            ]);
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
        $artist_id = $this->makeArtist();
        $album_id = $this->makeAlbum();

        $msg = "return from server {$artist_id} the album id is {$album_id}";
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
        $song = Song::with("user")->where("name",$song->name)->first();
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
    public function update(Request $request, Song $song)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Song  $song
     * @return \Illuminate\Http\Response
     */
    public function destroy(Song $song)
    {
        //
    }
}
