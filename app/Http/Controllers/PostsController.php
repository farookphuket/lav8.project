<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Tag;
use App\Models\Search;
use Illuminate\Http\Request;

use DB;

class PostsController extends Controller
{

    protected $post_table;
    protected $tag_table;
    protected $post_tag_table;
    protected $post_read_table;
    protected $search_table;

    public function __construct(){
        $this->post_tag_table = "post_tag";
        $this->tag_table = "tags";
        $this->post_table = "posts";
        $this->post_read_table = "post_read";
        $this->search_table = "searches";
    }



    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index()
    {

        $view_index = "Pub.Posts.index";
        $view_tag = "Pub.Posts.view_by_tag";

        $view_file = '';
        $tags = Tag::get();

        if(request()->tag):
            $view_file = $view_tag;
            $tag = Tag::where('id',request()->tag)
                        ->get();
        else:
            $view_file = $view_index;
        endif;

        return view($view_file)->with(['tags' => $tags]);

    }

    /* getPostlist call by ajax */ 
    public function getPostList(){
        $posts = Post::where('slug','!=','about')
                    ->where("is_public","!=",0)
                    ->with('user')
                        ->with('tags')
                        ->with('comments')
                        ->orderBy('created_at','desc')
                        ->paginate(5)
                        ->onEachSide(1);
        return response()->json([
            'posts' => $posts
        ]);
    }

    public function getPostListByTag($tag_id){
        $posts = Tag::where('id',$tag_id)
                    ->firstOrFail()
                    ->posts()
                    ->join('users','users.id','=','posts.user_id')
                    ->select('users.name','users.email','posts.*')
                    ->orderBy('created_at','desc')
                    ->paginate(5)
                    ->onEachSide(1);
                     


       return response()->json(["posts" => $posts]); 
    }

    // searchPost added on 10 Apr 2021
    public function searchPost(){
        $search = request()->search;
        $posts = Post::orderBy("created_at","desc")
                        ->with("user")
                        ->with("tags")
                        ->where("post_title","LIKE","%{$search}%")
                        ->paginate(25)->onEachSide(1);

        return response()->json([
            "posts" => $posts
        ]);

    }

    public function search(){

        $search = request()->search;
        $search_result = Post::with('user')
                            ->where("post_title","LIKE","%{$search}%")
                            ->orWhere("post_body","LIKE","%{$search}%")
                                ->paginate(4);
        return response()->json([
            "search_result" => $search_result
        ]);
    }


    public function about(){

        $post = Post::where("slug","about")->limit(1)->get();
        return view("Pub.about")->with(["post" => $post]);
    }

    public function donate(){
        return view("Pub.donate_me");
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
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {

        $get_post = Post::with("comments")
                    ->with("user")
                    ->with("tags")
                    ->where("slug",$post->slug)
                    ->get();


        // make count read to this post 6 Aug 2021
        Post::CountReadPostTime($post->id);
        //$this->makeCount($post->id);

        // make index for search last edit 7 Aug 2021
        //$this->makeIndexPost($post->id);
        Search::makeSearch($post->id,"posts");

        return view('Pub.Posts.show')->with([
            'post' => $get_post
        ]);
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        //
    }

    

    public function makeCount($id){

        // get the post info 
        $get = Post::where("id",$id)->first();


        // prepare data
        $con1 = [
            "post_id" => $get->id,
            "os" => getUserOs(),
            "ip" => getUserIp(),
            "device" => getUserDevice(),
            "browser" => getUserBrowser(),
            "created_at" => now(),
            "updated_at" => now()
        ];

        // get the last ip from who read this item today
        // will count only 1 time per day doesn't matter how many time 
        // this person click the link
        $hasCount = DB::table($this->post_read_table)
            ->where("ip",getUserIp())
            ->where("post_id",$get->id) 
            ->whereDate("created_at","=",date("Y-m-d"))
            ->get();// must return the array

        // if today not count yet now do count
        if(count($hasCount) == 0):
            DB::table($this->post_read_table)
                ->insert($con1);
            // ===== make a backup 
            $this->backupCount();
        endif;

        // -- update the count field in posts table for this id as well 
        $sum = DB::table($this->post_read_table)
            ->where("post_id",$get->id)
            ->get();

        Post::where("id",$get->id)
            ->update([
                "last_read_date" => date("Y-m-d"),
                "last_read_ip" => getUserIp(),
                "read_count" => count($sum)
            ]);
    }

    /* ============ makeIndexPost for search ================================ */
    public function makeIndexPost($id){
        $post = Post::where("id",$id)->first();

        $search = Search::where("keywords",$post->post_title)
                        ->where("method","posts")
                        ->where("target_id",$post->id)
                        ->get();
        
        if(count($search) == 0):
            $data = [
                "target_title" => $post->post_title,
                "method" => "posts",
                "target_id" => $post->id,
                "keywords" => $post->post_title
            ];
            Search::create($data);
            
            //make backup to file 
            $this->backupInsertSearch(); 
        endif;

    }

    /* ============ makeIndexPost for search ================================ */

    /* ============ make a backup 26 June 2021 START =========================*/
    public function backupInsertPost(){

        $post = Post::latest()->first();
        $file = base_path("DB/postList.sqlite");
        $con1 = "/* ========= auto backup ".date("Y-m-d H:i:s")." ========= */";
        $con1 .= "
INSERT INTO `{$this->post_table}`(`user_id`,`post_title`,`slug`,`post_excerpt`,
`post_body`,`is_public`,`created_at`,`updated_at`) VALUES(
    '{$post->user_id}','{$post->post_title}','{$post->slug}',
    '{$post->post_excerpt}',
    '{$post->post_body}',
    '{$post->is_public}','{$post->created_at}','{$post->updated_at}'
);
";
        write2text($file,$con1);

        //======== tags can be more than one
        $tags = DB::table($this->post_tag_table)
            ->where("post_id",$post->id)
            ->get();
        foreach($tags as $item):
            $file = base_path("DB/post_link_tag.sqlite");
            $con2 = "/* ====== auto backup ".date("Y-m-d H:i:s")." ==========*/";
            $con2 .= "
INSERT INTO `{$this->post_tag_table}`(`post_id`,`tag_id`,`created_at`,
`updated_at`) VALUES(
    '{$item->post_id}','{$item->tag_id}','{$item->created_at}',
    '{$item->updated_at}');
";
            write2text($file,$con2);
        endforeach;

    }

    public function backupInsertTag(){
        $tag = Tag::latest()->first();

        $file = base_path("DB/tags.sqlite");
        $con2 = "/* ===== auto backup ".date("Y-m-d H:i:s"). " ====  */";        
        $con2 .= "
INSERT INTO `{$this->tag_table}`(`tag_name`,
`created_at`,'updated_at') VALUES(
    '{$tag->tag_name}','{$tag->created_at}','{$tag->updated_at}'
);
";
        write2text($file,$con2);
    }

    public function backupCount(){
        $get = DB::table($this->post_read_table)
                    ->latest()
                    ->first();
        $file = base_path("DB/post_read_count.sqlite");
        $cont = "/* ========= auto backup ".date("Y-m-d H:i:s")." =========*/";
        $cont .= "
INSERT INTO `{$this->post_read_table}`(`post_id`,`os`,`ip`,`device`,
`browser`,`created_at`,`updated_at`) VALUES(
    '{$get->post_id}','{$get->os}','{$get->ip}','{$get->device}',
    '{$get->browser}','{$get->created_at}','{$get->updated_at}');
";
        write2text($file,$cont);
    }

    // backupInsertSearch 2 July 2021
    // this will call when the no-login user view the post
    public function backupInsertSearch(){
        $search = Search::latest()->first();
        $file = base_path("DB/search_list.sqlite");

        $cont = "/* === backup search index ".date("Y-m-d H:i:s")." ====== */";
        $cont .= "
INSERT INTO `{$this->search_table}`(`target_title`,`method`,`target_id`,
`keywords`,
`created_at`,`updated_at`) VALUES(
    '{$search->target_title}','{$search->method}','{$search->target_id}',
    '{$search->keywords}',
    '{$search->created_at}','{$search->updated_at}');
";
        write2text($file,$cont);
    }

    /* ============ make a backup 26 June 2021 End =========================*/


}
