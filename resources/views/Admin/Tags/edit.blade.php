@extends('sidebar.sidebar')


@section('meta_title',"Edit Tag Admin Section ".Auth::user()->name)

@section('tag_in_head')


@endsection


@section('content')
    <div class="container">    

<!-- xxx -->

  <!-- FORM WHATNEW -->
            <div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="card">
                        <div class="header">
                            <h2>Editing {{$tag->tag_name}}</h2>

                        </div>
                        <div class="body">
                            <form class="pt-4 form" action="{{route('admin.tags.update',$tag->id)}}" method="post">
                            @csrf
                            @method('PUT')
                            <div class="row clearfix">
                                <div class="col-sm-12">
                                    <div class="form-group">
                                        <div class="form-line">
                                            <input type="text" class="form-control" name="tag_name"  value="{{$tag->tag_name}}" />


                                            @error('tag_name')
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
