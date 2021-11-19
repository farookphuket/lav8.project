
<nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">

                    <button type="button" id="sidebarCollapse" class="navbar-btn">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <button class="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i class="fas fa-align-justify"></i>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="nav navbar-nav ml-auto">
                            <li class="nav-item @if(Request::segment(2) == "home") active @endif">
                                <a class="nav-link" href="{{route('admin.home.index')}}">Home</a>
                            </li>
                            <li class="nav-item @if(Request::segment(2) == "post") active @endif">
                                <a class="nav-link" href="{{route('admin.post.index')}}">Post</a>
                            </li>
                            <li class="nav-item @if(Request::segment(2) == "templates") active @endif">
                                <a class="nav-link" href="{{route('admin.templates.index')}}">Template</a>
                            </li>

                            <li class="nav-item @if(Request::segment(2) == "tags") active @endif">
                                <a class="nav-link" href="{{route('admin.tags.index')}}">Tag</a>
                            </li>
                            <li class="nav-item @if(Request::segment(2) == "profile") active @endif">
                                    <a class="nav-link" href="{{route('admin.profile',Auth::user()->id)}}">Profile</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
