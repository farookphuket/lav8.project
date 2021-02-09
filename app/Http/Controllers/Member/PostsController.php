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
        $posts = Post::with('tags')
                    ->orderBy("created_at","desc")
                    ->join("users","users.id","=","posts.user_id")
                    ->select("users.name","users.email","posts.*")
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
                        ->join("users","users.id","=","posts.user_id")
                        ->select("users.name","users.email","posts.*")
                        ->get();

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
        //
        //
        //$slug = Str::slug(request()->title);
        $slug = request()->slug;
        $is_public = !request()->is_public?0:1;
        $excerpt = xx_clean(request()->excerpt);
        $body = xx_clean(request()->body);
        $user_id = Auth::user()->id;

        $nPost = Post::create([
            "user_id" => $user_id,
            "post_title" => request()->title,
            "slug" => $slug,
            "is_public" => $is_public,
            "post_body" => $body,
            "post_excerpt" => $excerpt
        ]);

        $nPost->tags()->attach(request()->tags);

        // the slug will not accept Thai 
        // so will set the slug to the id of post
        if(!$nPost->slug):
            $slug = $nPost->id;
            Post::where("id",$nPost->id)
                ->update([
                    "slug" => $slug
                ]);
        endif;
        
        if(!empty(request()->new_tag)):
            $this->makeTag($nPost);
        endif;

        $msg = "<span class=\"badge badge-success\">Success : data has been created</span>";
        return response()->json([
            "msg" => $msg
        ]);
    }

    public function validPost(){
        $valid = request()->validate([
            'title' => ['required','min:8','max:80'],
            'excerpt' => ['required','min:8'],
            'new_tag' => ['min:4','max:50','nullable','unique:tags,tag_name']
        ]);
        return $valid;
    }


    public function makeTag(Post $nPost){
        $oldTag = Tag::where('tag_name',request('new_tag'))->get();
        if(count($oldTag) == 0):
            $nTag = Tag::create([
                'tag_name' => request('new_tag')
            ]);
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
        $slug = request()->slug;
        $excerpt = xx_clean(request()->excerpt);
        $body = xx_clean(request()->body);
        $is_public = !request()->is_public?0:1;
        $nPost = Post::where("id",$post->id)
            ->update([
                "post_title" => request()->title,
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
}
