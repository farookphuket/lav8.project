@extends('sidebar.sidebar')


@section('meta_title',"Template Admin Section ".Auth::user()->name)

@section('tag_in_head')

<script>
    $(function(){
            let my_name = "{!!Auth::user()->name!!}";
            $('.excerpt').summernote({dialogsInBody: true});

            $('.tbody').summernote({dialogsInBody: true});
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
                            <h2>editing {{$template->title}}</h2>

                        </div>
                        <div class="body">
                            <form class="pt-4 form" action="{{route('admin.templates.update',$template->id)}}" method="post">
                            @csrf
                            @method('PUT')
                            <div class="row clearfix">
                                <div class="col-sm-12">
                                    <div class="form-group">
                                        <div class="form-line">
                                            <input type="text" class="form-control" name="title"  value="{{$template->title}}" />


                                            @error('title')
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
                                            <textarea rows="4" class="form-control excerpt"  name="excerpt">{!!$template->excerpt!!}</textarea>

                                            @error('excerpt')
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
                                            <textarea rows="4" class="form-control tbody"  name="body">{!!$template->body!!}</textarea>

                                            @error('body')
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
                                    <button class="btn btn-block btn-primary" type="submit">Update</button>
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
