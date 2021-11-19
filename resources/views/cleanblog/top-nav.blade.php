
<nav class="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
  <div class="container">
    <a class="navbar-brand" 
       href="
       @auth
{{route('member.home.index')}}
      @else

{{Request::getRequestUri('/')}}
      @endif
       ">Richest</a>
    <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
      Menu 
      <i class="fa fa-bars"></i>
    </button>
    <div class="collapse navbar-collapse" id="navbarResponsive">
      <ul class="navbar-nav ml-auto">

        @guest

        <li class="nav-item  {{Request::is('/')?'bg-success':''}}">
          <a class="nav-link
            
            " href="{{url('/')}}">Home</a>
        </li>

        <li class="nav-item
          {{Request::segment(1)== 'posts'?'bg-success':''}}
          ">
          <a class="nav-link 
            " href="{{url('/posts')}}">Post</a>
        </li>



        <li class="nav-item
          {{Request::segment(1)== 'song'?'bg-success':''}}
          ">
          <a class="nav-link 
            " href="{{url('/song')}}">Song</a>
        </li>

        <li class="nav-item
          {{Request::segment(1)== 'photo'?'bg-success':''}}
          ">
          <a class="nav-link 
            " href="{{url('/photo')}}">Photo</a>
        </li>

        <li class="nav-item
          {{Request::segment(1)== 'video'?'bg-success':''}}
          ">
          <a class="nav-link 
            " href="{{url('/video')}}">Video</a>
        </li>


        <li class="nav-item {{Request::is('about')?'bg-success':''}} ">
          <a class="nav-link 

            " href="{{url('/about')}}">about</a>
        </li>

        @else

        <li class="nav-item {{Request::segment(2) == "home" ?'bg-success':''}} ">
          <a class="nav-link" href="{{route('member.home.index')}}">Home</a>
        </li>

        <li class="nav-item  {{Request::segment(2) == 'posts'?'bg-success':''}}  ">
          <a class="nav-link" href="{{route('member.posts.index')}}">Posts</a>

        </li>

        <li class="nav-item  {{Request::segment(2) == 'song'?'bg-success':''}}  ">
          <a class="nav-link" href="{{route('member.song.index')}}">Song</a>
        </li>

        <li class="nav-item  {{Request::segment(2) == 'photo'?'bg-success':''}}  ">
          <a class="nav-link" href="{{route('member.photo.index')}}">Photo</a>
        </li>

        <li class="nav-item  {{Request::segment(2) == 'video'?'bg-success':''}}  ">
          <a class="nav-link" href="{{route('member.video.index')}}">Video</a>
        </li>

        <li class="nav-item  {{Request::segment(2)== "profile"?'bg-success':''}}">
          <a class="nav-link
            
            " href="{{route('member.profile',Auth::user()->id)}}">profile</a>
        </li>

        <li class="nav-item {{Request::is('member/about')?'bg-success':''}}">
          <a class="nav-link
            
            " href="{{route('member.posts.about')}}">About</a>
        </li>
        @endguest
      </ul>
      <ul class="navbar-nav ">
            
      @guest
        <li class="nav-item">
          <login-form></login-form>
        </li>
        @else
        <li class="nav-item">
            <form class="form-inline" 
                method="post" action="{{route("logout")}}">
                @csrf
                <button class="btn btn-sm btn-outline-warning" type="submit">
                    Logout
                </button>
            </form>
        </li>
      @endguest
      </ul>
    </div>
  </div>
</nav>
