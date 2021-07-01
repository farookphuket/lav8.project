
@extends('sidebar.sidebar')



@section('meta_title',Request::getHttpHost()." admin SONG section ".Auth::user()->name)



@section('content')
    <div id="app">
        <admin-song></admin-song>
    </div>
@endsection
