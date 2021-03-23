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
        $tags = Tag::has('posts')->get();

        if(request('tag')):
            $posts = Tag::where('id',request('tag'))->firstOrFail()->posts()->where('is_public',1)->paginate(15)->onEachSide(1);

            //return $posts;
        else:
            $posts = Post::where('is_public',true)
                            ->with("tags")
                            ->orderBy('created_at','desc')
                            ->paginate(15)->onEachSide(1);
        endif;         

            return view('Pub.Posts.index')->with([
                'posts' => $posts,
                'tags' => $tags
            ]);

    }

    public function about(){

        $post = Post::where("slug","about")->limit(1)->get();
        return view("Pub.about")->with(["post" => $post]);
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
                    'last_read_date' => $cur_date,
                    'updated_at' => $date_create
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
