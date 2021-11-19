@extends('sidebar.sidebar')


@section('meta_title',"Video from Youtube ".Auth::user()->name)

@section('tag_in_head')

<script>
    var ownerId = "{!!Auth::user()->id!!}";
    var ownerName = "{!!Auth::user()->name!!}";
</script>

@endsection


@section('content')
    <div id="app">
        <Avideo></Avideo>
    </div>
@endsection
