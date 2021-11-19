@extends('sidebar.sidebar')


@section('meta_title',"Post Admin Section ".Auth::user()->name)

@section('tag_in_head')

<script>

</script>

@endsection


@section('content')

    <div class="container">    

<!-- xxx -->
  <div class="row">
    <div class="col-lg-12">
      <div class="text-center">
      @if(!$tags)
        no tag
      @else
        @foreach($tags as $tag)
          
          <span class="badge badge-success p-2 text-center" style="margin-top:1em;">
            <a href="{{route('admin.post.index',['tag' => $tag->id])}}">{{$tag->tag_name}}</a>
          </span>
        @endforeach
      @endif
      </div>

      <div class="float-left btn-group">
        <a class="btn btn-primary" href="{{route('admin.tags.index')}}">Manage Tag</a>
      </div>
      <div class="float-right btn-group">
        <a class="btn btn-primary" href="{{route('admin.post.create')}}">New Post</a>
      </div>
    </div>
  </div>
<!-- #END# FORM WHATNEW -->

<!-- xxx -->

<p class="pt-4 mb-4">&nbsp;</p>
<div class="line"></div>
@if($posts->isEmpty())
    @include('INC/_no_data')

    <div class="line"></div>
@else
    @foreach($posts as $item)

    <article class="post-preview">
      <a href="{{route('admin.post.show',$item->slug)}}">
          <h2 class="post-title">{{$item->post_title}}</h2>
        
      </a>
      <p class="post-meta">Posted by
        
      {{$item->user->name}}
        
      on {{$item->created_at}} &middot; <span class="reading-time" title="Estimated read time">
      
          {{$item->created_at->diffForHumans()}} </span>

      @if($item->updated_at != $item->created_at)

      last update {{$item->updated_at}} &middot; <span class="reading-time" title="Last update">
      
          {{$item->updated_at->diffForHumans()}} </span>
        @endif
      </p>
      {!!$item->post_excerpt!!}
      <p class="pt-4 mb-4">
        &nbsp;
      </p>
      @if(Auth::user()->is_admin)
          <div class="float-left">
              @if($item->is_public == 1)
                  <p class="alert alert-success">
                  Public
                  </p>
              @else

                  <p class="alert alert-warning">
                  Private
                  </p>
              @endif
          </div>
          <div class="btn-group float-right">
              <a class="btn btn-primary" href="{{route('admin.post.edit',$item->id)}}">
                  Edit
              </a>

              <form class="form" action="{{route('admin.post.destroy',$item->id)}}" method="post">
                  @csrf
                  @method("DELETE")
                  <button class="btn btn-danger" type="submit">Delete</button>

              </form>
          </div>
      @endif

    </article>

    <p class="pt-4 mb-4">&nbsp;</p>
    <div class="line"></div>
    @endforeach
    {{$posts->appends(Request::all())->links()}}
@endif

</div>
@endsection
