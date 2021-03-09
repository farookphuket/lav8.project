<?php

namespace App\Http\Controllers;

use App\Models\Song;
use Illuminate\Http\Request;

use DB;

class SongController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $last_title = Song::with("user")
            ->latest("posted_at")->first();
        return view("Pub.song")->with(["last_title" => $last_title]);
    }

    public function search(){
        $ssr = request()->search;
        $song = Song::where("name","LIKE","%{$ssr}%")
                        ->with('user')
                        ->with("artist")
                        ->with("album")
                        ->get();
       return response()->json(["song" => $song]); 
    }



    public function getSongList(){
        $songs = Song::orderBy("created_at","desc")
                        ->with("user")
                        ->with("artist")
                        ->with("album")
                        ->paginate(24)
                        ->onEachSide(1);
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Song  $song
     * @return \Illuminate\Http\Response
     */
    public function show(Song $song)
    {
        //
    }

    public function readCount($song_id){

        $read_time = 0;
        $today = date("Y-m-d");
        $cur_ip = getUserIp();
        $cur_browser = getUserBrowser();

        $cur_os = getUserOs();
        $get = DB::table('read_song')->where("song_id",$song_id)
                        ->where("readed_at",$today)
                        ->where("ip",$cur_ip)
                        ->get();
        if(count($get) == 0):
            DB::table("read_song")->insert([
                "song_id" => $song_id,
                "ip" => $cur_ip,
                "os" => $cur_os,
                "readed_at" => $today,
                "browser" => $cur_browser,
                "created_at" => now(),
                "updated_at" => now()
            ]);
            $get = DB::table('read_song')->where("song_id",$song_id)->get();
            $read_time = count($get);

            Song::where("id",$song_id)->update([
                "read_count" => $read_time
            ]);
        endif;
            $url = "";
            $get = Song::find($song_id);
            $url = $get->url;
        return response()->json([
            "url" => $url,
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
