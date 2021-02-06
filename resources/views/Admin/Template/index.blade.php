@extends('sidebar.sidebar')


@section('meta_title',"Template Admin Section ".Auth::user()->name)

@section('tag_in_head')

<script>
  var ownerId = "{!!Auth::user()->id!!}";
  var ownerName = "{!!Auth::user()->name!!}";
  
</script>

@endsection


@section('content')

  @foreach($templates as $item)
    <?php
      $name = $item->user->name;
    ?>
  @endforeach
  <div id="app">
    <admintemplate :templates="{{json_encode($templates)}}"></admintemplate>
  </div>

@endsection
