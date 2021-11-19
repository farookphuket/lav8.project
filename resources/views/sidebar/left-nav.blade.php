        <nav id="sidebar">
            <div class="sidebar-header">
                <h3>thousand millions</h3>
            </div>

            <ul class="list-unstyled components">
                <p>Admin {{Auth::user()->name}}</p>
                <li class="@if(Request::segment(2) == "home") active @endif ">
                    <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Home</a>
                    <ul class="collapse list-unstyled" id="homeSubmenu">
                        <li class="@if(Request::segment(2) == "user") active @endif">
                            <a href="{{route('admin.user.index')}}">Manage User</a>
                        </li>
                        <li class="@if(Request::segment(2) == "comments") active @endif">
                            <a href="{{route('admin.comments.index')}}">Comments</a>
                        </li>
                        <li class="@if(Request::segment(2) == "visitors") active @endif">
                            <a href="{{route('admin.visitors.index')}}">visitors</a>
                        </li>
                    </ul>
                </li>
                <li class="@if(Request::segment(2) == "about") active @endif ">
                    <a  
                        href="{{route('admin.about.index')}}">About</a>
                </li>
                <li class="@if(Request::segment(2) == "pages") active @endif ">
                    <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Pages</a>
                    <ul class="collapse list-unstyled" id="pageSubmenu">
                        <li 
                     class="@if(Request::segment(2) == "song") active @endif "       
                            >
                            <a href="{{route('admin.song.index')}}">Song</a>
                        </li>

                        <li 
                     class="@if(Request::segment(2) == "video") active @endif "       
                            >
                            <a href="{{route('admin.video.index')}}">Video</a>
                        </li>
                        <li 
                        class="@if(Request::segment(2) == "photo") active @endif "
                            >
                            <a href="{{route('admin.photo.index')}}">Photo</a>
                        </li>
                    </ul>
                </li>
                <li class="@if(Request::segment(2) == "profile") active @endif" >
                    <a href="#">Portfolio</a>
                </li>
            </ul>

            <ul class="list-unstyled CTAs">
                <li>
                    <a 
                        href="https://bootstrapious.com/tutorial/files/sidebar.zip" 
                        class="btn btn-outline-primary btn-block">Download source</a>
                </li>
                <li>
                    <a 
                        href="https://bootstrapious.com/p/bootstrap-sidebar" 
                        class="article" target="_blank">original article</a>
                </li>

                <li>
                    <form class="form" action="{{route('logout')}}" method="post">
                        @csrf
                        <button class="btn btn-outline-danger btn-block" 
type="submit">Logout</button>
                    </form>
                </li>
            </ul>
        </nav>
