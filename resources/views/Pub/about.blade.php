@extends('Template.green.index')


@section('content')

  @if(!$post->isEmpty())

    @foreach($post as $item)
        @section("meta_title",$item->post_title)

<div class="container">

          <a href="/member/home" title="back home">
              <h2 class="post-title">{{$item->post_title}}</h2>
          </a>

            <p class="font-italic">
                <span class="badge badge-info">
                    <b-icon icon="person"></b-icon> 
                    {{$item->user->name}}
                </span>
                
               <span class="badge badge-primary">
                    <b-icon icon="clock"></b-icon> 
                    {{$item->created_at}}

                    &middot; 
                    {{$item->created_at->diffForHumans()}}
                </span>
               <span class="badge badge-warning">
                    <b-icon icon="calendar2-day"></b-icon>  
                    {{$item->updated_at}}
                    &middot; 

                    {{$item->updated_at->diffForHumans()}}
                </span>
            </p>


          <div>
              {!!$item->post_excerpt!!}
          </div>
          <div>
              {!!$item->post_body!!}
          </div>

</div>

      @endforeach

    @else
        @include("INC.about-default")
    @endif
@endsection
