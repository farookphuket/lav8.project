<template>
    <div class="row">
       <div class="col-lg-3 mb-2" v-for="so in songs.data">
           <div class="card pt-2">
                <a href="" @click.prevent="songOpen(so.id)">
                   <img class="responsive card-img-top" :src="so.cover" 
                   :alt="so.name">
                </a>
               <div class="card-body">
                    <p class="card-text">
                        {{so.name}} - {{so.artist.name}} 
                        
                    </p>
                    <p class="card-text">
                        post by 
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
    props:["songs"],
    data(){
        return{
            moment:moment,
            ownerId:window.ownerId
        }
    },
methods:{
            songOpen(id){
                alert(id)
            }
        }
}
</script>
