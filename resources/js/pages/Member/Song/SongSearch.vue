<template>
    <div>

        <b-tab title="Search ">

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
                            <a href="" @click.prevent="$emit('openSong',so.id)">
                                <img class="responsive card-img-top d-block mx-auto" 
                                style="max-height:220px;max-width:170px;"
                                :src="so.song_cover" :alt="so.song_name">
                            </a>
                            <div class="card-body">
                                    
                                <span class="badge badge-info float-right mb-4">
                                    <b-icon icon="headphones"></b-icon>
                                    {{so.read_count}}
                                </span>
                                <div class="table-responsive ">
                                    <table class="table table-striped table-bordered">
                                        <tr>
                                            <th>Song Title</th>
                                            <td>

                                                <a href="" :title="so.song_name" 
                                                    class="font-weight-bold text-success"
                                                    >
                                                    {{sTitle.smartTitle(so.song_name)}}
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>post by</th>
                                            <td>
                                                {{so.user.name}}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>date</th>
                                            <td>
                                                {{moment(so.posted_at).fromNow()}}
                                            </td>
                                        </tr>
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div><!-- end of div.col-lg-12 -->

        </div>

        </b-tab>
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
                     sTitle:new CustomText(),
                 }
             },
methods:{
            search(){
                let fsong = this.$refs.searchSong.value
                    if(fsong.length > 1){
                        let url = `/searchSong?search=${fsong}`
                        axios.get(url)
                        .then(res=>{
             //               console.log(res.data)
                            this.songs = res.data.song

                                })

                    }
            },

        },
}
</script>
