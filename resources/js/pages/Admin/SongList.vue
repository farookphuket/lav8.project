<template>
<div class="container">
    <div class="row">
        <div class="col-lg-12 mb-4">
            <h1 class="text-center">
                My Karaoke' 
            </h1>
        </div>
        <div class="col-lg-3" v-for="so in songList.data">
            
            <div class="card">
                <a href="" @click.prevent="$emit('songShow',so.id)">
                    <img class="responsive card-image-top" :src="so.cover" 
                    alt="">
                </a>
                <div class="card-body">
                    <p class="card-text">{{so.name}} - {{so.user.name}}</p>
                    <div class="clearfix">
                        <div class="float-left">
                            <span class="badge badge-info">
                                {{moment(so.posted_at).fromNow()}}
                            </span>
                            <b-icon icon="headphones"></b-icon>
                            {{so.read_count}} 
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
        <div class="col-lg-12">
            <div class="pa">
                <ul class="pagination">
                    <li class="page-item">
                        showing from 
                        <span>{{songList.from}}</span> to 
                        <span>{{songList.to}}</span> of 
                        <span>{{songList.total}}</span> &middot; 
                    </li>
                    <li class="page-item" v-for="li in songList.links">
                        <a href="" v-if="li.url != null && li.active != true"
                        v-html="li.label" 
                        @click.prevent="$emit('getSongList',li.url)">{{li.label}}</a>
                        <span class="active" v-html="li.label" 
                        v-else>{{li.label}}</span>
                    </li>
                    <li class="page-item">
                        <span>{{songList.current_page}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div><!-- end of div.row -->


</div>
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
    }
}
</script>
