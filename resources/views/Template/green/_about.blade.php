@extends('Template.green.index')    


@section('content')
<section id="about" class="about">
      <div class="container">

        <div class="section-title">
          <h2>@yield('page-heading')</h2>
          <p>&nbsp;</p>
        </div>

        <div class="row">
          <div class="col-lg-6 order-1 order-lg-2">
            <!--<img src="{{asset('/green/img/about.jpg')}}" class="img-fluid" alt=""> -->
            @yield('page-image')
          </div>
          <div class="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content">
            <h3>@yield('page-sub-heading') .</h3>
               @yield('page-body') 
          </div>


        </div>
      </div>
    </section>
@endsection
