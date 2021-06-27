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
        <div class="col-lg-12 pt-2 mb-4">
           <div class="pa">
               <ul class="pagination">
                   <li class="page-item">
                        showing from 
                        <span>
                            {{songs.from}} 
                        </span> to 
                        <span>{{songs.to}}</span> of 
                        <span>{{songs.total}}</span> &middot;
                   </li>
                   <li class="page-item" v-for="li in songs.links">
                       <a href="" 
                       v-html="li.label" 
                       @click.prevent="$emit('getSongList',li.url)"
                       v-if="li.active != true && li.url != null">
                        {{li.label}}
                       </a>

                        <span class="active" v-html="li.label" v-else>
                            {{li.label}}
                        </span>
                        &middot;
                   </li>
                   <li class="page-item">
                        <span class="active">
                            {{songs.current_page}}
                        </span>
                   </li>
               </ul>
           </div>
        </div>

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
