<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Tag;
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
        $posts = Post::with('user')
                        ->with('tags')
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
        $this->readCount($post->id);
        return view('Pub.Posts.show')->with([
            'post' => $post
        ]);
    }

    public function readCount($p_id){

        $last_read_date = 0;
        $last_read_ip = "";
        $last_read_count = 0;

        $cur_ip = getUserIp();
        $os = getUserOs();
        $browser = getUserBrowser();
        $device = getUserDevice();
        $cur_date = date('Y-m-d');
        $date_create = 0;

        $posts = Post::where('id',$p_id)->get();
        foreach($posts as $p):
            $last_read_date = $p->last_read_date;
            $last_read_ip = $p->last_read_ip;
            $last_read_count = $p->read_count;
            $date_create = $p->created_at;
        endforeach;

        // only if the cur_date equal to today and the ip is unique from the last read ip 
        if($cur_date != $last_read_date || $cur_ip != $last_read_ip):
            Post::where('id',$p_id)
                ->update([
                    'read_count' => $last_read_count+1,
                    'last_read_ip' => $cur_ip,
                    'last_read_date' => $cur_date
                ]);

            DB::table("post_read")
                ->insert([
                    "post_id" => $p_id,
                    "os" => $os,
                    "browser" => $browser,
                    "ip" => $cur_ip,
                    "device" => $device,
                    "created_at" => now(),
                    "updated_at" => now()
                ]);


        endif;


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
}
