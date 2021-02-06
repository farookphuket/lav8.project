@extends('sidebar.sidebar')


@section('meta_title',"View  ".$post->post_title)

@section('tag_in_head')

<script>

</script>

@endsection


@section('content')
<div class="container">    
    <div id="app">
    </div>
    <div class="row">
      <div class="col-lg-12  mx-auto">
            <h1 class="text-center">{{$post->post_title}}</h1>

            <div class="float-right">
              <span class="badge badge-info">
                post by  {{$post->user->name}}
              </span>
              <span class="badge badge-info">
                on  {{$post->created_at}} &middot;  {{$post->created_at->diffForHumans()}}
              </span>
              @if($post->created_at != $post->updated_at)
                <span class="badge badge-warning">

                  last update  {{$post->updated_at}} &middot;  {{$post->updated_at->diffForHumans()}}
                </span>
              @endif
            </div>
            <p style="margin-top:2em;">&nbsp;</p>
            {!!$post->post_excerpt!!}

            <p style="margin-top:2em;">&nbsp;</p>
            {!!$post->post_body!!}

            <p style="margin-top:2em;">&nbsp;</p>
            @if($post->tags)
                @foreach($post->tags as $tag)

                    <span class="badge badge-success p-2">
                        {{$tag->tag_name}}
                    </span>
                @endforeach
            @endif
      </div>
    </div>
</div>
@endsection
