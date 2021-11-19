<?php use Carbon\Carbon; ?>
@extends('Template.green._about')



<?php 
    $create_date = strtotime("2007-07-29 05:50:13");
    $update_date = strtotime("2021-05-09 04:45:13");
?>
@section("meta_title","Dear friends ,Thanks for visiting")
    @section('page-heading') 
        farook said :
    @endsection


    
    @section('page-sub-heading')
        Thank you for visiting
    @endsection

    @section('page-body')
            <p class="font-italic">
                <span class="badge badge-info">
                    <b-icon icon="person"></b-icon> 
                    farook
                </span>
                
               <span class="badge badge-primary">
                    <b-icon icon="clock"></b-icon> 
                    {{Carbon::createFromTimestamp($create_date)->format("Y-m-d")}}
                    &middot; 
                    {{Carbon::createFromTimestamp($create_date)->diffForHumans()}}
                </span>
               <span class="badge badge-warning">
                    <b-icon icon="calendar2-day"></b-icon> &nbsp; 
                    {{Carbon::createFromTimestamp($update_date)->format("Y-m-d")}}
                    &middot; 
                    {{Carbon::createFromTimestamp($update_date)->diffForHumans()}}
                </span>
            </p>
            <p>
                <strong>I am Start </strong> learn "Laravel" on the 10 Jan 2020
                while I'm just start to see "how great of Laravel 7" see the 
                video from youtube there are a ton of them(but mostly of them 
                are made by India people) there are so many of a good video on 
                youtube it is a little bit hard for me to understand India's 
                accent but many many of the video made by India are great.
            </p>
            <p>
            to generally speaking I do know "What on earth is Laravel" since 
            the "5.x version" but I am not really pay attention on it much it 
            is because the server or the share hosting that I rent in Thailand 
            is very cheap(10 us per month) and it mostly NOT support laravel 
            (They do support but you have to use an old version like 2.x) so 
            to be on the safe side I will stick with "Codeigniter" up until 
            now
            </p>
            <p >
                by the time that I start to learn "how to make a website" I 
                bought a lot and lot of Thai book which I don't even know why 
                I keep on doing that but I did it again to me I think I am too 
                "stupid" to read Thai book by the time when I just start to 
                using internet on year 2007(by seriously study) my first 
                computer I ever touch in my life was back in year 1998.
            </p>
            <p>
              for me to learn "laravel" is fun if I can find some interested 
                video or blog from the internet I always stop by and pay 
                attention on it so maybe you guy should do it too it's fun to 
                learn new thing.
            </p>
            <p>
              <a href="https://www.laracasts.com" class="btn 
                btn-outline-primary btn-sm" target="_blank"> 
                www.laracasts.com</a> is great to 
                stop by there some good free video about laravel for you to 
                learn or "youtube" there are even more and there're all free 
                if you just some body like me I have no job I don't have any 
                money now so just keep on learn thing and hopefully this will 
                give me some opportunities to give me a job.
            </p>
            
              <p>
                Any way! if you ever see this page please notice that this page 
                can be edit just login as Admin go to "About" menu then you can 
                edit this page as you'd love to put text , picture or video
              </p>
            
              <p class="pt-2 mb-4">
                with respect
              </p>
            <h4 class="pt-2 mb-2">
                What can I do with this web app? :
            </h4>
            <ul>
                <li>
                    <i class="icofont-check-circled"></i> 
                    post what's going on with myself on this website or about 
                    the script that maybe has change in during the periods of 
                    time

    
                </li>
                <li>
                    <i class="icofont-check-circled"></i> 
                    Add my Karaoke ,Photo, Video for later embed or share to 
                    the other people without me having to find from the 
                    different website because they're all in one place.
                </li>
                <!--
              <li><i class="icofont-check-circled"></i> .</li>
                -->
            </ul>
    @endsection


    @section('page-image')
            <a title="click to go to donate page" href="{{url('/donate-me')}}" 
            target="_blank">
            <img src="https://lh3.googleusercontent.com/cfOid3sYJtcVhxh6pXTQ9l2LfCTIDnPXGIY2TidhJRi2bkwzmtlZItSFINgzyFyG2FDXgfFS7bX1AQuzK03HOwJ-67Blc9oHtPD6QdrNpP_avEAYUhYyX6DLwuXKe5P_te8rbr0Ny4w=w1920-h1080" 
            class="img-fluid responsive" alt="click to go donate page">
            </a>
            <p class="pt-2 text-center">
                if you want to support me click on my photo
            </p>
    @endsection
            <div class="row">
                <div class="col-md-3">
                    <img 
                    src="https://lh3.googleusercontent.com/wYjHy9U9zBqZrn-D5Icfgc5TMy7nW8eWv3LNm4yxAWoz7xKWlUj59oX9ZXMvkFOYYVSJsvXDBHxgcdxl4LyZewjFAIwJlXSwoFV-oAGauW_H0e_e_VJshidQYHtyInXGBDPIIEaztjU=w1920-h1080" class>
                </div>
                <div class="col-md-3">
                    <img class="responsive" src="https://lh3.googleusercontent.com/bh2XfTn5xOoQxELzEY3_2X7qopv3k5nZiBFNvHtc6Cf46QMZc2J3utdHIQPCJ0hGcrywr1c9Pm5tLs7xhZSz2at7tvozyXkTPZ0defBo8X0NGgwbVSG6LIMMFLGNCTEe9-ZOzGj8yik=w1920-h1080">

                </div>
                <div class="col-md-3">

                    <img src="https://lh3.googleusercontent.com/cfOid3sYJtcVhxh6pXTQ9l2LfCTIDnPXGIY2TidhJRi2bkwzmtlZItSFINgzyFyG2FDXgfFS7bX1AQuzK03HOwJ-67Blc9oHtPD6QdrNpP_avEAYUhYyX6DLwuXKe5P_te8rbr0Ny4w=w1920-h1080" 
                    class="img-fluid responsive" alt="click to go donate page">
                    </a>
                    <p class="pt-2 text-center">
                        if you want to support me click on my photo
                    </p>
                </div>


            </div>

