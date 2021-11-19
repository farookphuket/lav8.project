<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;

use App\Models\Post;
use Auth;
use DB;
use App\Models\Tag;
use App\Models\Template;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;

class PostsController extends Controller
{
    protected $post_table;
    protected $tag_table;
    protected $post_tag_table;
    protected $post_read_table;

    public function __construct(){
        $this->post_tag_table = "post_tag";
        $this->tag_table = "tags";
        $this->post_table = "posts";
        $this->post_read_table = "post_read";
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $posts = Post::where('is_public',1)
                        ->orWhere('user_id',Auth::user()->id)
                        ->orderBy('created_at','desc')
                        ->paginate(15)->onEachSide(1);
        $tags = Tag::has('posts')->get();
        $tag_all = Tag::all();
        $template = Template::where("section","post")->get();

        if(request('tag')):
            $posts = Tag::where('id',request('tag'))
                            ->firstOrFail()
                            ->posts()
                            ->where('is_public',1)
                            ->paginate(3); 
        endif;

        return view('Member.Posts.index')->with([
            'posts' => $posts,
            'tags' => $tags,
            'tag_all' => $tag_all,
            'template' => $template
        ]);
    }


    public function about(){
        $post = Post::where("slug","about")->get();
        return view("Member.about")->with(["post" => $post]);
    }

    public function getPosts(){
        $posts = Post::where("slug","!=","about")
                    ->where("user_id",Auth::user()->id)
                    ->with('tags')
                    ->orderBy("created_at","desc")
                    /* ->join("users","users.id","=","posts.user_id") */
                    /* ->select("users.name","users.email","posts.*") */
                    ->with("user")
                    ->paginate(4)
                    ->onEachSide(1);

        $tag_with_content = Tag::has('posts')
                                    ->get();
        $tag_all = Tag::all();
        return response()->json([
            "posts" => $posts,
            "tag_with_content" => $tag_with_content,
            "tag_all" => $tag_all
        ]);
    }

    public function getPostsByTagId(){
        $tag = request()->tag;
        $getPosts = Tag::where('id',$tag)
                        ->firstOrFail()
                        ->posts()
                        ->join("users","users.id","=","posts.user_id")
                        ->select("users.name","users.email","posts.*")
                        ->get();
        $tag_all = Tag::all();
        
        $tagId = $tag;
        return view("Member.Posts.postlist_by_tag_id")->with([
            "postlist" => $getPosts,
            "tag_id" => $tagId,
            "tag_all" => $tag_all
        ]);
    }


    public function getPostsInTagId($id){
        $getPosts = Tag::where('id',$id)
                        ->firstOrFail()
                        ->posts()
                     /*   
                      *   ->join("users","users.id","=","posts.user_id")
                      *
                      *  ->select("users.name","users.email","posts.*")
                      *   */
                        ->with("user")
                        ->orderBy("created_at","desc")
                        ->paginate(8)
                        ->onEachSide(1);

        return response()->json([
            "postlist" => $getPosts
        ],200);
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

        $tags = Tag::all();
        return view('Member.Posts.create')->with([
            'tags' => $tags
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store()
    {

        $this->validPost(); 

        // we have to remove the last dash from the string
        $slug = rtrim(request()->slug,"-");

        $is_public = !request()->is_public?0:1;
        $excerpt = xx_clean(request()->excerpt);
        $body = xx_clean(request()->body);
        $user_id = Auth::user()->id;

        $nPost = Post::create([
            "user_id" => $user_id,
            "post_title" => xx_clean(request()->title),
            "slug" => $slug,
            "is_public" => $is_public,
            "post_body" => $body,
            "post_excerpt" => $excerpt
        ]);

        $nPost->tags()->attach(request()->tags);
        
        if(!empty(request()->new_tag)):
            $this->makeTag($nPost);
        endif;

        // make the backup 
        $this->backupInsertPost();

        $msg = "<span class=\"badge badge-success\">Success : data has been created</span>";
        return response()->json([
            "msg" => $msg
        ]);
    }

    public function validPost(){
        $valid = request()->validate([
            'title' => ['required','min:8','max:80'],
            'excerpt' => ['required','min:8'],
            'new_tag' => ['min:4','max:50','nullable']
        ]);
        return $valid;
    }


    public function makeTag(Post $nPost){
        $oldTag = Tag::where('tag_name',request('new_tag'))->get();
        if(count($oldTag) == 0):
            $nTag = Tag::create([
                'tag_name' => request('new_tag')
            ]);
            
            $nPost->tags()->attach($nTag);

            // backup 
            $this->backupInsertTag();
        else:
            $nTag = $oldTag; 
            $nPost->tags()->sync($nTag);
        endif;

    }


    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {

        // make count read to this post
        Post::CountReadPostTime($post->id); 


        return view('Member.Posts.show')->with([
            'post' => $post
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
        /* $tags = Tag::all(); */ 
        /* return view('Member.Posts.edit')->with([ */
        /*     'post'=>$post, */
        /*     'tags' => $tags */
        /* ]); */

        return response()->json([
            "post" => $post,
            "tag" => $post->tags
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function update(Post $post)
    {
        $this->validPost();
        //$slug = Str::slug(request()->title);

        $slug = rtrim(request()->slug,"-");
        // remove dash from the last character

        $excerpt = xx_clean(request()->excerpt);
        $body = xx_clean(request()->body);
        $is_public = !request()->is_public?0:1;
        $nPost = Post::where("id",$post->id)
            ->update([
                "post_title" => xx_clean(request()->title),
                "post_excerpt" => $excerpt,
                "post_body" => $body,
                "is_public" => $is_public,
                "slug" => $slug
            ]);
        $nPost = Post::where("id",$post->id)->first();
        $nPost->tags()->sync(request()->tags);
        if(!empty(request()->new_tag)):
            $this->makeTag($nPost);
        endif;

        // make a backup to file for the update version 14 Jul 2021
        $this->backupUpdatePost($post->id);

        $msg = "<span class=\"alert alert-success\">Success :data updated</span>";
        return response()->json([
            "msg" => $msg
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        $del = Post::where('id',$post->id)->first();
        $del->delete();
        $del->tags()->detach();


        $msg = "<span class=\"alert alert-success\">
            Success data has been delete</span>";
        return response()->json([
            "msg" => $msg
        ]);

    }


    public function makeCount($id){

        // find wheather this person has count today
        $has_count = DB::table($this->post_read_table)
                            ->where("post_id",$id)
                            ->where("ip",getUserIp())
                            ->whereDate("created_at","=",date("Y-m-d"))
                            ->get();
        if(count($has_count) == 0):

            // preparing data to count table
            $c_data = [
                "post_id" => $id,
                "os" => getUserOs(),
                "ip" => getUserIp(),
                "device" => getUserDevice(),
                "browser" => getUserBrowser(),
                "created_at" => now(),
                "updated_at" => now()
            ];

            // create count data
            DB::table($this->post_read_table)
                    ->insert($c_data);

            // count the read row including the new row
            $sum_read_count = count(DB::table($this->post_read_table)
                ->where("post_id",$id)
                ->get());

            // update the posts table
            Post::where("id",$id)
                ->update([
                    "last_read_ip" => getUserIp(),
                    "last_read_date" => date("Y-m-d"),
                    "read_count" => $sum_read_count
                ]);

            // make a backup to file
            Post::backupReadCountLink($id,"edit");

        endif;


    }

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


    /* make backup of the update version to file */
    public function backupUpdatePost($id){
        $post = Post::find($id);
        $file = base_path("DB/postList.sqlite");
        $cont = "/* ======== update script for post ============ */";
        $cont .= "
UPDATE `{$this->post_table}` SET post_title='{$post->post_title}',
post_excerpt='{$post->post_excerpt}',
post_body='{$post->post_body}',
is_public='{$post->is_public}',
updated_at='{$post->updated_at}' WHERE id='{$post->id}';
";
        $cont .= "/* ========== End of update script ===========*/";

        write2text($file,$cont);

        /* 
         * this only can make a backup for post 
         * will not update the tag link to file 
         * but we will delete and re-insert it instead 
         * */

        $ln = DB::table($this->post_tag_table)
                    ->where("post_id",$post->id)
                    ->get();
        if(count($ln) != 0):
            $fi = base_path("DB/post_link_tag.sqlite");

            $cm = "/* ======= delete */";
            $cm .= "
DELETE FROM `{$this->post_tag_table}` WHERE post_id='{$post->id}';
";
            foreach($ln as $tag):


            $cm .= "/* ==== re-insert ===========*/";
            $cm .= "
INSERT INTO `{$this->post_tag_table}`(`post_id`,`tag_id`,`created_at`,
`updated_at`) VALUES(
    '{$tag->post_id}','{$tag->tag_id}',
    '{$tag->created_at}','{$tag->updated_at}'
);
    /* ===== re-insert END ======================*/
";
            endforeach;

        write2text($fi,$cm);
        endif;

    }
    /* make backup of the update version to file */






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

    /* ============ make a backup 26 June 2021 End =========================*/

}
