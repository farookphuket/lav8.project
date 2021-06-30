@extends("template")

@section("meta_title","Thank you for join us")

@section("content")
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
                        <p class="login-card-description">
                        {!!$msg!!} 
                        </p>

                        <nav class="login-card-footer-nav">
                            <a href="#!">Terms of use.</a>
                            <a href="#!">Privacy policy</a>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
@endsection
