@extends('sidebar.sidebar')


@section('meta_title',"Post Admin Section ".Auth::user()->name)

@section('tag_in_head')

<script>
  var ownerName = "{!!Auth::user()->name!!}";
  var ownerId = "{!!Auth::user()->id!!}";
</script>

@endsection


@section('content')
  <div id="app">
    <admintaglist :postlist="{{json_encode($postlist)}}"
    :owner_name="{{json_encode($owner_name)}}"
    :tag_id="{{json_encode($tag_id)}}"></admintaglist>
  </div>

@endsection
