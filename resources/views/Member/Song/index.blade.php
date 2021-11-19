
@extends('cleanblog.cleanblog')


@section('tag_in_head')


@endsection


@section('content')
    <msong :user_id="{{Auth::user()->id}}"></msong>
@endsection
