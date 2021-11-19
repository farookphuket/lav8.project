@extends('sidebar.sidebar')


@section('meta_title',Request::getHttpHost()." admin section ".Auth::user()->name)

@section('tag_in_head')


@endsection


@section('content')
    <h1 class="text-center">howdy! {{Auth::user()->name}}</h1>
    <div id="app">
        <adminwm :template="{{$template}}" 
:ownerId="{{Auth::user()->id}}"></adminwm>
    </div>
@endsection
