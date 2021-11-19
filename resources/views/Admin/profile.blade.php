@extends('sidebar.sidebar')


@section('meta_title',Auth::user()->name.'\'s profile edit')

@section('content')

<div class="container">
    <div id="app">
        <admin-profile :user="{{$user_info}}"></admin-profile>
    </div>
</div>

@endsection
