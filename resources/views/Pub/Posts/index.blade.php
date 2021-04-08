@extends('Template.green.index')

@section('meta_title','Blog post')

@section('content')
<!-- ===== Green template Start ==== -->

    <section id="about" class="about">
      <div class="container">
    @if(!$posts->isEmpty())
        @foreach($posts as $item)
        <div class="section-title mb-4">
            <h2>
                {{$item->post_title}}
            </h2>
            <div>
            {!!$item->post_excerpt!!}

            <a class="btn btn-outline-primary" 
                        href="{{route('posts.show',$item->slug)}}">read more...</a>

                
                <div class="clearfix">
                        <div class="float-right pt-4">

                        <span class="badge badge-primary">
                            <b-icon aria-hidden="true" icon="clock-history"></b-icon>
                            {{$item->created_at}} &middot;  
                            {{$item->created_at->diffForHumans()}}
                        </span>

                        <span class="badge badge-warning">
                            <b-icon icon="eye" aria-hidden="true"></b-icon>
                            {{$item->read_count}}
                        </span>

                        <span class="badge badge-info">
                        <b-icon aria-hidden="true" icon="person"></b-icon>
                        {{$item->user->name}}
                        </span> 
Tag :
                            @foreach($item->tags as $ta)
                                <a 
href='{{route('posts.index',['tag' => $ta->id])}}'
class="btn btn-outline-info btn-sm">
                                    {{$ta->tag_name}}
                                </a>
                            @endforeach
                        </div>
                </div>
            </div>
        </div>
         
            @endforeach

            <div class="pagination ">
                {{$posts->appends(Request::all())->links()}}
            </div>
            @endif

    @if(!$tags->isEmpty())

            <div class="clearfix">
                <div class="float-right pt-4">
                    @foreach($tags as $tag)
                      <span class="tags">
                        <a  class="btn btn-outline-info btn-sm" 
                            href='{{route('posts.index',['tag' => $tag->id])}}'>
                            {{$tag->tag_name}}
                        </a>
                        </span>
                    @endforeach
                </div>
            </div>
    @endif
      </div>
    </section>
<!-- ===== Green template End ==== -->


@endsection
