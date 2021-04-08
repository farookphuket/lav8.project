<!DOCTYPE html>

<html>

<head>
<!-- === google script start ==== -->
@include('INC._google_script')
<!-- === google script End  ==== -->

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link rel="icon" href="{{ URL::asset('img/farICON.ico') }}" type="image/x-icon"/>
  <title>@hasSection('meta_title')
      @yield('meta_title')
    @else
      Welcome to the thousand million project
    @endif</title>

  <meta name="description" content="@hasSection("meta_des")
    @yield("meta_des")
    @else a thousand million dollars project by farook @endif">
  <meta name="keywords" content="@hasSection("meta_keywords") 
    @yield("meta_keywords")@else thousand million project @endif">

<!--
  <link href='https://fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic' rel='stylesheet' type='text/css'>
  see the change below
-->

  <link href="{{asset("cleanblog/font-google_1.css")}}" rel='stylesheet' type='text/css'>

<!--
  <link href='https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800' rel='stylesheet' type='text/css'>
-->

  <link href="{{asset("cleanblog/font-google_2.css")}}" rel='stylesheet' type='text/css'>

  <script src="{{asset('js/jquery.js')}}"></script>
  <script src="{{asset('js/gscript.js')}}"></script>

 <!--
  <script src="https://unpkg.com/@popperjs/core@2"></script>
  -->
  <script src="{{asset("cleanblog/popper2.6.0.min.js")}}"></script>


  <link rel="stylesheet" href="{{asset('css/custom_theme.css')}}">

  <link rel="stylesheet" href="{{asset('cleanblog/css/bootstrap/bootstrap.css')}}">

  <!--
  <link rel="stylesheet" href="{{asset('cleanblog/assets/vendor/fontawesome-free/css/all.min.css')}}">
  -->
  <!--
  <link rel="stylesheet" href="{{asset('cleanblog/assets/main.css')}}">
  -->
  <link rel="stylesheet" href="{{asset('cleanblog/cleanblog.main.css')}}">

  <!--
<link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">
  -->
<link href="{{asset("cleanblog/tailwind.min.css")}}" rel="stylesheet">


<!--
  <link rel="canonical" href="https://startbootstrap.github.io/startbootstrap-clean-blog-jekyll/">
  <link rel="alternate" type="application/rss+xml" title="Clean Blog" href="/startbootstrap-clean-blog-jekyll/feed.xml">
-->



@include('INC/_jodit3')
@include('INC/_hljs')
@include('INC/_prism-funky')



  @yield('tag_in_head')

</head>


<body>
  <div id="app">
  <!-- Navigation -->
  @include('cleanblog/top-nav')

  <!-- Page Header -->

<header class="masthead" style="background-image: url('{{asset('cleanblog/img/bg-index2.jpg')}}')">

    <div class="overlay"></div>
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-md-10 mx-auto">
          <div class="page-heading">
            <h1>Thousand Millions</h1>

            <span class="subheading">The richest man will be here</span>
          </div>
        </div>
      </div>
    </div>
  </header>


  <div class="container">
    <div class="row">
      <div class="col-lg-12 col-md-10 mx-auto">
        @include('INC/_flash_message')

        <!-- Home Post List -->

        @yield('content')



      </div>

    </div>
  </div>


  <!-- Footer -->
<!--
<hr>
-->
<footer>
  <div class="container">
    <div class="row">
      <div class="col-lg-8 col-md-10 mx-auto">
        <ul class="list-inline text-center">

          <li class="list-inline-item">
            <a href="mailto:admin@farookphuket.com">
              <span class="fa-stack fa-lg">
                <i class="fas fa-circle fa-stack-2x"></i>
                <i class="far fa-envelope fa-stack-1x fa-inverse"></i>
              </span>
            </a>
          </li>


          <li class="list-inline-item">
            <!-- https://twitter.com/farookphuket -->
            <a href="https://twitter.com/farookphuket">
              <span class="fa-stack fa-lg">
                <i class="fas fa-circle fa-stack-2x"></i>
                <i class="fab fa-twitter fa-stack-1x fa-inverse"></i>
              </span>
            </a>
          </li>


          <li class="list-inline-item">
            <a href="https://www.facebook.com/StartBootstrap">
              <span class="fa-stack fa-lg">
                <i class="fas fa-circle fa-stack-2x"></i>
                <i class="fab fa-facebook-f fa-stack-1x fa-inverse"></i>
              </span>
            </a>
          </li>



          <li class="list-inline-item">
            <a href="https://github.com/farookphuket/lav8.project">
              <span class="fa-stack fa-lg">
                <i class="fas fa-circle fa-stack-2x"></i>
                <i class="fab fa-github fa-stack-1x fa-inverse"></i>
              </span>
            </a>
          </li>


        </ul>
      </div>
        
        <Visitors></Visitors>
    </div>
  </div>
</footer>

</div><!-- end of div id=app -->
<script src="{{asset('cleanblog/js/bootstrap/bootstrap.bundle.js')}}"></script>
<script src="{{asset('cleanblog/js/clean-blog.min.js')}}"></script>

<!--
<script src="{{asset('cleanblog/js/scripts.js')}}"></script>
-->

  <script src="{{asset('js/app.js')}}"></script>

  <!-- can remove Start -->
  <!-- can remove END -->
</body>

</html>
