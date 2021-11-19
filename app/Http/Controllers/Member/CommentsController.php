<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\User;
use App\Models\Reply;
use App\Models\Post;
use Auth;
use DB;
use Illuminate\Http\Request;

class CommentsController extends Controller
{

    protected $comment_table;
    protected $post_comment_table;
    public function __construct(){
        $this->comment_table = "comments";
        $this->post_comment_table = "comment_post";
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return"this is comment";
    }

    public function getPostComment(){
        $getComments = DB::table($this->post_comment_table)
            ->where($this->post_comment_table.".post_id",
                request()->post_id)
                ->join($this->comment_table,"{$this->comment_table}.id",
            "=","{$this->post_comment_table}.comment_id")
            ->join("users","users.id","=","{$this->post_comment_table}.user_id")
            ->select("{$this->comment_table}.*","{$this->post_comment_table}.*",
            "users.name","users.email")
            ->orderBy("{$this->post_comment_table}.created_at","desc")
            ->paginate(15)
            ->onEachSide(1);

        return response()->json([
            "comments" => $getComments
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
        $validate = request()->validate([
            "comment_title" => ["required"],
            "comment_body" => ["required"]
        ]);
    
        $post_id = request()->post_id;
        $validate["comment_title"] = xx_clean(request()->comment_title);
        $validate["comment_body"] = xx_clean(request()->comment_body);
        $validate["user_id"] = Auth::user()->id;
        $validate["ip"] = getUserIp();

        // save to db
        Comment::create($validate);


        // get the last comment row for backup 
        $cm = Comment::latest()->first();

        // backup comment table insert command to file
        Comment::backupComment($cm->id,"insert");


        // make this comment id link to post this id 
        DB::table($this->post_comment_table)
            ->insert([
                "user_id" => $cm->user_id,
                "comment_id" => $cm->id,
                "post_id" => $post_id,
                "created_at" => now(),
               "updated_at" => now() 
            ]);


        // get comment link from table post_comment_table 
        // --- make backup for comment
       // $this->backupInsertComment();
        Comment::backupPostCommentLink($post_id,"edit");

        

        $msg = "<span class=\"alert alert-success\">
            Success : comment has created</span>";
        return response()->json([
            "msg" => $msg,
        ]);
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

        return response()->json(["msg" => "success"]);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // make a backup to file 
        Comment::backupPostCommentLink($id);
        Comment::backupComment($id);


        $del = Comment::where("id",$id)->first();
        $del->delete();
        $msg = "<span class=\"alert alert-success\">
            Success : item has been removed!</span>";
        return response()->json([
            "msg" => $msg,

        ]);
    }



    /* ==================== backup photo 27 June 2021 START =================*/ 
    public function backupInsertComment(){
        $ph = Comment::latest()->first();

        $col = DB::table($this->post_comment_table)->latest()->first();

        $file = base_path("DB/comment_post.sqlite");
        $cont = "/* ================= backup `{$this->comment_table}` ";
        $cont .= " ======  ".date("Y-m-d H:i:s")." =============== */";
        $cont .= "
INSERT INTO `{$this->comment_table}`(`user_id`,`ip`,`comment_title`,
`comment_body`,`created_at`,`updated_at`) VALUES(
    '{$ph->user_id}','{$ph->ip}','{$ph->comment_title}',
    '{$ph->comment_body}','{$ph->created_at}',
    '{$ph->updated_at}');

/* ================ link table ============================ */
INSERT INTO `{$this->post_comment_table}`(`user_id`,`comment_id`,`post_id`,
`created_at`,`updated_at`) VALUES(
    '{$col->user_id}','{$col->comment_id}','{$col->post_id}',
    '{$col->created_at}','{$col->updated_at}');
";
        write2text($file,$cont);
    }

    
    /* ==================== backup photo 27 June 2021 END ===================*/ 

}
