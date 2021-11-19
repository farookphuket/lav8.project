<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Visitor;
use App\Models\User;
use Illuminate\Http\Request;
use DB;
use Auth;


class VisitorsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public $table = "visitors";
    public function index()
    {
        //
        return view("Admin.Visitors.index");

    }

    public function getVisitorList(){
        $sortByDate = request()->orderByDate;
        $visitors = Visitor::orderBy("last_visited_date","desc")
                            ->paginate(15)
                            ->onEachSide(1);
        return response()->json([
            "visitors" => $visitors
        ]);
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
     * @param  \App\Models\Visitor  $visitor
     * @return \Illuminate\Http\Response
     */
    public function show(Visitor $visitor)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Visitor  $visitor
     * @return \Illuminate\Http\Response
     */
    public function edit(Visitor $visitor)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Visitor  $visitor
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Visitor $visitor)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Visitor  $visitor
     * @return \Illuminate\Http\Response
     */
    public function resetVisitor(){

        DB::table($this->table)->truncate();
        $msg = "<span class=\"badge badge-success\">
            Table has been reset </span> ";
        return response()->json(["msg" => $msg]);

    }

    public function destroy($id)
    {

        $msg = "<span class=\"badge badge-success\">
            the item has been remove!</span>";
        return response()->json([
            "msg" => $msg
        ]);
    }
}
