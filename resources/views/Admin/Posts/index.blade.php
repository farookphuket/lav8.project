@extends('sidebar.sidebar')



@section('meta_title',Request::getHttpHost()." admin POST section ".Auth::user()->name)

@section('tag_in_head')

<script>
  var ownerName = "{!!Auth::user()->name!!}";
  var ownerId = "{!!Auth::user()->id!!}";
</script>

@endsection


@section('content')

  <div id="app">
    <Adminpost :template="{{$template}}"></Adminpost>
  </div>

@endsection
