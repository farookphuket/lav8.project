<template>
    <div>
        <div class="row">

            <div class="col-lg-12">
                <form action="">
                    <div class="form-group">
                        <input v-model="searchSong" class="form-control" 
                        type="text" ref="searchSong" placeholder="Enter song title"
                        v-on:keyup="search">
                    </div>
                </form>
            </div>
            <div class="col-lg-12 pt-2 mb-4" v-show="searchSong.length != 0">
                <div class="row">
                    <div class="col-lg-3" v-for="so in songs">
                        <div class="card">
                            <img class="responsive card-img-top" 
                            :src="so.cover" :alt="so.name">
                            <div class="card-body">
                                <p class="card-text">
                                    {{so.name}} - {{so.artist.name}} 
                                    post by {{so.user.name}} 
                                </p>
                                <span class="badge badge-info">
                                    {{moment(so.posted_at).fromNow()}}
                                </span>
                                <span class="badge badge-info">
                                    <b-icon icon="headphones"></b-icon>
                                    {{so.read_count}}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div><!-- end of div.col-lg-12 -->

        </div>
    </div>
</template>


<script>
var moment = require('moment')
export default{
    name:"SongSearch",
             data(){
                 return{
                     searchSong:"",
                     songs:[],
                     moment:moment,
                 }
             },
methods:{
            search(){
                let fsong = this.$refs.searchSong.value
                    if(fsong.length > 1){
                        let url = `/member/search?search=${fsong}`
                        axios.get(url)
                        .then(res=>{
                            console.log(res.data)
                            this.songs = res.data.songs

                                })

                    }
            }
        },
}
</script>
