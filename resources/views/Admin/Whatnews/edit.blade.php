@extends('sidebar.sidebar')

@section('meta_title',Request::getHttpHost()." admin section ".Auth::user()->name)

@section('tag_in_head')

<script>
    $(function(){
            let my_name = "{!!Auth::user()->name!!}";
            $('.summernote').summernote({
                    "height":250,
                    "placeholder" : `Howdy ${my_name}, What in your mind`
                });
        });
</script>

@endsection


@section('content')

















  <!-- FORM WHATNEW -->
            <div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="card">
                        <div class="header">
                            <h2>Editing...{{$whatnews->whatnews_title}}</h2>

                        </div>
                        <div class="body">
                        <form class="pt-4 form" action="{{route('member.whatnews.update',$whatnews)}}" method="post">
                            @csrf
                            @method('PUT')
                            <div class="row clearfix">
                                <div class="col-sm-12">
                                    <div class="form-group">
                                        <div class="form-line">
                                            <input type="text" class="form-control
@error('whatnews_title')->first() bg-danger @enderror
" placeholder="Enter your post title"  name="whatnews_title"  value="{{$whatnews->whatnews_title}}" />


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
                                            <textarea rows="4" class="form-control summernote no-resize" placeholder="Please type what you want..." name="whatnews_body">{!!$whatnews->whatnews_body!!}</textarea>

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
                                    <div class="demo-checkbox">
                                        <input type="checkbox" 
                                            id="basic_checkbox_2" 
                                            class="filled-in is_public" name="is_public" checked />
                                        <label for="basic_checkbox_2">
                                            Public Post? leave un-check your post will be private
                                        </label>
                                    </div>
                                </div>
                            </div>


                            <div class="row clearfix">
                                <div class="col-sm-12">
                                    <button class="btn btn-block btn-primary waves-effect" type="submit">Post</button>
                                </div>
                            </div>


                            </form>

                        </div>

                    </div>
                </div>
            </div>
            <!-- #END# FORM WHATNEW -->

























@endsection
