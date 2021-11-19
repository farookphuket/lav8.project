@extends('sidebar.sidebar')


@section('meta_title',"Template Admin Section ".Auth::user()->name)

@section('tag_in_head')

<script>

</script>

@endsection


@section('content')
    <div id="app">
        <admintemplate></admintemplate>
    </div>
@endsection
