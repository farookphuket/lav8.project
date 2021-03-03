<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Song;
use App\Models\Artist;
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
    protected $artist_table = 'artist';
    protected $artist_name = "";

    public function index()
    {
        return view("Admin.Song.index");
    }

    public function getSongList(){
        $songs = Song::with('user')->get();
        $artists = $this->getArtistList();

        return response()->json([
            "songs"=>$songs,
            "artists" => $artists
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
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    public function makeArtist(){
       $this->artist_name = request()->artist; 
       if($this->getArtist($this->artist_name) == 0):
           // new artist
           Artist::create([
               "name" => $this->artist_name
           ]);  
       else: 
        // update
       endif;

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
        $this->artist_name = $this->makeArtist();
        $msg = "return from server {$this->artist_name}";
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
