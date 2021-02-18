@extends('cleanblog.cleanblog')


@section('content')

    @if(!$whatnews->isEmpty())
        <h1 class="text-center page-heading">What's going on {{date('d-m-Y')}}</h1>
      @foreach($whatnews as $item)
        @section("meta_title",$item->whatnews_title)
        @section("meta_keywords",$item->whatnews_title)
        @section("meta_des",$item->whatnews_title)
        <article class="post-preview">

            <a href="#" title="this is not a link">
                        <h2 class="post-title">{{$item->whatnews_title}}</h2>
                        
                      </a>
                      <p class="post-meta">Posted by
                        
                      {{$item->user->name}}
                        
                        on
                        {{$item->created_at}} &middot; <span class="reading-time" title="created">
              
                          {{$item->created_at->diffforHumans()}} </span>

                        
                      </p>
                      <p class="pt-4">&nbsp;</p>
                      {!!$item->whatnews_body!!}
        </article>

        <hr>

        @endforeach


        <div class="clearfix pt-4">
            {{$whatnews->links()}}
        </div>

          
      @else
          @include('INC/_no_data')
        @endif
@endsection
