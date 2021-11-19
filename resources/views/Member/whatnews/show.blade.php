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

        <!-- show button row START ======================================== -->
            <div class="row">
                <div class="col-lg-6 mt-6">
                    <div class="float-left">
                        <a class="btn btn-outline-primary" href="/member/home">
                            <b-icon icon="house-door"></b-icon>
                        </a>
                    </div>
                </div>
                <div class="col-lg-6 mt-6">
                    <div class="float-right">
                        <a class="btn btn-outline-primary" href="/member/home">
                            <b-icon icon="house-door"></b-icon>
                        </a>
                    </div>
                </div>
            </div>
        <!-- show button row END ========================================== -->

    </div>
    
@endsection
