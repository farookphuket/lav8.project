<?php

namespace App\Http\Controllers;

use App\Models\Song;
use App\Models\Search;
use Illuminate\Http\Request;

use DB;
use Auth;

class SongController extends Controller
{
    protected $song_read_table = "read_song";
    protected $song_table = "songs";
    
    protected $search_table = "searches";
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $last_title = Song::with("user")
            ->orderBy("created_at","desc")
            ->first();

        return view("Pub.song")->with(["last_title" => $last_title]);
    }

    public function search(){
        $ssr = request()->search;
        $song = Song::where("song_name","LIKE","%{$ssr}%")
                        ->with('user')
                        ->with("artist")
                        ->with("album")
                        ->get();
       return response()->json(["song" => $song]); 
    }



    public function getsong(){


        $songs = Song::orderBy("created_at","desc")
                        ->with("user")
                        ->with("artist")
                        ->with("album")
                        ->paginate(24);
                        
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
        $song = Song::find($song->id);

        // === make a count 
//        $this->readCount($song->id); 
        Song::readCount($song->id);

        // make search indexing 
        Search::makeSearch($song->id,"songs");

        return response()->json([
            "url" => $song->song_url
        ]);
    }

    public function readCount($song_id){
        // get info of reading song
        $song = Song::find($song_id);

        //prepare the data 
        $count_data = [
            "song_id" => $song->id,
            "readed_at" => date("Y-m-d"),
            "os" => getUserOs(),
            "browser" => getUserBrowser(),
            "ip" => getUserIp(),
            "created_at" => now(),
            "updated_at" => now()
        ]; 

        // --- check if this person's ip who click this song link 
        // has count today
        $hasCount = DB::table($this->song_read_table)
                        ->whereDate("created_at","=",date("Y-m-d"))
                        ->where("ip",getUserIp())
                        ->where("song_id",$song->id)
                        ->get();
        if(count($hasCount) == 0):
            
            DB::table($this->song_read_table)
                ->insert($count_data);

            $sum = DB::table($this->song_read_table)
                ->where("song_id",$song->id)
                ->get();
            // update the last count to song table field
            Song::where("id",$song->id)
                ->update([
                    "read_count" => count($sum)
                ]);

            // then make a backup to file 
            $this->backupSongReadCount();

            // make indexing page for search 
            $this->makeSearchIndexInsert($song->id);            
        endif;
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Song  $song
     * @return \Illuminate\Http\Response
     */
    public function edit(Song $song)
    {
        $song = Song::with('album')
                        ->with('user')
                        ->with('artist')
                        ->where('id',$song->id)
                        ->first();
        return response()->json([
            "song" => $song
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Song  $song
     * @return \Illuminate\Http\Response
     */
    public function update($edit_id)
    {
        
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
    /* ================ backup song read count 20 June 2021 =================*/
    public function backupSongReadCount(){
        // only get the last item
        $get = DB::table($this->song_read_table)
                    ->latest()->first();
        $file = base_path("DB/song_read_count.sqlite");
        $cont = "/* ============ backup for song read count =============*/\n";
        $cont .= "/* ============ ".date("Y-m-d H:i:s")."  ================*/";
        $cont .= "
INSERT INTO `{$this->song_read_table}`(`song_id`,`readed_at`,`os`,`browser`,
`ip`,`created_at`,`updated_at`) VALUES(
    '{$get->song_id}','{$get->readed_at}','{$get->os}',
    '{$get->browser}','{$get->ip}',
    '{$get->created_at}','{$get->updated_at}');
";
        write2text($file,$cont);
    }

    /* ============= make search index for this song 3 Jul 2021==============*/
    public function makeSearchIndexInsert($song_id){
        $method = "songs";
        $song = Song::find($song_id);
        
        $get_se = Search::where("method",$method)
                    ->where("target_id",$song->id)
                    ->get();

        // only create if no row found
        if(count($get_se) == 0):
            $search_data = [
                "method" => $method,
                "target_id" => $song_id,
                "target_title" => $song->name,
                "keywords" => $song->name

            ];

            Search::create($search_data);
            $this->backupInsertSearch();

        endif;


    }
    public function backupInsertSearch(){
        $se = Search::latest()->first();
        $file = base_path("DB/search_list.sqlite");
        $cont = "/* ==== backup insert `{$this->search_table}` =========== */";
        $cont .= "
INSERT INTO `{$this->search_table}`(`target_title`,`method`,`target_id`,
`keywords`,`created_at`,`updated_at`) VALUES(
    '{$se->target_title}','{$se->method}','{$se->target_id}',
    '{$se->keywords}',
    '{$se->created_at}','{$se->updated_at}');
";
        write2text($file,$cont);
    }
    /* ================ backup song read count 20 June 2021 =================*/
}
