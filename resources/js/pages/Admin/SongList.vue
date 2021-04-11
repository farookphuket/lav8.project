<template>
<div class="container">
    <div class="row">
        <div class="col-lg-12 mb-4">
            <h1 class="text-center">
                My Karaoke' 
            </h1>
        </div>
        <div class="col-lg-4 col-md-2 pt-2" v-for="so in songList.data">
            
            <div class="card">
                <a href="" @click.prevent="$emit('songShow',so.id)">
                    <img class="responsive card-img-top" :src="so.cover" 
                    alt="">
                </a>
                <div class="card-body">
                    <p class="card-text">
                    {{smartTitle(so.name,16)}} - {{so.user.name}}</p>
                    <div class="clearfix">
                        <div class="float-left">
                            <span>
                                <b-icon icon="clock-history"></b-icon>
                                {{moment(so.posted_at).fromNow()}}
                            </span>
                            <span>
                                <b-icon icon="headphones"></b-icon>
                                {{so.read_count}} 
                            </span>
                        </div>
                        <div class="float-right">
                            <button class="btn btn-sm btn-outline-primary" 
                            @click.prevent="$emit('songEdit',so.id)">
                                Edit
                            </button>
                            <button class="btn btn-sm btn-outline-danger" 
                            @click.prevent="$emit('songDel',so.id)">
                            x
                            </button>
                        </div>
                    </div>
                    
                </div><!-- end of div.card-body-->
            </div><!-- end of div.card -->

        </div><!-- end of div.col-lg-3 -->
        <!-- ========= need a space Start ======= -->
        <div class="col-lg-12 pt-2 mb-2 p-2">&nbsp;</div>
        <!-- ========= need a space End ======= -->

        <!-- ======== pagination Start ======= -->
        <div class="col-lg-12">
            <div class="nav-scroller py-1 mb-2">
                <nav class="nav d-flex justify-content-center">
                    <ul class="pagination flex-wrap">
                        <li class="page-item disabled">
                            <div class="page-link">
                                showing from 
                                <span>{{songList.from}}</span> to 
                                <span>{{songList.to}}</span> of 
                                <span>{{songList.total}}</span> 
                            </div>
                        </li>
                        <li class="page-item" v-for="li in songList.links">
                            <a href="" v-if="li.url != null && li.active != true"
                            v-html="li.label" class="page-link p-2" 
                            @click.prevent="$emit('getSongList',li.url)" 
                            >{{li.label}}</a>

                            <span class="page-link active disabled" v-html="li.label" 
                            v-else>{{li.label}}</span>
                        </li>
                        <li class="page-item active">
                            <span class="page-link p-2">
                                <b-icon icon="book-half"></b-icon>
                                {{songList.current_page}}
                            </span>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>




        <!-- ======== pagination End ======= -->


    </div><!-- end of div.row -->
</div><!-- End of main div -->
</template>

<script>
var moment = require('moment')
export default{
    name:"SongList",
    props:["songList"],
    data(){
        return{
            moment:moment
        }
    },
    methods:{
        smartTitle(str,len=9){
            return (str.length > len)?str.substring(0,len)+"...":str
        },
    },
}
</script>
