@extends('template')

@section('meta_title','forgot your password? reset it now')

@section('content')
    <div class="container">
        <div class="card login-card">
            <div class="row no-gutters">
                <div class="col-md-5">
                    <img src="{{asset('img/login-logo.jpg')}}" alt="login" class="login-card-img">
                </div>
                <div class="col-md-7">
                    @if($errors->any())
                        @foreach ($errors->all() as $error)
                            <div class="alert alert-danger">{{ $error }}</div>
                        @endforeach
                    @endif
                    @error('email')
                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                    @enderror
                    <div class="card-body">
                        <div class="brand-wrapper">

                              <img src="{{asset('img/login-logo.jpg')}}" alt="logo" class="logo">
                        </div>
                        <p class="login-card-description">Please enter your email</p>



                        <div id="app">
                            <email-req></email-req>
                        </div>

                        <p class="login-card-footer-text">Don't have an account? <a href="{{ route('register.index') }}" class="text-reset">Register here</a></p>
                        <nav class="login-card-footer-nav">
                            <a href="#!">Terms of use.</a>
                            <a href="#!">Privacy policy</a>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
@endsection

