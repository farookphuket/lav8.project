<!DOCTYPE html>

<html>

<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link rel="icon" href="{{ URL::asset('img/favicon.ico') }}" type="image/x-icon"/>
  <title>
    @hasSection('meta_title')
      @yield('meta_title')
    @else
      Welcome to the thousand million project
    @endif
  </title>

  <meta name="description" content="The thousand Million project">

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

 <!-- 
  <script src="https://unpkg.com/@popperjs/core@2"></script>
  -->
  <script src="{{asset("cleanblog/popper2.6.0.min.js")}}"></script>


  <link rel="stylesheet" href="{{asset('css/custom_theme.css')}}">
  
  <link rel="stylesheet" href="{{asset('cleanblog/assets/vendor/bootstrap/css/bootstrap.min.css')}}">

  <link rel="stylesheet" href="{{asset('cleanblog/assets/vendor/fontawesome-free/css/all.min.css')}}">

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

  <!-- Navigation -->
  @include('cleanblog/top-nav')

  <!-- Page Header -->

<header class="masthead" style="background-image: url('{{asset('cleanblog/img/bg-index.jpg')}}')">
  
    <div class="overlay"></div>
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-md-10 mx-auto">
          <div class="page-heading">
            <h1>Thousand Millions</h1>
            
            <span class="subheading">The richest man will be here</span>
            <p class="pt-4 mb-4">&nbsp;</p>
            @auth
              <form class="form" action="{{route('logout')}}" method='post'>
                @csrf
                <button class="btn btn-warning" type='submit'>Logout</button>
              </form>
              @endif
            
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

        

        <!-- Pager -->

        <div id="app">
          <Visitors></Visitors>
        </div>

      </div>

    </div>
  </div>


  <!-- Footer -->

<hr>
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
    </div>
  </div>
</footer>


<script src="{{asset('cleanblog/assets/vendor/bootstrap/js/bootstrap.bundle.min.js')}}"></script>
<script src="{{asset('cleanblog/assets/vendor/startbootstrap-clean-blog/js/clean-blog.min.js')}}"></script>

{{-- <script src="{{asset('cleanblog/assets/scripts.js')}}"></script> --}}

  <!-- Global site tag (gtag.js) - Google Analytics -->
{{-- <script async src="https://www.googletagmanager.com/gtag/js?id=UA-XXXXXXXXX-X"></script> --}}
{{-- <script> --}}
{{--   window.dataLayer = window.dataLayer || []; --}}
{{--   function gtag(){dataLayer.push(arguments);} --}}
{{--   gtag('js', new Date()); --}}

{{--   gtag('config', 'UA-XXXXXXXXX-X'); --}}
{{-- </script> --}}


  <script src="{{asset('js/app.js')}}"></script>

  <!-- can remove Start -->
  <!-- can remove END -->
</body>

</html>
