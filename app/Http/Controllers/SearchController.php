<?php

namespace App\Http\Controllers;

use App\Models\Search;
use App\Models\Post;
use App\Models\Song;

use Illuminate\Http\Request;

class SearchController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    public function getSearchResult(){
        $keywords = request()->keywords;

        /* 
         * this still return everything from search table 
         * which is not correct 3 Jul 2021
         * */
        $result = Search::where("keywords","LIKE","%{$keywords}%")
                    ->get();
        return response()->json([
            "result" => $result
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
     * @param  \App\Models\Search  $search
     * @return \Illuminate\Http\Response
     */
    public function show(Search $search)
    {
        $get = Search::where("method",request()->method)
                    ->where("target_id",request()->target_id)
                    ->where("id",$search->id)
                    ->first();

        $url = "";
        $po = "";

        /* many said "bad practice" to using switch case in method
        // but in this case here
        // we only need the url but I want to make sure that the url we call 
        // is the update version in case when the url change */
        switch($get->method):
            case"posts":
                $po = $this->getPost($get->target_id);
                $url = $po["url"];
            break;
            case"songs":
                $po = $this->getSong($get->target_id);
                $url = $po["url"];
            break;
            default:
                $url = "";
            break;
        endswitch;
                

        return response()->json([
            "msg" => $po,
            "url" => $url
        ]);
    }

    // the url of post can be change
    // so I wanna make sure that the request will get the last update
    public function getPost($id){
        $get = Post::find($id);

        $url = "/posts/{$get->slug}";
        $data = [
            "post" => $get,
            "url" => $url
        ];
        return $data;
    }


    public function getSong($id){
        $song = Song::find($id);

        $data = [
            "url" =>  $song->url,
            "song" => $song
        ];
        return $data;
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Search  $search
     * @return \Illuminate\Http\Response
     */
    public function edit(Search $search)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Search  $search
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Search $search)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Search  $search
     * @return \Illuminate\Http\Response
     */
    public function destroy(Search $search)
    {
        //
    }

    /* ==================== backup script ================================ */
    /* 
     * for some reason we may have to destroy the search history 
     * if the item has been compleatly change on it update  
     * */

    public function delBackupSearch($search_id){

    }
    /* ==================== END of backup ================================ */
}
