
<article class="post-preview">
  <a href="@auth {{URL::current()}}  @else{{route("login")}}@endauth">
    <h2 class="post-title">No DATA</h2>

    <h3 class="post-subtitle">Sorry there is no data</h3>

  </a>
  <div class="alert alert-warning">
    <img class="responsive" src="{{asset('img/nodata-found.jpg')}}" alt="">
    <p>
     Sorry! No data found here. 
    </p>
  </div>
</article>

<hr>
<p class="pt-4 mb-4">&nbsp;</p>
