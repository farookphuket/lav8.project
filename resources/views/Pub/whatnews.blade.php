<!--
@extends('cleanblog.cleanblog')
-->

@extends('Template.green.index')


@section('content')

    @if(!$whatnews->isEmpty())
        <h1 class="text-center page-heading">post by member {{date('d-m-Y')}}</h1>
      @foreach($whatnews as $item)

        <article class="post-preview">

            <a href="#" title="view all post from {{$item->user->name}}">
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

        <p class="pt-4 mb-4">&nbsp; get file</p>
        <hr>
        <p class="pt-4 mb-4">&nbsp;</p>

        @endforeach


        <div class="clearfix pt-4">
            {{$whatnews->links()}}
        </div>

          
      @else

          @include('INC/_no_data')
        @endif
@endsection
