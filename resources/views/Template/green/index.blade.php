<?php 
    use Illuminate\Support\Facades\Config;

    $my_twitter = Config::get('DEFAULT_VAR.my_twitter');
    $my_facebook = Config::get('DEFAULT_VAR.my_facebook');
    $my_instagram = Config::get('DEFAULT_VAR.my_instagram');
    $my_skype = Config::get('DEFAULT_VAR.my_skype');
    $my_linkin = Config::get('DEFAULT_VAR.my_linkin');
    $my_contact_phone = Config::get('DEFAULT_VAR.my_contact_phone');
    $my_contact_email = Config::get('DEFAULT_VAR.my_contact_email');
    $X2 = 'X2';
?>
<!DOCTYPE html>
<html lang="en">

<head>
<!-- === google script start ==== -->
@include('INC._google_script')

<!-- === google script End  ==== -->





  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">
  <title>@hasSection('meta_title') @yield('meta_title') @else Welcome to the thousand million project @endif</title>

  <meta name="description" content="@hasSection("meta_des") @yield("meta_des") @else a thousand million dollars project by farook @endif">
  <meta name="keywords" content="@hasSection("meta_keywords") @yield("meta_keywords") @else thousand million project @endif">



  <!-- Favicons -->
    <!--
  <link href="{{asset('/green/img/favicon.png')}}" rel="icon">
    -->
  <link href="{{asset('/img/farICON.ico')}}" rel="icon">
  <link href="{{asset('/green/img/apple-touch-icon.png')}}" rel="apple-touch-icon">

  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Raleway:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet">

  <!-- Vendor CSS Files -->
  <link href="{{asset("/green/$X2/bootstrap/css/bootstrap.min.css")}}" rel="stylesheet">
  <link href="{{asset("/green/$X2/icofont/icofont.min.css")}}" rel="stylesheet">
  <link href="{{asset("/green/$X2/boxicons/css/boxicons.min.css")}}" rel="stylesheet">
  <link href="{{asset("/green/$X2/animate.css/animate.min.css")}}" rel="stylesheet">
  <link href="{{asset("/green/$X2/owl.carousel/assets/owl.carousel.min.css")}}" rel="stylesheet">
  <link href="{{asset("/green/$X2/venobox/venobox.css")}}" rel="stylesheet">

  <!-- Template Main CSS File -->
  <link href="{{asset('/green/css/style.css')}}" rel="stylesheet">
  <link href="{{asset('css/custom_theme.css')}}" rel="stylesheet">


<link href="{{asset('/green/css/tailwind.min.css')}}" rel="stylesheet">

@include('INC/_hljs')
@include('INC/_prism-funky')
  <!-- =======================================================
  * Template Name: Green - v2.3.1
  * Template URL: https://bootstrapmade.com/green-free-one-page-bootstrap-template/
  * Author: BootstrapMade.com
  * License: https://bootstrapmade.com/license/
  ======================================================== -->
</head>

<body>
<div id="app">
  <!-- ======= Top Bar ======= -->
  <div id="topbar" class="d-none d-lg-flex align-items-center fixed-top">
    <div class="container d-flex">
      <div class="contact-info mr-auto">
        <i class="icofont-envelope"></i> 
        <a href="mailto:{{$my_contact_email}}"> 
        {{$my_contact_email}}
        </a>
        <i class="icofont-phone"></i> 
        {{$my_contact_phone}}
      </div>
      <div class="social-links">
        <a target="_blank" href="{{ $my_twitter }} " class="twitter"><i class="icofont-twitter"></i></a>
        <a target="_blank" href="{{ $my_facebook }} " class="facebook"><i class="icofont-facebook"></i></a>
        <a target="_blank" href="{{ $my_instagram }} " class="instagram"><i class="icofont-instagram"></i></a>
        <a target="_blank" href="{{ $my_skype }} " class="skype"><i class="icofont-skype"></i></a>
        <a target="_blank" href="{{ $my_linkin }} " class="linkedin"><i class="icofont-linkedin"></i></i></a>
        
      </div>
    </div>
  </div>

  <!-- ======= Header ======= -->
  <header id="header" class="fixed-top">
    <div class="container d-flex align-items-center">

      <h1 class="logo mr-auto"><a href=" @auth {{route('member.home.index')}} 
        @else  
            /
        @endif">@auth {{Auth::user()->name}} @else Rich @endif</a></h1>
      <!-- Uncomment below if you prefer to use an image logo -->
      <!-- <a href="index.html" class="logo mr-auto"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>-->

    <!-- .nav-menu -->
        @include('Template.green._navbar_top_public')
    <!--
      <a href="#about" class="get-started-btn scrollto">Get Started</a>
        -->
        @guest
            
          <login-form></login-form>
        @else 
            
            <form method="post" action="{{route('logout')}}">
                @csrf
                <button class="btn btn-outline-danger get-started-btn" 
                type="submit">logout</button>
            </form>
        @endguest
    </div>
  </header>
    <!-- End Header -->

  <!-- ======= Hero Section ======= -->
    @include('Template.green._hero_section') 
    <!-- End Hero -->
  <main id="main">
    
    <!-- ======= Featured Services Section ======= -->


    <!-- End Featured Services Section -->



        <!-- content in the green template -->
    <!-- ======= About Us Section ======= -->
    @yield('content')
    <!-- End About Us Section -->

    <!-- ======= Why Us Section ======= -->
        <!-- just type @  then remove the comment 
            include('Template.green._featured') -->
    <!-- End Why Us Section -->

    <!-- ======= Our Clients Section ======= -->
    <!-- type @ include('Template.green._our_client') -->
    <!-- End Our Clients Section -->

    <!-- ======= Services Section ======= -->
    <!-- @ include('Template.green._services')  -->
    <!-- End Services Section -->

    <!-- ======= Cta Section ======= -->
    <section id="cta" class="cta">
      <div class="container">

        <div class="row">
          <div class="col-lg-9 text-center text-lg-left">
            <h3>Dear friends</h3>

            <p>
                this html template that I using by now(10-Apr-2021) is call 
                "<b>GREEN </b>" I download this theme from 
                <span class="badge badge-info">https://bootstrapmade.com</span> 
                this html template is the free template to use you can support 
                them by visit their website or buy this script to download this 
                theme please click at the download link.
            </p>
          </div>
          <div class="col-lg-3 cta-btn-container text-center">
            <a class="cta-btn align-middle" href="https://bootstrapmade.com/green-free-one-page-bootstrap-template/#download" target="_blank">Download This Theme</a>
          </div>
        </div>

      </div>
    </section>
    
    <!-- End Cta Section -->

    <!-- ======= Portfolio Section ======= -->
        <!-- @ include('Template.green._portfolio') -->
    <!-- End Portfolio Section -->

    <!-- ======= Team Section ======= -->
    <!-- remove team section -->
    <!-- End Team Section -->

    <!-- ======= Contact Section ======= -->
    <!-- @ include('Template.green._contact') -->
    <!-- End Contact Section -->

  </main>
    <!-- End #main -->

  <!-- ======= Footer ======= -->
  <footer id="footer">
    <div class="container">
<Visitors></Visitors>

      <div class="social-links pt-4">
        <a target="_blank" href="{{$my_twitter}}" class="twitter"><i class="bx bxl-twitter"></i></a>
        <a target="_blank" href="{{$my_facebook}}" class="facebook"><i class="bx bxl-facebook"></i></a>
        <a target="_blank" href="{{$my_instagram}}" class="instagram"><i class="bx bxl-instagram"></i></a>
        <a target="_blank" href="{{$my_skype}}" class="google-plus"><i class="bx bxl-skype"></i></a>
        <a target="_blank" href="{{$my_linkin}}" class="linkedin"><i class="bx bxl-linkedin"></i></a>
      </div>
      <div class="copyright">
        &copy; Copyright <strong><span>Green</span></strong>. 
        All Rights Reserved 
        &middot; core v{{ Illuminate\Foundation\Application::VERSION }} 
        (PHP v{{ PHP_VERSION }}) &middot; last update 29 Oct 2021

      </div>
      <div class="credits">
        <!-- All the links in the footer should remain intact. -->
        <!-- You can delete the links only if you purchased the pro version. -->
        <!-- Licensing information: https://bootstrapmade.com/license/ -->
        <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/green-free-one-page-bootstrap-template/ -->
        Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
      </div>
    </div>
  </footer>
    <!-- End Footer -->
    </div><!-- div #app for vue -->
  <a href="#" class="back-to-top"><i class="icofont-simple-up"></i></a>

  <!-- Vendor JS Files -->
  <script src="{{asset("/green/$X2/jquery/jquery.min.js")}}"></script>
  <script src="{{asset("/green/$X2/bootstrap/js/bootstrap.bundle.min.js")}}"></script>
  <script src="{{asset("/green/$X2/jquery.easing/jquery.easing.min.js")}}"></script>
  <script src="{{asset("/green/$X2/php-email-form/validate.js")}}"></script>
  <script src="{{asset("/green/$X2/owl.carousel/owl.carousel.min.js")}}"></script>
  <script src="{{asset("/green/$X2/isotope-layout/isotope.pkgd.min.js")}}"></script>
  <script src="{{asset("/green/$X2/venobox/venobox.min.js")}}"></script>

  <!-- Template Main JS File -->
    <script src="{{asset('/green/js/main.js')}}"></script>
    <script src="{{asset('/js/app.js')}}"></script>

</body>

</html>
