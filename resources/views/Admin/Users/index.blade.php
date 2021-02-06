@extends('sidebar.sidebar')


@section('meta_title',"Managing Users ".Auth::user()->name)

@section('tag_in_head')



@endsection


@section('content')
<div id="app">
    <manage-user></manage-user>
</div>    
@endsection
