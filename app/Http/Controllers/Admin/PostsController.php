<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\Search;
use App\Models\Template;
use App\Models\Tag;
use App\Models\User;

use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;
use Auth;
use Illuminate\Http\Request;
use DB;

class PostsController extends Controller
{
    protected $tag_table;
    protected $post_tag_table;
    protected $post_table;

    protected $search_table;

    public function __construct(){
        $this->tag_table = "tags";
        $this->post_table = "posts";
        $this->post_tag_table = "post_tag";
        $this->search_table = "searches";
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $template = Template::where("section","post")->get();
        return view("Admin.Posts.index")->with(["template" => $template]);
    }


    /* about page */
    public function about(){
        $template = Template::where("section","about")->get();
        $about = Post::where("slug","about")->get();
        return view("Admin.about")->with([
            "about" => $about,
            "template" => $template
        ]);
    }


    /* get all the post */
    public function getPosts(){

        $posts =  Post::with('tags')
                        ->join('users','users.id','=','posts.user_id')
                        ->select('users.name','users.email','posts.*')
                        ->orderBy("created_at","desc")
                        ->paginate(15)
                        ->onEachSide(1);
        $tags = Tag::all();
        $tag_with_content = Tag::has('posts')
                                ->get();

        return response()->json([
            "posts" => $posts,
            "tags" => $tags,
            "tag_with_content" => $tag_with_content
        ]);
    }


    public function getPostsByTag(){
        $tagId = request()->tag;
        $postList = Tag::where('id',$tagId)
                    ->firstOrFail()
                    ->posts()
                    ->with("user")
                    ->orderBy("created_at","desc")
                    ->paginate(4)
                    ->onEachSide(1);
                            

        return view("Admin.Posts.show_tag_list")->with([
            "postlist" => $postList,
            "owner_name" => $postList,
            "tag_id" => $tagId
        ]);
    }

    public function getPostsInTag($tagId){
        $postList = Tag::where('id',$tagId)
                    ->firstOrFail()
                    ->posts()
                    ->join("users","users.id","=","posts.user_id")
                    ->select("users.name","users.email","posts.*")
                    ->orderBy("posts.created_at","desc")
                    ->paginate(5)
                    ->onEachSide(1);
        return response()->json(["posts" => $postList],200);
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('Admin.Posts.create')->with([
            'tags' => Tag::all()
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
        // validate form 
        $validate = request()->validate([
            "title" => ["required","max:80"],
            "body" => ["required"],
            "excerpt" => ["required"],
            "new_tag" => ["min:4","max:15","nullable"]
        ]);

        // unset array new_tag 
        unset($validate["new_tag"]);

        // prepare data to post table
        $validate["post_title"] = xx_clean(request()->title);
        $validate["post_excerpt"] = xx_clean(request()->excerpt);
        $validate["post_body"] = xx_clean(request()->body);
        $validate["is_public"] = !request()->is_public?0:1;
        $validate["user_id"] = Auth::user()->id;
        

        // remove the last dash from the string
        $validate["slug"] = rtrim(request()->slug,"-");
        
        // save the new post return the post->id
        Post::create($validate);

        // get the last post 
        $nPost = Post::latest()->first(); 



        // link post to tags
        $nPost->tags()->attach(request('tags'));

        if(!empty(request('new_tag'))):
            $this->makeTag($nPost);
        endif;

       // will make a search index only the public post 
        if($nPost->is_public != 0):
            // make index for search 
            $this->makeSearchIndex($nPost->id);
        endif;

        //-- make a backup for post
        $this->backupInsertPost($nPost->id);


        $msg = "<span class=\"alert alert-success\">Success : Post created</span>";

        return response()->json(["msg" => $msg],200);

        // check and save tag name
        
        //return redirect()->route('admin.post.index')->with(Session::flash('success','your post has been created'));
    }


    public function validPost(){
        $valid = request()->validate([
            'title' => ['required','min:1','max:80'],
            'excerpt' => ['required','min:8'],
            'body' => ['required','min:8'],
            'new_tag' => ['min:4','max:50','nullable']
        ]);
        return $valid;
    }


    public function makeTag(Post $nPost){
        $oldTag = Tag::where('tag_name',request('new_tag'))->get();
        if(count($oldTag) == 0):
            $nTag = Tag::create([
                'tag_name' => xx_clean(request('new_tag'))
            ]);

            // make a backup 
            $this->backupInsertTag();
        else:
            $nTag = $oldTag; 
        endif;
        $nPost->tags()->attach($nTag);
    }




    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {

        Post::CountReadPostTime($post->id);
                            
        return view('Admin.Posts.show')->with([
            'post' => $post
        ]);
    }

    public function getCommentPost($post_id){
        $comments = Post::where("id",$post_id)
                        ->with("comments")
                        ->with("user")
                        ->paginate(5);
        return response()->json([
            "comments" => $comments
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
        $tags = Tag::all();
        /* return view('Admin.Posts.edit')->with([ */
        /*     'tags' => $tags, */
        /*     'post' => $post */
        /* ]); */

        return response()->json([
            "post" => $post,
            "tags" => $tags,
            "user_tag" => $post->tags
        ],200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function update(POST $post)
    {

        // validate form 
        $this->validPost();

        // $user_id 
        $user_id = $post->user_id;

        // remove the last dash
        $slug = rtrim(request()->slug,"-");

        // save the new post return the post->id
        $nPost = Post::where('id',$post->id)
            ->update([
                'user_id' => $user_id,
                'is_public'  =>     request()->is_public?1:0,
                'post_title'  => xx_clean(request()->title),
                'slug'  => $slug,
                'post_excerpt'  => xx_clean(request()->excerpt),
                'post_body'  => xx_clean(request()->body),
                'updated_at' => now()
            ]);


        $nPost = Post::where('id',$post->id)->first();

        $nPost->tags()->sync(request('tags'));

        if(!empty(request('new_tag'))):
            $this->makeTag($nPost);
        endif;

        // backup the update version to file 
        $this->backupUpdatePost($nPost->id);

        $msg = "<span class=\"alert alert-success\">Success : item has been updated</span>";
        return response()->json(["msg" => $msg],200);



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

        $msg = "<span class=\"alert alert-success\">Success : item has been 
            deleted</span>";
        return response()->json(["msg" => $msg],200);
        

//        return redirect()->route('admin.post.index')->with(Session::flash('success','Your post has been deleted'));
    }


    /* ============ make a backup 26 June 2021 START =========================*/
    public function backupInsertPost($id){

        $post = Post::find($id);

        $file = base_path("DB/postList.sqlite");
        $con1 = "/* ========= auto backup ".date("Y-m-d H:i:s")." ========= */";
        $con1 .= "
INSERT INTO `{$this->post_table}`(`user_id`,`post_title`,`slug`,`post_excerpt`,
`post_body`,`is_public`,`created_at`,`updated_at`) VALUES(
    '{$post->user_id}','{$post->post_title}','{$post->slug}',
    '{$post->post_excerpt}',
    '{$post->post_body}',
    '{$post->is_public}',
    '{$post->created_at}','{$post->updated_at}');
";

        $this->backupPostTagLink($post->id);
        write2text($file,$con1);
    }

    public function backupPostTagLink($post_id){
        // search in post_tag table of this post id
        $tags = DB::table("post_tag")
                    ->where("post_id",$post_id)
                    ->get();
        $now = date("Y-m-d H:i:s");
        if(count($tags) <= 1):
            $file = base_path("DB/post_link_tag.sqlite");
        $cont = "
INSERT INTO `{$this->post_tag_table}`(`post_id`,`tag_id`,`created_at`,
`updated_at`) VALUES(
    '{$post_id}','1',
    '{$now}','{$now}');
";
    write2text($file,$cont);
        else:
        foreach($tags as $ta):
            $file = base_path("DB/post_link_tag.sqlite");
        $cont = "
INSERT INTO `{$this->post_tag_table}`(`post_id`,`tag_id`,`created_at`,
`updated_at`) VALUES(
    '{$ta->post_id}','{$ta->tag_id}',
    '{$ta->created_at}','{$ta->updated_at}');
";
    write2text($file,$cont);
        endforeach;
        endif;

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
`created_at`,`updated_at`) VALUES(
    '{$tag->tag_name}','{$tag->created_at}','{$tag->updated_at}'
);
";
        write2text($file,$con2);
    }

    /* this will create the index for search table */
    public function makeSearchIndex($post_id){
        $post = Post::find($post_id);

        // get from search table 
        $search = Search::where("method","posts")
                    ->where("target_id",$post->id)
                    ->get();
        if(count($search) == 0):
            $data = [
                "target_id" => $post->id,
                "keywords" => $post->post_title,
                "method" => "posts",
                "target_title" => $post->post_title,
            ];
            Search::create($data);
            $se = Search::latest()->first();
            
            // write this to backup file
            $this->backupSearch($se->id);

        endif;

    }

    public function backupSearch($se_id){
        $se = Search::find($se_id);

        $file = base_path("DB/search_list.sqlite");
        $cont = "/* === auto backup from posts ".date("Y-m-d H:i:s")."=====*/";

        $cont .= "
INSERT INTO `{$this->search_table}`(`target_title`,`target_id`,`keywords`,
`method`,`created_at`,`updated_at`) VALUES(
    '{$se->target_title}',
    '{$se->target_id}',
    '{$se->keywords}',
    '{$se->method}',
    '{$se->created_at}','{$se->updated_at}');
";
        write2text($file,$cont);
    }

    public function updateSearch($post_id){

    }

    /* ============ make a backup 26 June 2021 End =========================*/

}
