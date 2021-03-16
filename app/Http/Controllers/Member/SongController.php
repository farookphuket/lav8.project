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
            "name" => $song,
            "user_id" => Auth::user()->id,
            "artist_id" => $ar_id,
            "album_id" => $al_id,
            "url" => request()->url,
            "cover" => request()->cover,
            "posted_at" => now()
        ]);
        
        $msg = "<span class=\"badge badge-success\">Success : Data has been 
            created!</span>";
        return response()->json(["msg" => $msg]);
    }


    public function makeAlbum($name=false){
        $album = $this->album;
        $al_id = 0;
        if(!$album):
            $album = Album::create([
                "name" => $name
            ]);
            $al_id = $album->id;
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
                "name" => $name
            ]);
            $ar_id = $artist->id;
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
            "name" => $song,
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
}
