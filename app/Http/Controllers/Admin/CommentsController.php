<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Post;
use App\Models\Reply;
use App\Models\User;
use Auth;
use DB;

use Illuminate\Http\Request;

class CommentsController extends Controller
{

    protected $comment_table = "comments";
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
            ->paginate(15)
            ->onEachSide(1);
        return response()->json(["comments" => $comments]);
    }

    public function sentReply(){

        $comment_id = request()->comment_id;
        $reply_body = request()->reply_body;

        $comment = Comment::with("posts")
                            ->where("id",$comment_id)
                            ->first();

        $reply_user_name = Auth::user()->name;
        $reply_at = date("Y-m-d H:i:s");
        // will be append content after the comment body 
        $reply_tmp = "{$comment->comment_body}
<div class=\"line\"></div>
<p style=\"margin-top:2em;\">&nbsp;</p>
<div class=\"card\">
    <div class=\"card-body\">
        {$reply_body}
    </div>
    <div class=\"card-footer\">
        <div class=\"float-right\">
            <span>
                <b-icon icon=\"calendar2-day\"></b-icon>
              at : {$reply_at}
            </span> &middot;
            <span>
                <b-icon icon=\"person\"></b-icon>
              By : {$reply_user_name}
            </span>
        </div>
    </div>
</div>

";
        // prepare data to update in comments table 
        $data = [
            "comment_body" => xx_clean($reply_tmp),
            "replied_at" => now(),
            "updated_at" => now()
        ];

        // update comments table 
        Comment::where("id",$comment_id)
                    ->update($data);

        // make a backup 05-Aug-2021
        //$this->backupUpdateComment($comment_id);
        Comment::backupComment($comment_id,"edit");

        return response()->json([
            "msg" => "<span class=\"alert alert-success\">
            Success : comment has been save</span>"
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

        // make backup to file
        Comment::backupComment(request()->id,"edit");

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

    /* ============ backup comment 1 Jul 2021 ============================== */
    public function backupUpdateComment($id){
        $get = Comment::where("id",$id)->first();
        $file = base_path("DB/comment_post.sqlite");
        $cont = "/* ========= update `{$this->comment_table}` ============ */";
        $cont .= "\n/* ==== Auto script on ".date("Y-m-d H:i:s")." ========*/";
        $cont .= "
UPDATE `{$this->comment_table}` SET comment_body='{$get->comment_body}',
replied_at='{$get->replied_at}',updated_at='{$get->updated_at}' 
WHERE id='{$get->id}';
";
        write2text($file,$cont);
    }

    /* ============ backup comment 1 Jul 2021 ============================== */
}
