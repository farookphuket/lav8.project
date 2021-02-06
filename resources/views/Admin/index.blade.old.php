@extends('sidebar.sidebar')


@section('meta_title',"welcome dude! ".Auth::user()->name)

@section('tag_in_head')

<script>
    $(function(){
            let my_name = "{!!Auth::user()->name!!}";
            let j1 = new Jodit(".whatnews_body",{
                    height: 550,
                    placeholder:    `Howdy ,${my_name} what's in your mind?`
                });
        });
</script>

@endsection


@section('content')
    <div class="container">    
        <div id="app">
            <Whatnews></Whatnews>
        </div>

<!-- xxx -->

  <!-- FORM WHATNEW -->
            <div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="card">
                        <div class="header">
                            <h2>What's up?</h2>

                        </div>
                        <div class="body">
                        <form class="pt-4 form" action="{{route('member.whatnews.store')}}" method="post">
                            @csrf
                            <div class="row clearfix">
                                <div class="col-sm-12">
                                    <div class="form-group">
                                        <div class="form-line">
                                            <input type="text" class="form-control
@error('whatnews_title')->first() bg-danger @enderror
" placeholder="Enter your post title"  name="whatnews_title"  value="{{old('whatnews_title')}}" />


                                            @error('whatnews_title')
                                                <p class="pt-4 mb-4 alert alert-danger">
                                                {{$errors->first('whatnews_title')}}
                                                </p>
                                            @enderror
                                        </div>
                                    </div>


                                </div>
                            </div>


                            <div class="row clearfix">
                                <div class="col-sm-12">
                                    <div class="form-group">
                                        <div class="form-line">
                                            <textarea rows="4" class="form-control summernote whatnews_body" name="whatnews_body">{{old('whatnews_body')}}</textarea>

                                            @error('whatnews_body')
                                                <p class="pt-4 mb-4 alert alert-danger">
                                                {{$errors->first('whatnews_body')}}
                                                </p>
                                            @enderror
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div class="row clearfix">
                                <div class="col-sm-12">
                                    <div class="form-group">
                                        <label class="alert alert-warning" for="basic_checkbox_2">

                                        <input type="checkbox" 
                                            id="basic_checkbox_2" 
                                            class="form-control is_public" name="is_public" />
                                            Public Post? leave un-check your post will be private
                                        </label>
                                    </div>
                                </div>
                            </div>


                            <div class="row clearfix">
                                <div class="col-sm-12">
                                    <button class="btn btn-block btn-primary" type="submit">Post</button>
                                </div>
                            </div>


                            </form>

                        </div>

                    </div>
                </div>
            </div>
            <!-- #END# FORM WHATNEW -->

<!-- xxx -->

<p class="pt-4 mb-4">&nbsp;</p>
<div class="line"></div>
@if($whatnews->isEmpty())
    @include('INC/_no_data')

    <div class="line"></div>
@else
    @foreach($whatnews as $item)

    <article class="post-preview">
      <a href="#">
          <h2 class="post-title">{{$item->whatnews_title}}</h2>
        
      </a>
      <p class="post-meta">Posted by
        
      {{$item->user->name}}
        
      on {{$item->created_at}} &middot; <span class="reading-time" title="Estimated read time">
      
          {{$item->created_at->diffForHumans()}} </span>

      @if($item->updated_at != $item->created_at)

      last update {{$item->updated_at}} &middot; <span class="reading-time" title="Last update">
      
          {{$item->updated_at->diffForHumans()}} </span>
        @endif
      </p>
      {!!$item->whatnews_body!!}
      <p class="pt-4 mb-4">
        &nbsp;
      </p>
      @if(Auth::user()->is_admin)
          <div class="float-left">
              @if($item->is_public == 1)
                  <p class="alert alert-success">
                  Public
                  </p>
              @else

                  <p class="alert alert-warning">
                  Private
                  </p>
              @endif
          </div>
          <div class="btn-group float-right">
              <a class="btn btn-primary" href="{{route('admin.whatnews.edit',$item->id)}}">
                  Edit
              </a>

              <form class="form" action="{{route('member.whatnews.destroy',$item->id)}}" method="post">
                  @csrf
                  @method("DELETE")
                  <button class="btn btn-danger" type="submit">Delete</button>

              </form>
          </div>
      @endif

    </article>

    <p class="pt-4 mb-4">&nbsp;</p>
    <div class="line"></div>
    @endforeach
    {{$whatnews->links()}}
@endif

</div>
@endsection
