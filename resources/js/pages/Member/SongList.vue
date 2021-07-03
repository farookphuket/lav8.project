<template>
    <div class="row">
       <div class="col-lg-3 mb-2" v-for="so in songs.data">
           <div class="card pt-2">
                <a :href="so.url" @click.prevent="songOpen(so.id)">
                   <img class="responsive card-img-top" :src="so.cover" 
                   :alt="so.name">
                </a>
               <div class="card-body">
                    <span class="badge badge-info">
                        <a href="" :title="so.name" style="font-weight:bold;color:white;">
                            {{smartTitle(so.name,9)}}
                        </a>
                        &middot; {{so.artist.name}}
                    </span>
                         
                       <p class="pt-2"> post by 
                            <span class="bage badge-info">
                                {{so.user.name}}
                            </span>
                       </p>
                    <span class="badge badge-info">
                    {{moment(so.posted_at).fromNow()}}</span>
                    <span class="badge badge-info">
                        <b-icon icon="headphones"></b-icon>
                        {{so.read_count}}
                    </span>
               </div><!-- end of div.card-body -->
               <div class="card-footer" v-if="ownerId == so.user.id">
                    <div class="clearfix">
                        <div class="float-right">
                            <button class="btn btn-sm btn-outline-primary" 
                            @click.prevent="$emit('songEdit',so.id)">
                                edit
                            </button>
                            <button class="btn btn-sm btn-outline-danger"
                            @click.prevent="$emit('songDel',so.id)">x</button>
                        </div>
                    </div>
               </div>

           </div>
       </div>


        <div class="col-lg-12">
            <!-- new pagination 3 July 2021 START -->
                <!-- pagination START -->
                <div class="container" style="margin-top:2em;margin-bottom:2em;">
                            <div class="nav-scroller py-1 mb-2">
                                <nav class="nav d-flex justify-content-center">
                                    <ul class="pagination flex-wrap">
                                        <li class="page-item disabled">
                                            <div class="page-link">
                                                showing from
                                                <span>{{ songs.from }}</span> to
                                                <span>{{ songs.to }}</span> of
                                                <span>{{ songs.total }}</span> 
                                            </div> 
                                        </li>
                                        <li class="page-item" v-for="li in songs.links">
                                            <a
                                                href=""
                                                class="page-link p-2"
                                                v-html="li.label"
                                                v-if="li.active != true && li.url != null"
                                                @click.prevent="$emit('getSongList', li.url)"
                                                >{{ li.label }}</a
                                            >
                                            <span class="page-link disabled" 
                                                v-html="li.label" v-else>
                                                {{ li.label  }}
                                            </span>
                                            
                                        </li>
                                        <li class="page-item active">
                                            <span class="page-link">
                                                <b-icon icon="book-half"></b-icon> 
                                                {{ songs.current_page }}
                                            </span>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            <!-- end of div.nav-scroller pagination -->
                </div>
                <!-- pagination END -->

            <!-- new pagination 3 July 2021 End -->
        </div><!-- end of div.col-lg-12 -->

    </div>
</template>

<script>
var moment = require("moment")

export default{
    name:"SongList",
    props:["songs","openId"],
    data(){
        return{
            moment:moment,
            ownerId:window.ownerId
        }
    },
watch:{
          "openId":function(x){
            this.songOpen(x)
          }
      },
methods:{
            songOpen(id){
                //alert(id)
                let url = `/readCount/${id}`
                axios.get(url)
                .then(res=>{
                    //console.log(res.data)
                    window.open(res.data.url,"_blank")
                    setTimeout(()=>{
                        this.$emit('getSongList')
                            },2000)
                        })
            },
            smartTitle(str,len){
                return (str.length > len)? str.substring(0,len)+"...":str
            },
        }
}
</script>
