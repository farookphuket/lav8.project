<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
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

    public function about(){
        $about = Post::where("slug","about")->get();
        return view("Admin.about")->with(["about" => $about]);
    }

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
        $this->validPost();

        //get the slug from post title
        //$slug = Str::slug(request('slug'));
        $slug = request()->slug;
        
        // save the new post return the post->id
        $nPost = new Post();
        $nPost->user_id = Auth::user()->id;
        $nPost->is_public = request()->is_public?1:0;
        $nPost->post_title = request()->title;
        $nPost->slug = $slug;
        $nPost->post_excerpt = xx_clean(request()->excerpt);
        $nPost->post_body = xx_clean(request()->body);
        $nPost->save();

        $nPost->tags()->attach(request('tags'));

        if(!empty(request('new_tag'))):
            $this->makeTag($nPost);
        endif;

        if(!$nPost->slug):
            Post::where('id',$nPost->id)->update([
                'slug' => $nPost->id
            ]);
        endif;

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
        return view('Admin.Posts.show')->with([
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
        //get the slug from post title
        //$slug = Str::slug(request('slug'));
        $slug = request()->slug;

        if(!$slug):
            $slug = $post->id;
        endif;
        // before save

        /* $this->exitTags($post); */
        /* dd(request('tags')); */


        // save the new post return the post->id
        $nPost = Post::where('id',$post->id)
            ->update([
                'user_id' => $user_id,
                'is_public'  =>     request()->is_public?1:0,
                'post_title'  => request()->title,
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

        $msg = "<span class=\"alert alert-success\">Success : item has been updated</span>";
        return response()->json(["msg" => $msg],200);

        // check and save tag name

       // return redirect()->route('admin.post.index')->with(Session::flash('success','your post has been updated!'));

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

        $msg = "<span class=\"alert alert-success\">Success : item has been deleted</span>";
        return response()->json(["msg" => $msg],200);
        

//        return redirect()->route('admin.post.index')->with(Session::flash('success','Your post has been deleted'));
    }
}
