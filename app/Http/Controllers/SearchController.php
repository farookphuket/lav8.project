<?php

namespace App\Http\Controllers;

use App\Models\Search;
use App\Models\Post;

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
                    ->first();

        $url = "";
        switch($get->method):
            case"posts":
                $url = $this->getPost();
            break;
            default:
                $url = "";
            break;
        endswitch;
                

        return response()->json([
            "msg" => $url
        ]);
    }

    public function getPost($id){
        $get = Post::find($id);

        $url = "/posts/{$get->slug}";
        return $url;
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
}
