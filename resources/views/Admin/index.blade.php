@extends('sidebar.sidebar')


@section('meta_title',"welcome dude! ".Auth::user()->name)

@section('tag_in_head')

<script>
    var ownerId = "{!!Auth::user()->id!!}";
    var ownerName = "{!!Auth::user()->name!!}";
</script>

@endsection


@section('content')
    <div id="app">
        <adminwm :template="{{$template}}"></adminwm>
    </div>
@endsection
