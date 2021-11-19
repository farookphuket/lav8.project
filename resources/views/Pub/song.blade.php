@extends('Template.green.index')


@if(!$last_title)
    @section("meta_title","My karaoke ")
@else

    @section("meta_title",$last_title->song_name)
@endif
@section('content')



<Song></Song>

@endsection
