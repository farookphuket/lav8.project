@extends('sidebar.sidebar')


@section('meta_title',"Template Admin Section ".Auth::user()->name)

@section('tag_in_head')

<script>
  var ownerId = "{!!Auth::user()->id!!}";
  var ownerName = "{!!Auth::user()->name!!}";
  
</script>

@endsection


@section('content')

  <div id="app">
    <admin-template></admin-template>
  </div>

@endsection
