<?php

namespace App\Http\Controllers;

use App\Models\Whatnews;
use App\Models\User;
use Illuminate\Http\Request;

class WhatnewsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $wn = Whatnews::where('is_public',1)
                        ->orderBy('created_at','desc')
                        ->paginate(20);
        return view('Pub.index')->with([
            'whatnews' => $wn,
            'ip' => getUserIp()
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
     * @param  \App\Models\Whatnews  $whatnews
     * @return \Illuminate\Http\Response
     */
    public function posts(){
        $wn = Whatnews::where('is_public',1)
                        ->orderBy('created_at','desc')
                        ->paginate(10);
        return view('Pub.whatnews')->with('whatnews',$wn);
    }
    public function show(User $user)
    {
       dd($user);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Whatnews  $whatnews
     * @return \Illuminate\Http\Response
     */
    public function edit(Whatnews $whatnews)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Whatnews  $whatnews
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Whatnews $whatnews)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Whatnews  $whatnews
     * @return \Illuminate\Http\Response
     */
    public function destroy(Whatnews $whatnews)
    {
        //
    }
}
