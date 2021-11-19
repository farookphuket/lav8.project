<?php

namespace App\Http\Controllers;

use App\Models\Visitor;
use Illuminate\Http\Request;

class VisitorsController extends Controller
{
    protected $visitor_table;
    protected $today_short;
    protected $today_long;

    public function __construct(){
        $this->today_short = date("Y-m-d");
        $this->today_long = date("Y-m-d H:i:s");
        $this->visitor_table = "visitors";
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        //$this->isNewVisitor();

        // new visitor method created on 6 Aug 2021
        Visitor::CountVisitor();

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

        // will create new record if no row were found
        Visitor::CountVisitor();
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


    /*========== make backup 26 June 2021 STAT ================*/
    public function backupInsert(){
        $visit = Visitor::latest()->first();
        $file = base_path("DB/visitors_file.sqlite");
        $con2 = "/* ========= auto script ".date("Y-m-d H:i:s");
        $con2 .= " ====== to {$this->visitor_table}*/";
        $con2 .= "
INSERT INTO `{$this->visitor_table}` (`client_ip`,`client_os`,
`client_browser`,`visited_month`,`visited_year`,
`last_visited_date`,`created_at`,`updated_at`) VALUES (
 '{$visit->client_ip}',                             
'{$visit->client_os}',                                          
'{$visit->client_browser}',                        
'{$visit->visited_month}',                
'{$visit->visited_year}',                 
'{$visit->last_visited_date}',
'{$visit->created_at}',
'{$visit->updated_at}');                                          

";
        write2text($file,$con2);
    }
    /*========== make backup 26 June 2021 End ================*/
}

