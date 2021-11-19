@extends('cleanblog.cleanblog')


@section('meta_title','Welcome '.Auth::user()->name.' post section')


@section('tag_in_head')


@endsection


@section('content')
  <div id="app">
    <postmember :template="{{$template}}" 
       :ownerId="{{Auth::user()->id}}"></postmember>
    <Visitors></Visitors>
  </div>


@endsection
