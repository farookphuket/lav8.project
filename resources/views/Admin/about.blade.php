@extends('sidebar.sidebar')

@section('meta_title',Request::getHttpHost()." admin section ".Auth::user()->name)

@section('tag_in_head')

@endsection


@section('content')
    <div id="app">
        <admin-about :template="{{json_encode($template)}}" 
                :about="{{json_encode($about)}}"></admin-about>
    </div>
@endsection
