@extends('cleanblog.cleanblog')


@section('meta_title','Editing '.$post->post_title.'...')
@section('tag_in_head')

<script>
    $(function(){
            let my_name = "{!!Auth::user()->name!!}";
            
            let exec = new Jodit('.post_excerpt',{
                    placeholder: `Howdy , ${my_name} you can put the HTML tag here`,
                    height: 550
                });


            let body = new Jodit('.post_body',{
                    placeholder: `Howdy , ${my_name} you can put the HTML tag here`,
                    height: 550
                });
        });
</script>

@endsection




@section('content')


<div class="container ">

    <div class="row">
      <div class="col-lg-12 mx-auto">

        <p>Edit your post </p>
        <form method="post" action="{{route('member.posts.update',$post->id)}}">
                @csrf
                @method('PUT')
              <div class="control-group">
                <div class="form-group floating-label-form-group controls">
                  <label>Post Title</label>
                  <input type="text" class="form-control" placeholder="Post title " name="post_title" value="{{$post->post_title}}" required>
                  @error('post_title')
                  <p class="help-block text-danger pt-2">{{$message}}</p>
                  @enderror
                </div>
              </div>




              <div class="control-group">
                <div class="form-group controls">
                  <label>
                      add new Tag :
                  </label>
                  <input type="text" class="form-control mb-4" placeholder="Create new tag for your post" name='new_tag' value="{{old('new_tag')}}">
                  
                    @error('new_tag')
                    <p class="help-block text-danger">{{$message}}</p>
                    @enderror

                    <div class="row">
                        <div class="col-lg-12 col-md-8 pt-4">
                           Recently tags : 
                           @if(!$post->tags->isEmpty())
                            @foreach($post->tags as $tag)
                              <label class="badge badge-success p-2" for="">
                              <input  class="form-control" type="checkbox" name="remove_tags[]" value="{{$tag->id}}"> {{$tag->tag_name}}
                              </label>
                            @endforeach 
                            <span class="badge badge-warning p-2">
                              Check to remove
                            </span>
                            @else
                              <span class="badge badge-success p-2">
                                Create new tag or choose one now
                              </span>
                            @endif
                        </div>

              <div class="col-lg-12 col-md-8 pt-4">
                <p style="margin-top:1em; margin-bottom:1em;">
                click the check box to assign new tag to your post
                </p>
                  Tags available :
                  @foreach($tags as $tag)
                      <label class="badge badge-info text-center" for="">
                          <input  class="form-control pt-2" type="checkbox" name="tags[]" value={{$tag->id}}> {{$tag->tag_name}} 
                      </label>    
                  @endforeach
              </div>
          </div>


                </div>
              </div>


              <div class="control-group">
                <div class="form-group ">
                  <label>Excerpt</label>
                  <textarea rows="5" class="form-control post_excerpt" placeholder="Message" name="post_excerpt">{!!$post->post_excerpt!!}</textarea>
                  @error('post_excerpt')
                  <p class="pt-2 help-block text-danger">{{$message}}</p>
                  @enderror
                </div>
              </div>

              <div class="control-group">
                <div class="form-group ">
                  <label>Post body</label>
                  <textarea rows="5" class="form-control post_body" placeholder="post body" name="post_body">{!!$post->post_body!!}</textarea>
                  @error('post_body')
                  <p class="pt-2 help-block text-danger">{{$message}}</p>
                  @enderror
                </div>
              </div>







              <div class="control-group">
                <div class="form-group controls">
                    <label for="" class="alert alert-warning p-2">
                        <input type="checkbox" class="form-control" name="is_public" @if($post->is_public == 1) checked @endif> 
                        Leave uncheck will be private post
                    </label>
                </div>
              </div>
              <p style="margin-top:1em;">&nbsp;</p>
              <div id="success"></div>
              <div class="form-group">
                <button type="submit" class="btn btn-primary">Update</button>
              </div>
            </form>
      </div>
    </div>
</div>



@endsection
