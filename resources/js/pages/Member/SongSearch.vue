<template>
    <div>
        <div class="row">

            <div class="col-lg-12">
                <form action="">
                    <div class="form-group">
                        <input v-model="searchSong" class="form-control" 
                        type="text" ref="searchSong" 
                        placeholder="Search Song..."
                        v-on:keyup="search">
                    </div>
                </form>
            </div>
            <div class="col-lg-12 pt-2 mb-4" v-show="searchSong.length != 0">
                <div class="row">
                    <div class="col-lg-3" v-for="so in songs">
                        <div class="card">
                            <a href="" @click.prevent="$emit('songOpen',so.id)">
                                <img class="responsive card-img-top" 
                                :src="so.cover" :alt="so.name">
                            </a>
                            <div class="card-body">
                                <span class="badge badge-info">
                                    <a href="" :title="so.name" 
                                        style="font-weight:bold;color:white;">
                                        {{smartTitle(so.name)}}
                                    </a>&nbsp;
                                     - {{so.artist.name}}
                                </span>
                                    <p class="pt-2">
                                        post by 
                                        <span class="badge badge-info">
                                             {{so.user.name}} 
                                        </span>
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
             //               console.log(res.data)
                            this.songs = res.data.songs

                                })

                    }
            },
            smartTitle(str,len=9){
                return (str.length > len)? str.substr(0,len)+"...":str
            }
        },
}
</script>
