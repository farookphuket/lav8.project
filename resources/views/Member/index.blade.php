@extends('cleanblog.cleanblog')


@section('tag_in_head')

<script>
    // global var
    var ownerId = "{!!Auth::user()->id!!}";
    var ownerName = "{!!Auth::user()->name!!}";
</script>

@endsection


@section('content')

<div class="col-lg-12">
    <h1 class="text-center mb-4">
        Howdy {{Auth::user()->name}},what in your mind?
    </h1>
</div>


  @foreach($whatnews as $item)

      <?php 
          $item->user->name;
      ?>
  @endforeach


    <whatnews-member :templates="{{$templates}}" 
:user_id='{{Auth::user()->id}}'></whatnews-member>

@endsection
