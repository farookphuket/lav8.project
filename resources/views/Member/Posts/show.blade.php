@extends('cleanblog.cleanblog')


@section("meta_title",$post->post_title)
@section("meta_keywords",$post->post_title)
@section("meta_des",$post->post_title)

@section('tag_in_head')


  <script>
  
    var userId = {!!Auth::user()->id!!};
  </script>

@endsection


@section('content')
<article class="post-preview">
  <a href="">
    <h2 class="post-title">
        {{$post->post_title}}
    </h2>

    <h3 class="post-subtitle">{{$post->slug}}</h3>

  </a>

  <p class="pt-4">&nbsp;</p>
  {!!$post->post_excerpt!!}

  <p class="pt-4">&nbsp;</p>
  {!!$post->post_body!!}

  <p class="pt-4 mb-4">&nbsp;</p>
  <div class="float-left">
    <a class="btn btn-primary" href="{{route('member.posts.index')}}">Back</a>
  </div>
  @if(!$post->tags->isEmpty())
    <div class="float-right text-center pt-4">
        Tags :
        @foreach($post->tags as $tag)
            <span class="badge badge-success p-2">
                 {{$tag->tag_name}}
            </span>
        @endforeach
    </div>
  @endif


<hr>
<div class="col-lg-12" style="margin-top:4em;">&nbsp;</div>

    <comment-member
      :post_id="{{$post->id}}" 
    :owner_id="{{Auth::user()->id}}"
      ></comment-member>
    </div>
    <Visitors></Visitors>

</article>


@endsection
