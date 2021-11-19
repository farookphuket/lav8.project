@extends('sidebar.sidebar')


@section('meta_title',"Managing Users ".Auth::user()->name)

@section('tag_in_head')

<script>
    var userId = "{!!Auth::user()->id!!}";
</script>

@endsection


@section('content')
<div id="app">
    <manage-user></manage-user>
</div>    
@endsection
