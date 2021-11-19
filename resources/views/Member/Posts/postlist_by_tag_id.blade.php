@extends('cleanblog.cleanblog')


@section('tag_in_head')




@endsection


@section('content')
    <div id="app">
        <tag-with-post-list
            :tag_id="{{json_encode($tag_id)}}"
            :tag_all="{{json_encode($tag_all)}}"
            ></tag-with-post-list>

        <Visitors></Visitors>
    </div>
@endsection
