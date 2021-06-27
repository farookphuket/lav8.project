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
            ->select("{$this->comment_table}.*","{$this->post_comment_table}.*")
                ->get();

        return response()->json([
            "getComments" => $getComments
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

        Comment::create($validate);

        $cm = Comment::latest()->first();
        DB::table($this->post_comment_table)
            ->insert([
                "user_id" => $cm->user_id,
                "comment_id" => $cm->id,
                "post_id" => $post_id,
                "created_at" => now(),
               "updated_at" => now() 
            ]);

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
    public function destroy(Comment $comment)
    {

        $msg = "<span class=\"alert alert-success\">
            Success : item has been removed!</span>";
        return response()->json(["msg" => $msg]);
    }



    /* ==================== backup photo 27 June 2021 START =================*/ 
    public function backupInsertComment(){
        $ph = Comment::latest()->first();
        $file = base_path("DB/comment_post.sqlite");
        $cont = "/* ================= backup `{$this->comment_table}` ";
        $cont .= " ======  ".date("Y-m-d H:i:s")." =============== */";
        $cont .= "
INSERT INTO `{$this->comment_table}`(`user_id`,`post_id`,`ip`,
`created_at`,`updated_at`) VALUES(
    '{$ph->user_id}','{$ph->title}','{$ph->embed}',
    '{$ph->created_at}','{$ph->updated_at}');
";
        write2text($file,$cont);
    }

    
    /* ==================== backup photo 27 June 2021 END ===================*/ 

}
