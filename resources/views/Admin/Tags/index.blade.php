@extends('sidebar.sidebar')


@section('meta_title',"Manage Tags Admin Section ".Auth::user()->name)

@section('tag_in_head')


@endsection


@section('content')

  <div id="app">
    <Admintag></Admintag>

  </div>

@endsection
