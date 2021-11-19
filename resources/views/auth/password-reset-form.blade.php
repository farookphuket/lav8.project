@extends('template')

@section('meta_title','reset your password here')

@section('tag_in_head')

    <script>
                var email = "{!!$email!!}";
                var timeout = "{!!$timeout!!}";
                var resettoken = "{!!$resettoken!!}";
    </script>
@endsection

@section('content')
    <div class="container">
        <div class="card login-card">
            <div class="row no-gutters">
                <div class="col-md-5">
                    <img src="{{asset('img/login-logo.jpg')}}" alt="login" class="login-card-img">
                </div>
                <div class="col-md-7">
                    <div class="card-body">
                        <div class="brand-wrapper">

                              <img src="{{asset('img/login-logo.jpg')}}" alt="logo" class="logo">
                        </div>
                        <div id="app">
                            <pass-reset resettoken="{{$resettoken}}"></pass-reset>
                        </div>

                        <p class="login-card-footer-text">Don't have an account? <a href="{{ route('register') }}" class="text-reset">Register here</a></p>
                        <nav class="login-card-footer-nav">
                            <a href="#!">Terms of use.</a>
                            <a href="#!">Privacy policy</a>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
@endsection

