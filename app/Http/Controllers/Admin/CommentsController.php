<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Post;
use App\Models\Reply;
use App\Models\User;
use Auth;

use Illuminate\Http\Request;

class CommentsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view("Admin.Comments.index");
    }

    public function getPostCommentAll(){
        $comments = Comment::with("user")
            ->with("posts")
            ->orderBy("created_at","desc")
            ->paginate(2)
            ->onEachSide(1);
        return response()->json(["comments" => $comments]);
    }

    public function sentReply(){
        Reply::create([
            "ip" => getUserIp(),
            "comment_id" => request()->comment_id,
            "user_id" => Auth::user()->id,
            "reply_body" => request()->reply_body
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
        return response()->json(["comment"=>$comment]);
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
    public function update()
    {
        Comment::where('id',request()->id)
            ->update([
                "comment_title" => request()->comment_title,
                "comment_body" => request()->comment_body,
                "updated_at" => now(),
                "replied_at" => now()
            ]);
        $msg = "<span class=\"alert alert-success\">
            Success : updated</span>";
        return response()->json(["msg" => $msg]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Comment $comment)
    {
        $comment->delete();
        $msg = "<span class=\"alert alert-success\">Success : item removed
            </span>";
    
        return response()->json(["msg" => $msg]);
    }
}
