@extends('cleanblog.cleanblog')


@section("meta_title","My embed video")

@section("tag_in_head")
    <script>
        var ownerId = "{{Auth::user()->id}}"
    </script>
@endsection

@section('content')

<Mvideo></Mvideo>
@endsection
