<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>
        @hasSection('meta_title')
          @yield('meta_title')
        @else
          Welcome friends
        @endif
    </title>


    @yield('tag_in_head')
    <!-- Styles -->
    @include('INC._script_head')

</head>
<body>
<div id="app">
    <main class="d-flex align-items-center min-vh-100 py-3 py-md-0">
        @yield('content')
    </main>
</div>

@include('INC._script_tail')

  <script src="{{asset('js/app.js')}}"></script>
</body>
</html>

