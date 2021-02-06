@extends('sidebar.sidebar')


@section('meta_title',"welcome dude! ".Auth::user()->name)

@section('tag_in_head')

@endsection


@section('content')
    <div id="app">
        <admin-about :about="{{json_encode($about)}}"></admin-about>
    </div>
@endsection
