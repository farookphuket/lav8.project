@extends('sidebar.sidebar')


@section('meta_title',"Post Admin Section ".Auth::user()->name)

@section('tag_in_head')

<script>
    $(function(){
            let my_name = "{!!Auth::user()->name!!}";
            $('.post_excerpt').summernote({
                    "height":250,
                    "placeholder" : `Your post excerpt here` 
                });

            $('.post_body').summernote({
                    "height":550,
                    "placeholder" : `Your post detail here` 
                });
        });
</script>

@endsection


@section('content')
    <div class="container">    

<!-- xxx -->

  <!-- FORM WHATNEW -->
            <div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="card">
                        <div class="header">
                            <h2>New Post?</h2>

                        </div>
                        <div class="body">
                        <form class="pt-4 form" action="{{route('admin.post.store')}}" method="post">
                            @csrf
                            <div class="row clearfix">
                                <div class="col-sm-12">
                                    <div class="form-group">
                                        <div class="form-line">
                                            <input type="text" class="form-control" name="post_title"  value="{{old('post_title')}}" />


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
                                            <textarea rows="4" class="form-control post_excerpt"  name="post_excerpt">{{old('post_excerpt')}}</textarea>

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
                                            <textarea rows="4" class="form-control post_body"  name="post_body">{{old('post_body')}}</textarea>

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
                                        @if(!$tags->isEmpty())
                                            Tags :
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


</div>
@endsection
