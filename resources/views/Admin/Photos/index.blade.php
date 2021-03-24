@extends('sidebar.sidebar')


@section('meta_title',"Photo ! ".Auth::user()->name)


@section('content')
    <div id="app">
        <admin-photo></admin-photo>
    </div>
@endsection
