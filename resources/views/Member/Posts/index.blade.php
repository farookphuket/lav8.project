@extends('cleanblog.cleanblog')


@section('meta_title','Welcome '.Auth::user()->name.' post section')


@section('tag_in_head')

  <script>
    var ownerName = "{!!Auth::user()->name!!}";
    var ownerId = "{!!Auth::user()->id!!}";

  </script>


@endsection


@section('content')

  @foreach($posts as $item)
    <?php
      $name = $item->user->name;
    ?>
  @endforeach

  <div id="app">
    <postmember :template="{{$template}}"></postmember>
    <Visitors></Visitors>
  </div>


@endsection
