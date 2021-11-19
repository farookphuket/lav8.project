@extends('sidebar.sidebar')



@section('tag_in_head')


@endsection


@section('content')
    <div id="app"></div>
    @foreach($template as $li)
        @section('meta_title',"View  ".$li->title)
        <div class="container">
            <h2 class="text-center">
                {{$li->title}}
            </h2>
            <div class="clearfix">
                <div class="float-right">
                    <p>by 
                    {{$li->user->name}} 
                    on {{$li->created_at->diffForHumans()}}
                    </p>
                </div>
            </div>
            <div>
                {!!$li->excerpt!!}
            </div>

            <div>
                {!!$li->body!!}
            </div>
        </div>

    @endforeach    

@endsection
