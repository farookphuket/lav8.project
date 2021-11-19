@extends('cleanblog.cleanblog')


@section('tag_in_head')

<script>
    $(function(){

        let my_name = '{!!Auth::user()->name!!}';
        let msg1 = `${my_name} ,put your post title sentence here`;
        let msg2 = `dear ${my_name} , you can create your new post here and you can use HTML tag as well`;
        let excerpt = new Jodit('.post_excerpt',{
            'height' : 550,
            'placeholder' : msg1 
          });

        let body = new Jodit('.post_body',{
            'height' : 550,
            'placeholder' : msg2 
          });
    });
</script>

@endsection


@section('content')

<div class="container ">

    <div class="row">
      <div class="col-lg-12  mx-auto">

        <p>
          Create your new post here
        </p>
            <form method="post" action="{{route('member.posts.store')}}">
                @csrf
              <div class="control-group">
                <div class="form-group floating-label-form-group controls">
                  <label>Post Title</label>
                  <input type="text" class="form-control" placeholder="Post title " name="post_title" value="{{old('post_title')}}" required>
                  @error('post_title')
                  <p class="help-block text-danger pt-2">{{$message}}</p>
                  @enderror
                </div>
              </div>




              <div class="control-group">
                <div class="form-group controls   ">
                  <label>
                      Tag
                  </label>
                  <input type="text" class="form-control mb-4" placeholder="Create new tag for your post." name='new_tag' value="{{old('new_tag')}}">
                  
                    @error('new_tag')
                    <p class="help-block text-danger">{{$message}}</p>
                    @enderror
                    @foreach($tags as $tag)
                        <label class="badge badge-info text-center" for="">
                            <input  class="form-control pt-2" type="checkbox" name="tags[]" value={{$tag->id}}> {{$tag->tag_name}} 
                        </label>    
                    @endforeach
                </div>
              </div>


              <div class="control-group">
                <div class="form-group  controls">
                  <label>Post excerpt</label>
                  <textarea rows="5" class="form-control post_excerpt summernote"  name="post_excerpt">{{old('post_excerpt')}}</textarea>
                  @error('post_excerpt')
                  <p class="pt-2 help-block text-danger">{{$message}}</p>
                  @enderror
                </div>
              </div>

              <div class="control-group">
                <div class="form-group ">
                  <label>Post body</label>
                  <textarea rows="5" class="form-control post_body summernote" name="post_body">{{old('post_body')}}</textarea>
                  @error('post_body')
                  <p class="pt-2 help-block text-danger">{{$message}}</p>
                  @enderror
                </div>
              </div>






              <div class="control-group">
                <div class="form-group controls">
                    <label for="" class="badge badge-warning text-center">
                        <input type="checkbox" class="form-control pt-2" name="is_public" value=""> 
                        Yes , I want to publish my post.
                    </label>
                </div>
              </div>

              <p style="margin-top:1.5em;"></p>
              <div class="float-right">
                <div class="btn-group">
                  <button type="submit" class="btn btn-primary">Create Post</button>
                </div>
              </div>
            </form>
      </div>
    </div>
</div>

    
@endsection
