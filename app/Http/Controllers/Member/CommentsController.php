<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\User;
use App\Models\Reply;
use App\Models\Post;
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
        return"this is comment";
    }

    public function getPostComment($post_id){

        $comments = $this->postComment($post_id);

        return response()->json(["comments" => $comments],200);
            
    }

    public function postComment($post_id){
        $get_comment = "";
        $comment = Comment::where("post_id",$post_id)
                            ->orderBy("created_at","DESC")
                            ->get();
        if(count($comment) >= 1):
            $get_comment = Comment::orderBy("created_at","DESC")
                                    ->where("post_id",$post_id)
                                        ->with("reply")
                                        ->with("user")
                                       ->get();

        else:
            $get_comment = 0;
        endif;
        return $get_comment;
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

    public function replyComment(){

        request()->validate([
            "reply_body" => ["required","min:30"]
        ]);
        Reply::create([
            "user_id" => Auth::user()->id,
            "ip" => getUserIp(),
            "comment_id" => request()->comment_id,
            "reply_body" => request()->reply_body
        ]);

        return response()->json(["msg" => "success"]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store()
    {
        request()->validate([
            "comment" => ["required","min:20"]
        ]);
        $nComment = Comment::create([
            "user_id" => Auth::user()->id,
            "post_id" => request()->post_id,
            "comment_msg" => xx_clean(request()->comment),
            "ip" => getUserIp()
        ]);
        $msg = "<span class=\"alert alert-success\">
            Success : comment has created</span>";
        return response()->json(["msg" => $msg]);
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
        return response()->json(["comment" => $comment]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function update($id)
    {
        //dd(request()->comment);

        Comment::where("id",$id)
            ->update([
                "ip" => getUserIp(),
                "post_id" => request()->post_id,
                "comment_msg" => request()->comment,
                "updated_at" => now(),
                "replied_at" => now()
            ]);

        return response()->json(["msg" => "success"]);

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
        $msg = "<span class=\"alert alert-success\">
            Success : item has been removed!</span>";
        return response()->json(["msg" => $msg]);
    }
}
