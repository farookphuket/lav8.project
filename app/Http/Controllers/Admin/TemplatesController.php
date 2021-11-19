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
    protected $template_table = "templates";
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $templates = Template::with("user")->orderBy('created_at','desc')
                                
                                ->paginate(5);
        $tags = Tag::all();

        return view('Admin.Template.index')->with([
            'templates' => $templates,
            'tags' => $tags
        ]);
    }

    public function viewTemplate(Template $template){
        $template = Template::where("id",$template->id)
           ->with("user") 
            ->get();
        $title = '';
        foreach($template as $li):
            $title = $li->title;
        endforeach;
        return view("Admin.Template.show")->with([
            "template" => $template,
            "title" => $title
        ]);
    }

    public function getTemplates(){
        $templates = Template::with("user")
            ->orderBy("created_at","desc")
            ->paginate(4);
        return response()->json([
            "templates" => $templates
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

        $valid = request()->validate([
            "title" => ["required","min:8"],
            "excerpt" => ["required","min:8"],
            "body" => ["required","min:8"]
        ]);

        Template::create([
            "user_id" => Auth::user()->id,
            "title" => xx_clean(request()->title),
            "section" => xx_clean(request()->section),
            "excerpt" => xx_clean(request()->excerpt),
            "body" => xx_clean(request()->body)
        ]); 

        // --- make backup 
        $this->backupInsertTemplate();

        $msg = "<span class=\"alert alert-success\">Success : item has been created</span>";



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

        $this->validTemplate($template->id);
        Template::where("id",$template->id)
            ->update([
                "title" => xx_clean(request()->title),
                "excerpt" => xx_clean(request()->excerpt),
                "body" => xx_clean(request()->body),
                "updated_at" => now()
            ]);
        //---- make a backup 
        $this->backupUpdateTemplate($template->id);
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

    /* ============= make backup template ==================================*/
    public function backupInsertTemplate(){
        $tp = Template::latest()->first();
        $file = base_path("DB/template.sqlite");
        $cont = "/* ======= backup template {$tp->section} ================*/";
        $cont .= "\n/* ======= date ".date("Y-m-d H:i:s")." ==================*/";
        $cont .= "
INSERT INTO `{$this->template_table}`(`user_id`,`section`,`title`,`excerpt`,
`body`,`created_at`,`updated_at`) VALUES(
    '{$tp->user_id}',
    '{$tp->section}',
    '{$tp->title}',
    '{$tp->excerpt}',
    '{$tp->body}',
    '{$tp->created_at}',
    '{$tp->updated_at}');
\n
";
        write2text($file,$cont);
    }

    public function backupUpdateTemplate($id){
        $get = Template::find($id);
        $file = base_path("DB/template.sqlite");
        $cont = "/* === update of template section {$get->section} ========*/";
        $cont .= "\n/* === update of template section {$get->section} =====*/";
        $cont .= "
UPDATE `{$this->template_table}` SET title='{$get->title}',
section='{$get->section}',
excerpt='{$get->excerpt}',
body='{$get->body}',
updated_at='{$get->updated_at}'
	WHERE id={$id};
";
write2text($file,$cont);
    }

    /* ============= make backup template ==================================*/
}
