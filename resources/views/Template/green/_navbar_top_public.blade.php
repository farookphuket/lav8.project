<!-- ========== Public navbar top start ===== -->

      <nav class="nav-menu d-none d-lg-block">
        <ul>
          <li class="@if(!Request::segment('1')) active @else '' @endif"><a href="@auth 
            {{route('member.home.index')}}
            @else 
                /
            @endif">Home</a></li>
            @guest
          <li class="drop-down"><a href=""> 
            <b-icon icon="folder"></b-icon>  
            Pages</a>
            <ul>
              <li><a href="{{url('/posts')}}"> 
                <b-icon aria-hidden="true" icon="book"></b-icon> 
                Post</a></li>
              <li class="drop-down">
                <a href="#">
                    <b-icon aria-hidden="true" icon="film"></b-icon> 
                    Multi media</a>
                <ul>
                  <li><a href="{{url('/video')}}">  
                    <b-icon icon="camera-video"></b-icon> 
                    Video </a></li>
                  <li><a href="{{url('/photo')}}">
                    <b-icon icon="camera"></b-icon> 
                    photo</a></li>
                  <li><a href="{{url('/song')}}">
                    <b-icon icon="music-note"></b-icon> 
                    song</a></li>
                </ul>
              </li>
            </ul>
          </li>
          <li><a href="{{url('/about')}}">about</a></li>
            @endguest
        </ul>
      </nav>

<!-- ========== Public navbar top End ===== -->



<!-- ========== Original nav start ======= -->
    <!-- just keep this for the references --> 
    <!-- 
      <nav class="nav-menu d-none d-lg-block">
        <ul>
          <li class="active"><a href="/">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#portfolio">Portfolio</a></li>
          <li><a href="#team">Team</a></li>
          <li class="drop-down"><a href="">Drop Down</a>
            <ul>
              <li><a href="#">Drop Down 1</a></li>
              <li class="drop-down"><a href="#">Deep Drop Down</a>
                <ul>
                  <li><a href="#">Deep Drop Down 1</a></li>
                  <li><a href="#">Deep Drop Down 2</a></li>
                  <li><a href="#">Deep Drop Down 3</a></li>
                  <li><a href="#">Deep Drop Down 4</a></li>
                  <li><a href="#">Deep Drop Down 5</a></li>
                </ul>
              </li>
              <li><a href="#">Drop Down 2</a></li>
              <li><a href="#">Drop Down 3</a></li>
              <li><a href="#">Drop Down 4</a></li>
            </ul>
          </li>
          <li><a href="#contact">Contact</a></li>

        </ul>
      </nav>
        -->
<!-- ========== Original nav End ======= -->
