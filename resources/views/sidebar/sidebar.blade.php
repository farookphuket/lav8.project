<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

  <link rel="icon" href="{{ URL::asset('img/farICON.ico') }}" type="image/x-icon"/>

    <title>

    @hasSection('meta_title')
      @yield('meta_title')
    @else
        The Richest Man in the world
    @endif
    </title>


    <!-- jQuery  - Slim version (=without AJAX) -->
    <script src="{{asset('js/jquery/jquery351.js')}}"></script>
    <!-- Bootstrap CSS CDN -->
       <link rel="stylesheet" href="{{asset('sidebar/bootstrap-4.1.0.min.css')}}"> 
    <!-- Our Custom CSS -->
    <link rel="stylesheet" href="{{asset('sidebar/style5.css')}}">

    <link rel="stylesheet" href="{{asset('css/app.css')}}">

    <link rel="stylesheet" href="{{asset('css/custom_theme.css')}}">

    <link rel="stylesheet" href="{{asset('cleanblog/tailwind.min.css')}}">


    <!-- Font Awesome JS -->
    <script src="{{asset("sidebar/fontawesome5-0-13_solid.js")}}"></script>
    <script src="{{asset("sidebar/fontawesome_5-0-13.js")}}"></script>


    @include('INC/_hljs')
    @include('INC/_prism-cody')
    @include('INC/_jodit3')
    @yield('tag_in_head')
</head>

<body>

    <div class="wrapper">
        <!-- Sidebar Holder -->
        @include("sidebar/left-nav")

        <!--END left Nav -->


        <!-- Page Content Holder -->
        <div id="content">

            <!-- START nav-top -->
           @include('sidebar/top-nav') 
            <!-- END  nav-top -->
            @include('INC/_flash_message')
            @yield('content')
            <div class="line"></div>
        </div>
    </div>

    <!-- Popper.JS -->
    <script src="{{asset("sidebar/popper.min.js")}}"></script>
    <!-- Bootstrap JS -->
    <script src="{{asset('sidebar/bootstrap-4.1.0.min.js')}}"></script>
    <!--
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.0/js/bootstrap.min.js.map"></script>
    -->
    <script type="text/javascript">
        $(document).ready(function () {
            $('#sidebarCollapse').on('click', function () {
                $('#sidebar').toggleClass('active');
                $(this).toggleClass('active');
            });
        });

    </script>
    <script src="{{asset('js/app.js')}}" ></script>


</body>

</html>
