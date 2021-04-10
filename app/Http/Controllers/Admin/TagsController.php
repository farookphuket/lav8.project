<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class TagsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('Admin.Tags.index');
    }

    /*
     *  getTags will return tags list to vue getTags
     */ 
    public function getTags(){
        $tags = Tag::with("posts")
                ->orderBy("created_at","desc")
                ->paginate(5);
        return response()->json(["tags"=>$tags],200);
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

        $this->validTag(); 

        Tag::create([
            "tag_name" => request()->tag
        ]);

        $msg = "<span class=\"alert alert-success\">Success : Tag created!</span>";

        return response()->json([
            "msg" => $msg
        ]);
    }

    public function validTag(){
        $id = request()->tagId;
        $tag = request()->validate([
            "tag" => ['required','min:3','max:25',"unique:tags,tag_name,{$id}"]
        ]);
        return $tag;

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Tag  $tag
     * @return \Illuminate\Http\Response
     */
    public function show(Tag $tag)
    {
        return response()->json(["tag"=>$tag],200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Tag  $tag
     * @return \Illuminate\Http\Response
     */
    public function edit(Tag $tag)
    {
        /* return view('Admin.Tags.edit')->with([ */
        /*     'tag' => $tag */
        /* ]); */
        return response()->json(["tag" => $tag]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Tag  $tag
     * @return \Illuminate\Http\Response
     */
    public function update(Tag $tag)
    {
        //
        /* $this->validTag(request()); */
        /* Tag::where('id',$tag)->update([ */
        /*     'tag_name' => request()->tag_name, */
        /*     'updated_at' => now() */
        /* ]); */
        /* return redirect()->route('admin.tags.index')->with(Session::flash("success","tag has been updated")); */

        $this->validTag();
        Tag::where('id',$tag->id)
            ->update([
                "tag_name" => request()->tag,
                "updated_at" => now()
            ]);
        $msg = "<span class=\"alert alert-success\">Success : tag has been updated</span>";
        return response()->json(["msg" => $msg]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Tag  $tag
     * @return \Illuminate\Http\Response
     */
    public function destroy(Tag $tag)
    {
        Tag::where('id',$tag->id)->delete();
        $msg = "<span class=\"alert alert-suucess\">Succes : tag deleted</span>";
        return response()->json(["msg" => $msg]);
    }
}
