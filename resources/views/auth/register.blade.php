@extends('template')

@section('content')
    <div class="container">
        <div class="card login-card">
            <div class="row no-gutters">
                <div class="col-md-5">
                    <img src="{{asset('img/login-logo.jpg')}}" alt="login" class="login-card-img">
                </div>
                <div class="col-md-7">
                    <register-form></register-form>
                </div>
            </div>
        </div>
    </div>
@endsection
