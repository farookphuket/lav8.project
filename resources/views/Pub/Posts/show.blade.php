@extends('Template.green.index')


@section('meta_title',$post->post_title)
@section('meta_keywords',$post->post_title)
@section('meta_des',$post->post_title)

@section('content')
    
<div class="container">
    <div class="section-title">
        <a href="{{route('posts.index')}}" title="click to go back">
            <h2>
            <b-icon icon="chevron-double-left"></b-icon>
            {{$post->post_title}}</h2>
        </a>
    </div>

  <div class="float-right">
    <span class="badge badge-info p-2">
        <b-icon icon="person"></b-icon>
        {{$post->user->name}}
    </span>
    <span class="badge badge-info p-2">
        <b-icon icon="calendar-day"></b-icon>
        {{$post->created_at}}
    </span> &middot; 
    <span class="badge badge-info p-2">
        <b-icon icon="clock-history"></b-icon>
        {{$post->created_at->diffForHumans()}}
    </span>
    @if($post->created_at != $post->updated_at)
      <span class="badge badge-primary p-2">
        <b-icon icon="calendar-day"></b-icon>
        {{$post->updated_at}}
      </span> &middot;
        
        <span class="badge badge-warning p-2">
            <b-icon icon="clock-history"></b-icon>
            {{$post->updated_at->diffForHumans()}}
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
        <a class="btn btn-outline-info btn-sm" 
            href="{{route('posts.index')}}"> 
            <b-icon icon="chevron-double-left"></b-icon>
            Back</a>
      </div>

      <div class="float-right">
        <div>
        @foreach($post->tags as $tag)
            <span>

              <a class="btn btn-outline-info btn-sm"
                href='{{route('posts.index',['tag' => $tag->id])}}'>
                <b-icon icon="tags"></b-icon> 
                {{$tag->tag_name}}</a>
            </span>
        @endforeach
        </div>
      </div>

  </div><!-- end of div.clearfix-->
<p class="pt-4">&nbsp;</p>
</div>

@endsection
