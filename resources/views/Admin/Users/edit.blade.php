
@extends('sidebar.sidebar')


@section('meta_title',Auth::user()->name.'\'s profile edit')

@section('content')

<div class="container">
    <h1 class="pt-4 mb-4 text-center">Edit {{Auth::user()->name}}'s profile</h1>
    <p class="pt-4 mb-4">&nbsp;</p>
    <form class="form" action="{{route('admin.user.update',$users->id)}}" method="post">
        @csrf
        @method('PUT')

        <div class="form-group">
            <label for="">
                Name
            </label>
            <input id="" type="text" name="name" class="form-control name" value="{{$users->name}}">
        </div>
        
        <div class="form-group">
            <label for="">
                Email
            </label>
            <input id="" type="text" name="email" class="form-control email" value="{{$users->email}}">
        </div>


        <div class="form-group">
            <label class="alert alert-warning">
                <input id="" class="form-control is_admin" type="checkbox" name="is_admin" @if($users->is_admin == 1) checked @endif> 
                Is Admin?

            </label>
        </div>






        <div class="btn-group float-right">
            <button class="btn btn-primary" type="post">Update</button>
        </div>

    </form>
    <div class="line"></div>
</div>

@endsection
