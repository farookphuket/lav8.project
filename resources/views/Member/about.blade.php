@extends('cleanblog.cleanblog')


@section('content')

  @if(!$post->isEmpty())

        @foreach($post as $item)
        <article class="post-preview">
          <a href="/member/home" title="back home">
              <h2 class="post-title">{{$item->post_title}}</h2>
            
            <h3 class="post-subtitle">{{$item->slug}}</h3>
            
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
        
        <article class="post-preview">
          <a href="/member/home" title="back home">
            <h2 class="post-title">This is the abot page</h2>
            
            <h3 class="post-subtitle">about</h3>
            
          </a>
          <p class="post-meta">Posted by
            
          Default
            
            on
            {{date("Y-m-d H:i a",time())}} &middot; <span class="reading-time" title="Estimated read time">
  
   4 mins  read </span>
            
          </p>
        </article>
    @endif

@endsection
