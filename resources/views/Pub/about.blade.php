@extends('cleanblog.cleanblog')


@section('content')

  @if(!$post->isEmpty())

    @foreach($post as $item)
        @section("meta_title",$item->post_title)
        <article class="post-preview">
          <a href="/member/home" title="back home">
              <h2 class="post-title">{{$item->post_title}}</h2>
          </a>
          <p class="post-meta">Posted by
            
          {{$item->user->name}}
            
            on
            {{$item->created_at}} &middot; <span class="reading-time" title="Estimated read time">
  
                {{$item->created_at->diffForHumans()}} </span>
            
          </p>

          <div>
              {!!$item->post_excerpt!!}
          </div>
          <div>
              {!!$item->post_body!!}
          </div>
        </article>

      @endforeach

    @else
        @include("INC.about-default")
    @endif
@endsection
