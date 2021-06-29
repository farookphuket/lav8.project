@extends('Template.green.index')

@foreach($post as $item)
<?php
    $title = $item->post_title;
    $slug = $item->slug;
    $excerpt = $item->post_excerpt;
    $body = $item->post_body;
    $tags = $item->tags;
    $comments = $item->comments;
    $name = $item->user->name;
    $created_at = $item->created_at;
    $updated_at = $item->updated_at;
    $post_id = $item->id;
?>
@endforeach

@section('meta_title',$title)
@section('meta_keywords',$title)
@section('meta_des',$title)

@section('content')
    
<div class="container">
    <div class="section-title pt-4">
        <a href="{{route('posts.index')}}" title="click to go back">
            <h2 class="pt-2">
            <b-icon icon="chevron-double-left"></b-icon>
            {{$title}}</h2>
        </a>
    </div>

  <div class="float-right">
    <span class="badge badge-info p-2">
        <b-icon icon="person"></b-icon>
        {{$name}}
    </span>
    <span class="badge badge-info p-2">
        <b-icon icon="calendar-day"></b-icon>
        {{$created_at}}
    </span> &middot; 
    <span class="badge badge-info p-2">
        <b-icon icon="clock-history"></b-icon>
        {{$created_at->diffForHumans()}}
    </span>
    @if($created_at != $updated_at)
      <span class="badge badge-primary p-2">
        <b-icon icon="calendar-day"></b-icon>
        {{$updated_at}}
      </span> &middot;
        
        <span class="badge badge-warning p-2">
            <b-icon icon="clock-history"></b-icon>
            {{$updated_at->diffForHumans()}}
        </span>
    @endif
  </div>
  <p style="margin-top:2em;">&nbsp;</p>
  {!!$excerpt!!}
  <p style="margin-top:2em;">&nbsp;</p>
  {!! $body!!}

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
        @foreach($tags as $tag)
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
<div class="col-lg-12">
    <h2 class="mb-4 pt-4">comments</h2>
    
    <pub-comment :post_id="{!!$post_id!!}"></pub-comment>
</div>
<p class="pt-4 mb-8">&nbsp;</p>

</div>

@endsection
