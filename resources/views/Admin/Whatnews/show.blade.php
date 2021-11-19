@extends('sidebar.sidebar')


@section('meta_title',$whatnews->whatnews_title)

@section('tag_in_head')


@endsection


@section('content')

<div class="container">
    <div id="app"></div>
    <h1 class="text-center">
        {{$whatnews->whatnews_title}}
    </h1>
    <div class="clearfix">
        <div class="float-right">
            <p>
            By 
            <span class="badge badge-info">
                {{$whatnews->user->name}}
            </span>
            On 
            <span class="badge badge-info">
                {{$whatnews->created_at}}
                &middot;

                {{$whatnews->created_at->diffForHumans()}}
            </span>
            </p>
        </div>
    </div>
    <div class="line"></div>
    {!!$whatnews->whatnews_body!!}


</div>
<div class="col-lg-12 pt-4 mb-2">&nbsp;</div>
@endsection
