@extends('cleanblog.cleanblog')
@section('meta_title',Auth::user()->name.'\'s profile edit')
@section('content')

<div class="container">
    <div id="app">

        <member-profile :user="{{ $user_info }}"></member-profile>

        <Visitors></Visitors>
    </div>
</div>
@endsection
