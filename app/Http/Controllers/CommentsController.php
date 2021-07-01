<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\User;
use App\Models\Post;
use DB;
use Illuminate\Http\Request;

class CommentsController extends Controller
{

    protected $comment_post_table = "comment_post";
    protected $post_table = "posts";
    protected $comment_table = "comments";
    protected $user_table = "users";
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
    }


    public function getPostComments(){
        $post_id = request()->post_id;

        
        $comments = DB::table($this->comment_post_table)
                ->where("{$this->comment_post_table}.post_id",$post_id)
                ->join($this->post_table,$this->post_table.".id","=",
                    $this->comment_post_table.".post_id")
                ->join($this->user_table,$this->user_table.".id","=",
                $this->comment_post_table.".user_id")
                ->join($this->comment_table,$this->comment_table.".id","=",
                $this->comment_post_table.".comment_id")
                ->select($this->post_table.".post_title",
                    $this->user_table.".name",
                    $this->comment_table.".comment_title",
                    $this->comment_table.".comment_body",
                    $this->comment_table.".ip",
                    $this->comment_post_table.".created_at"
                )
                ->orderBy("{$this->comment_post_table}.created_at","desc")
                ->paginate(2)
                ->onEachSide(1);
         

        /*
        $comments = DB::table($this->comment_post_table)
            ->where($this->comment_post_table.".post_id",
            $post_id)
            ->join($this->comment_table,"{$this->comment_table}.id","=",
            $this->comment_post_table.".comment_id")
            ->select(
                $this->comment_table.".comment_title",
                $this->comment_table.".comment_body",
                $this->comment_post_table.".created_at"
            )
            ->orderBy("{$this->comment_post_table}.created_at","desc")
            ->paginate(2)
            ->onEachSide(1);
         */

        return response()->json([
            "comments" => $comments
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
     * @param  \App\Models\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function show(Comment $comment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function edit(Comment $comment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Comment $comment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Comment $comment)
    {
        //
    }
}
