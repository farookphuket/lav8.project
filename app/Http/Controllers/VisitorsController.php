<?php

namespace App\Http\Controllers;

use App\Models\Visitor;
use Illuminate\Http\Request;

class VisitorsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $this->isNewVisitor();

        $numToday = $this->numToday();
        $numAllTime = count(Visitor::all());
        $numThisMonth = $this->numThisMonth();
        $numThisYear = $this->numThisYear();
        $ip = getUserIp();
        $browser = getUserBrowser();
        $os = getUserOs();

        return response()->json([
            'ip' => $ip,
            'browser' => $browser,
            'os' => $os,
            'numToday' => $numToday,
            'numThisMonth' => $numThisMonth,
            'numThisYear' => $numThisYear,
            'numAllTime' => $numAllTime
        ],200);
    }

    public function isNewVisitor(){
        $newUserIp = getUserIp();
        $newUserBrowser = getUserBrowser();
        $newUserOs = getUserOs();

        $today = date('Y-m-d');
        $month = date('m');
        $year = date('Y');
        $getUser = Visitor::where('client_ip',$newUserIp)
                            ->where('last_visited_date',$today) 
                                ->get();

        $numToday = count($getUser);
        
        if($numToday == 0):
            //add new visitor
            Visitor::create([
                'client_ip' => $newUserIp,
                'client_browser' => $newUserBrowser,
                'client_os' => $newUserOs,
                'visited_month' => $month,
                'visited_year' => $year,
                'last_visited_date' => $today
            ]);
        endif;
        //return $numToday;

    }

    public function numToday(){
        $today = date('Y-m-d');
        $get = Visitor::where('last_visited_date',$today)->get();
        $num = count($get);
        return $num;
    }

    public function numThisMonth(){
        $thisMonth = date('m');
        $thisYear = date('Y');
        return count(Visitor::where('visited_month',$thisMonth)
           ->where('visited_year',$thisYear) 
            ->get());
    }

    public function numThisYear(){

        $curYear = date('Y');

        return count(Visitor::where('visited_year',$curYear)->get());

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
    public function destroy(Visitor $visitor)
    {
        //
    }
}
