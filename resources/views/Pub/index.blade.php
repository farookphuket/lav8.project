@extends('Template.green.index')




@section('content')
    <section id="about" class="about">
        <div class="container">
            <div class="section-title">
                <h2 >what's up!</h2>
            </div>
            <pub-search></pub-search>            

            @if(!$whatnews->isEmpty())            
                @foreach($whatnews as $item)
                    @section('meta_title',$item->whatnews_title)
                    @section('meta_keywords',$item->whatnews_title) 
                    @section('meta_des',$item->whatnews_title)
                <div class="pt-4">
                    <h2 class="text-center pt-2">{{$item->whatnews_title}}</h2>
                    <div class="clearfix">
                        <div class="float-right">
                            <span class="badge badge-info">
                                <b-icon icon="person"></b-icon> 
                                {{$item->user->name}}
                            </span> &middot; 
                            <span class="badge badge-warning">
                                <b-icon icon="calendar2-day"></b-icon>
                                {{$item->created_at}} &middot; 
                                {{$item->created_at->diffForHumans()}}
                            </span>
                        </div>
                    </div>
                    {!!$item->whatnews_body!!}
                </div>
                <hr class="mb-4">
                
                @endforeach
            <div class="clearfix pt-4">
             {{$whatnews->links()}}
            </div>

          
            @else
                @include('INC/_no_data')
            @endif
        </div>
    </section>
@endsection
