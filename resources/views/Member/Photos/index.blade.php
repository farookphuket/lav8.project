@extends('cleanblog.cleanblog')


@section("meta_title","My embed photo")

@section("tag_in_head")
    <script>
        var ownerId = "{{Auth::user()->id}}"
    </script>
@endsection

@section('content')

<member-photo></member-photo>
@endsection
