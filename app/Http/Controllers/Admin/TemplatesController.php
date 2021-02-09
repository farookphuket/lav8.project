<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Template;
use App\Models\Tag;
use App\Models\User;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class TemplatesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $templates = Template::orderBy('created_at','desc')
                                ->paginate(5);
        $tags = Tag::all();

        return view('Admin.Template.index')->with([
            'templates' => $templates,
            'tags' => $tags
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $tags = Tag::all();
        return view('Admin.Template.create')->with([
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
        /* $this->validTemplate(); */
        /* Template::create([ */
        /*     'user_id' => Auth::user()->id, */
        /*     'title' => request('title'), */
        /*     'excerpt' => xx_clean(request('excerpt')), */
        /*     'body' => xx_clean(request('body')) */
        /* ]); */
        /* return redirect()->route('admin.templates.index')->with(Session::flash('success','Template has been created!')); */

        $valid = request()->validate([
            "title" => ["required","min:8"],
            "excerpt" => ["required","min:8"],
            "body" => ["required","min:8"]
        ]);

        if(!$valid):
            //  error is show in the form status

        else:
            Template::create([
                "user_id" => Auth::user()->id,
                "title" => request()->title,
                "section" => request()->section,
                "excerpt" => xx_clean(request()->excerpt),
                "body" => xx_clean(request()->body)
            ]); 
            $msg = "<span class=\"alert alert-success\">Success : item has been created</span>";
        endif;




        return response()->json([
            "msg" => $msg
        ],200);
    }

    public function validTemplate($id=false){

        if($id):
            
            request()->validate([
                'title' => ['required','min:4'],
                "excerpt" => ["required","min:8"]
            ]);

        else:

            request()->validate([
                'title' => ['required','min:4','unique:templates,title'],
                "excerpt" => ["required","min:8"]
            ]);

        endif;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Template  $template
     * @return \Illuminate\Http\Response
     */
    public function show(Template $template)
    {
      //  return view("Admin.Template.show")->with([
      //      "template" => $template
      //  ]);
        return response()->json(["template" => $template]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Template  $template
     * @return \Illuminate\Http\Response
     */
    public function edit(Template $template)
    {
        /* return view('Admin.Template.edit')->with([ */
        /*     'template' => $template */
        /* ]); */
        return response()->json([
            "template" => $template
        ],200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Template  $template
     * @return \Illuminate\Http\Response
     */
    public function update(Template $template)
    {
        /* $user_id = $template->user_id; */ 
        /* $this->validTemplate(); */

        /* Template::where('id',$template->id)->update([ */
        /*     "user_id" => $user_id, */
        /*     "title" => request()->title, */
        /*     "excerpt" => xx_clean(request()->excerpt), */
        /*     "body" => xx_clean(request()->body), */
        /* ]); */
        /* return redirect()->route('admin.templates.index')->with(Session::flash("success","your template has been updated!")); */


        $this->validTemplate($template->id);
        Template::where("id",$template->id)
            ->update([
                "title" => request()->title,
                "excerpt" => xx_clean(request()->excerpt),
                "body" => xx_clean(request()->body),
                "updated_at" => now()
            ]);
        $msg = "<span class=\"alert alert-success\">Success : item has been updated</span>";
        return response()->json([
            "msg" => $msg
        ],200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Template  $template
     * @return \Illuminate\Http\Response
     */
    public function destroy(Template $template)
    {
        $template->delete();


        $msg = "<span class=\"alert alert-success\">Success : data has been remove</span>";

        return response()->json([
            "msg" => $msg
        ],200);

    }
}
