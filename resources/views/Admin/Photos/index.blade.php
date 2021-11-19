@extends('sidebar.sidebar')


@section('meta_title',Request::getHttpHost()." PHOTO admin section ".Auth::user()->name)

@section('content')
    <div id="app">
        <admin-photo></admin-photo>
    </div>
@endsection
