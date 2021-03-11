
@extends('cleanblog.cleanblog')


@section('tag_in_head')

<script>
    // global var
    var ownerId = "{!!Auth::user()->id!!}";
    var ownerName = "{!!Auth::user()->name!!}";
</script>

@endsection


@section('content')
    <Song></Song>
@endsection
