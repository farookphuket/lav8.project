@extends('cleanblog.cleanblog')


@section('tag_in_head')

<script>
    $(function(){

            let bpost = new Jodit('.whatnews_body',{
                    'height' : 550
                });
        });
</script>

@endsection




@section('content')
    
<div class="col-lg-12">
    <h1 class="text-center mb-4">
        Howdy {{Auth::user()->name}},what in your mind?
    </h1>
    <form class="pt-4 form" action="{{route('member.whatnews.update',$wn)}}" method="post">
        @csrf
        @method('PUT')

        <div class="form-group">
            <label for="">
                title
            </label>            
            <input id="" class="form-control @error('whatnews_title')->first() bg-danger @enderror" type="text" name="whatnews_title" value="{{$wn->whatnews_title}}">
            @error('whatnews_title')
                <p class="pt-4 mb-4 alert alert-danger">
                {{$errors->first('whatnews_title')}}
                </p>
            @enderror
        </div>

        <div class="form-group">
            <label for="">
                post body
            </label>            
            <div class="div-body">
            <textarea id="" class="form-control whatnews_body @error('whatnews_body')->first() bg-danger @enderror " name="whatnews_body" rows="12">{!!$wn->whatnews_body!!}</textarea>
            </div>

            @error('whatnews_body')
                <p class="pt-4 mb-4 alert alert-danger">
                {{$errors->first('whatnews_body')}}
                </p>
            @enderror
        </div>

        <div class="form-group checkbox-inline">
           <label class="alert alert-warning" for="">
            <input id="" class="form-control" 
            type="checkbox" name="is_public" 
            @if($wn->is_public == 1)
                checked 
            @endif
            >
            public your post? leave un-check will not public
           </label>
        </div>


        <div class="btn-group float-right">
            <button class="btn btn-primary" type='submit'>
                Update
            </button>
        </div>
    </form>

</div>
@endsection
