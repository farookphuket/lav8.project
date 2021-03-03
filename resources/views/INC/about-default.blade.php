<?php use Carbon\Carbon; ?>
@extends('cleanblog.cleanblog')

@section("meta_title","Dear friends ,I am super rich man in the world")
@section('content')
        <article class="post-preview">
          <a href="#" title="The link doesn't go any where">
            <h2 class="post-title">About Page</h2>
            
            <h3 class="post-subtitle">this app is for study purpose</h3>
            
          </a>

<?php 
    $create_date = strtotime("2020-01-01 04:00:13");
?>
          <p class="post-meta">Posted by
            
            Farook
            
            on
            {{Carbon::createFromTimestamp($create_date)->format("Y-m-d")}}
             &middot; <span class="reading-time" title="Estimated read time">
                {{Carbon::createFromTimestamp($create_date)->diffForHumans()}}
            </span>
            
          </p>
          <p class="pt-4">
            <strong>I am Start </strong> learn "Laravel" on the year the 10 Jan 2020
            while I'm just start to see "how great of Laravel 7" see the video from youtube
            there are a ton of them(but mostly of them are made by India people)
            there are so many of a good video on youtube it is a little bit hard for me
            to understand India's accent but many many of the video made by India are great
          </p>
          <p class="pt-2">
            to generally speaking I do know "What on earth is Laravel" since the 
            "5.x version" but I am not really pay attention on it much it is because
           the server or the share hosting that I rent in Thailand is very 
           cheap(10 us per month)
           and it mostly NOT support laravel(They do support but your have to use an old version like 
          2.x) so to be on the safe side I will stick with "Codeigniter" up until now
           
          </p>
          <p class="pt-2">
            by the time that I start to learn "how to make a website" I bought a lot
            and lot of Thai book which I don't even know why I keep on doing that 
            but I did it again to me I think I am too "stupid" to read Thai book
            by the time when I just start to using internet on year 2007(by seriously study)
            my first computer I ever touch in my life was back in year 1998 
          </p>
          <p class="pt-4">
          for me to learn "laravel" is fun if I can find some interested video
          or blog from the internet I always stop by and pay attention on it 
          so maybe you guy should do it too it's fun to learn new thing 
        
          </p>
          <p class="pt-4">
          <a href="https://www.laracasts.com">www.laracasts.com</a> is great to stop by
          there some good free video about laravel for you to learn or "youtube" 
          there are even more and there're all free if you just some body like me
          I have no job I don't have any money now so just keep on learn thing 
          and hopefully this will give me some opportunities to give me a job.
          </p>

          <p>
            Any way! if you ever see this page please notice that this page can be edit 
            just login as Admin go to "About" menu then you can edit this page 
            as you'd love to put text ,picture or video
          </p>
          <p class="pt-4">
          with respect
          </p>
        </article>

@endsection
