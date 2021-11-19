@extends('sidebar.sidebar')


@section('meta_title',Request::getHttpHost()." admin COMMENT section ".Auth::user()->name)

@section('tag_in_head')

<script>
    var ownerId = "{!!Auth::user()->id!!}";
    var ownerName = "{!!Auth::user()->name!!}";
</script>

@endsection


@section('content')
    <div id="app">
        <admin-comment></admin-comment>
    </div>
@endsection
