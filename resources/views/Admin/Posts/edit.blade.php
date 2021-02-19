@extends('sidebar.sidebar')


@section('meta_title',"Editing... ".$post->post_title)


@section('content')
    <div class="container">    

<!-- xxx -->

  <!-- FORM WHATNEW -->
            <div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="card">
                        <div class="header">
                            <h2>Editing {{$post->post_title}}</h2>

                        </div>
                        <div class="body">
                            <form class="pt-4 form" action="{{route('admin.post.update',$post->id)}}" method="post">
                            @csrf
                            @method('PUT')
                            <div class="row clearfix">
                                <div class="col-sm-12">
                                    <div class="form-group">
                                        <div class="form-line">
                                            <input type="text" class="form-control" name="post_title"  value="{{$post->post_title}}" />


                                            @error('post_title')
                                                <p class="pt-4 mb-4 alert alert-danger">
                                                {{$message}}
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
                                            <textarea rows="4" class="form-control post_excerpt"  name="post_excerpt">{!!$post->post_excerpt!!}</textarea>

                                            @error('post_excerpt')
                                                <p class="pt-4 mb-4 alert alert-danger">
                                                {{$message}}
                                                </p>
                                            @enderror
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <p style="margin-top:1em;">&nbsp;</p>
                            <div class="row clearfix">
                                <div class="col-sm-12">
                                    <div class="form-group">
                                        <div class="form-line">
                                            <textarea rows="4" class="form-control post_body"  name="post_body">{!!$post->post_body!!}</textarea>

                                            @error('post_body')
                                                <p class="pt-4 mb-4 alert alert-danger">
                                                {{$message}}
                                                </p>
                                            @enderror
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <p style="margin-top:1em;">&nbsp;</p>
                            <div class="row clearfix">

                                    <div class="col-sm-12">
                                        <div class="form-group">
                                            @if($post->tags)
                                                Current Tags  :
                                                @foreach($post->tags as $tag)

                                                    <label class="badge badge-success p-2" for="">
                                                        <input  class="form-control" type="checkbox" name="remove_tags[]" value="{{$tag->id}}"> {{$tag->tag_name}} 


                                                    </label>
                                                @endforeach
                                            <span class="badge badge-warning p-2">
                                                Click the checkbox to remove tag
                                            </span>
                                            @else
                                                <span class="badge badge-danger" for="">
                                                    There is no tag available! 
                                                </span>
                                            @endif
                                        </div>
                                    </div>
                                    <p style="margin-top:1em;">&nbsp;</p>
                                <div class="col-sm-12">
                                    <div class="form-group">
                                        @if(!$tags->isEmpty())
                                            available Tags :
                                            @foreach($tags as $tag)

                                                <label class="badge badge-success p-2" for="">
                                                    <input  class="form-control" type="checkbox" name="tags[]" value="{{$tag->id}}"> {{$tag->tag_name}}
                                                </label>
                                            @endforeach
                                        @else
                                            <span class="badge badge-danger" for="">
                                                There is no tag available! 
                                            </span>
                                        @endif
                                    </div>
                                </div>
                            </div>
                            <p style="margin-top:1em;">&nbsp;</p>
                            <div class="row clearfix" >
                                <div class="col-sm-12">
                                    <div class="form-group">
                                        <div class="form-line">
                                            <input type="text" class="form-control" name="new_tag"  placeholder="Create new tag " value="{{old('new_tag')}}" />


                                            @error('new_tag')
                                                <p class="pt-4 mb-4 alert alert-danger">
                                                {{$message}}
                                                </p>
                                            @enderror
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <p style="margin-top:2em;">&nbsp;</p>
                            <div class="row clearfix">
                                <div class="col-sm-12">
                                    <div class="form-group">
                                        <label class="alert alert-warning" for="basic_checkbox_2">

                                        <input type="checkbox" 
                                            id="basic_checkbox_2" 
                                            class="form-control is_public" name="is_public"
                                                                           @if($post->is_public == 1) checked @endif/>
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


</div>
@endsection
