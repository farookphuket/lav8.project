@extends('cleanblog.cleanblog')

@section('meta_title','Blog post')

@section('content')

    @if(!$posts->isEmpty())
        @foreach($posts as $item)

          @if($item->slug != "about")
            <article class="post-preview">
                <a href="{{route('posts.show',$item->slug)}}" title="click to read full detail">
                  <h2 class="post-title">{{$item->post_title}}</h2>

                  <h3 class="post-subtitle">{{$item->slug}}</h3>

              </a>

              <p class="post-meta">Posted by
                
              {{$item->user->name}}
                
                on
                {{$item->created_at}} &middot; 
                <span class="reading-time" title="{{$item->post_title}}">
                  {{$item->created_at->diffForHumans()}}
                </span>

                @if($item->created_at != $item->updated_at)
                    &middot;
                    last update
                    {{$item->updated_at}} &middot; 
                    <span class="reading-time" title="{{$item->post_title}}">
                      {{$item->updated_at->diffForHumans()}}
                    </span>
                @endif
              </p>
              <p class="pt-4 mb-4">
                {!!$item->post_excerpt!!}
              </p>
            </article>

            <hr>

            @endif
            @endforeach
            <div class="pagination ">
                {{$posts->appends(Request::all())->links()}}
            </div>
    @else
        @include('INC/_no_data')
    @endif
    @if(!$tags->isEmpty())
       <div class="tags">

            @foreach($tags as $tag)
              <span>
                <a href='{{route('posts.index',['tag' => $tag->id])}}'>{{$tag->tag_name}}</a>
                </span>
            @endforeach

       </div>
    @endif
@endsection
