@extends('cleanblog.cleanblog')


@section('meta_title',$post->post_title)
@section('meta_keywords',$post->post_title)
@section('meta_des',$post->post_title)

@section('content')
    
<article class="post-preview">
  <a href="{{route('posts.index')}}" title="click to go back">
      <h2 class="post-title">{{$post->post_title}}</h2>
  </a>

  <div class="float-right">
    <span class="badge badge-info">
      post by  {{$post->user->name}}
    </span>
    <span class="badge badge-info">
      on  {{$post->created_at}} -  {{$post->created_at->diffForHumans()}}
    </span>
    @if($post->created_at != $post->updated_at)
      <span class="badge badge-default">
        on  {{$post->updated_at}} -  {{$post->updated_at->diffForHumans()}}
      </span>
    @endif
  </div>
  <p style="margin-top:2em;">&nbsp;</p>
  {!!$post->post_excerpt!!}
  <p style="margin-top:2em;">&nbsp;</p>
  {!! $post->post_body!!}

  <p style="magin-top:2em;">&nbsp;</p>

  <div class="clearfix"><!-- clearfix START-->
      <div class="float-left">
        <a class="btn btn-outline-info" href="{{route('posts.index')}}">Back</a>
      </div>

      <div class="float-right">
        <div>
        @foreach($post->tags as $tag)
            <span>
              <a class="btn btn-outline-info"
href='{{route('posts.index',['tag' => $tag->id])}}'>{{$tag->tag_name}}</a>
            </span>
        @endforeach
        </div>
      </div>

  </div><!-- end of div.clearfix-->
</article>

@endsection
