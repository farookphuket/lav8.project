@extends('cleanblog.cleanblog')

@section("meta_title",$wn->whatnews_title)

@section('tag_in_head')


@endsection




@section('content')

    <div class="container">
        <h1 class="text-center">{{$wn->whatnews_title}}</h1>
        <div class="clearfix">
            <div class="float-right">
                <p>
                By
                <span class="badge badge-info">{{$wn->user->name}}</span>
                on
                <span class="badge badge-info">{{$wn->created_at}}</span>
                <span class="badge badge-info">
                    &middot;
                    {{$wn->created_at->diffForHumans()}}
                </span>
                </p>
            </div>
        </div>
        <div class="card card-body">
            {!!$wn->whatnews_body!!}
        </div>
        <div class="clearfix">
            <div class="text-center">
                <a class="btn btn-primary" href="/member/home">Back</a>
            </div>
        </div>
    </div>
    
@endsection
