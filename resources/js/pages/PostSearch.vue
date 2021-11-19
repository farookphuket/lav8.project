<template>
    <div class="container">
        <div class="section-title">
        <h2>Blog</h2>
        </div>
        <div>
            <form action="">
                <div class="form-group">
                    <b-input-group>
                    <b-input-group-prepend is-text>
                        <b-icon icon="search"></b-icon>
                    </b-input-group-prepend>
                    <input v-model="search" class="form-control" 
                    v-on:keyup="searchPost" 
                    type="text" ref="search" placeholder="Search post">
                    </b-input-group>
                </div>
            </form>
        </div><!-- end of div search form -->
        <div v-show="finded">
            <div class="section-title">
                <h2>{{resultLength}} item(s)</h2>
            </div>
            <ul class="list-group">
                <li class="list-group-item" v-for="li in posts.data">
                    <div class="container">
                        <h3>
                            <a href="" @click.prevent="$emit('openPost',li.slug)" >
                            {{li.post_title}} 
                            </a> 
                        </h3>
                        <div>

                            <span>
                                <b-icon icon="calendar2-date"></b-icon>
                                {{moment(li.created_at)}}
                            </span> &middot;
                            <span>
                                <b-icon icon="clock-history"></b-icon>
                                {{moment(li.created_at).fromNow()}}
                            </span> &middot;
                            <span>
                                <b-icon icon="eye"></b-icon>
                                {{li.read_count}}
                            </span>
                        </div> <!-- end of sub div -->
                    </div><!-- end of div.container -->
                </li>
            </ul>
        </div><!-- end of div search result -->
    </div>
</template>

<script>
var moment = require('moment')
export default{
    name:"PostSearch",
    data(){
        return{
            posts:[],
            search:'',
            finded:false,
            resultLength:0,
            moment:moment,
        }
    },
    methods:{
        searchPost(page){
            let url = ''
            if(!this.search){
                this.finded = false
                return
            }else{
                url = `/api/searchPost?search=${this.search}`
                axios.get(url)
                    .then(res=>{
                        this.posts = res.data.posts
                        if(this.posts.data.length >= 1){
                            this.finded = true
                        }
                        this.resultLength = this.posts.data.length
                    })
            }

        },
    },
}
</script>
