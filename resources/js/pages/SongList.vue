<template>
    <div>
        
        <div class="row">
            <div class="col-md-3 pt-2" v-for="so in songs.data">
                
                <div class="card ">
                   <a class="" target="_blank" :href="so.url" 
                   @click.prevent="readCount(so.id)">
                        <img :src="so.cover" class="responsive card-image-top">
                   </a>
                    <div class="card-body">
                        <p class="card-text">
                            <span>
                                <b-icon icon="info-circle"></b-icon>  
                                <a href="" :title="so.name">
                                    {{smartTitle(so.name,13)}}
                                </a>
                                
                            </span> &nbsp;
                            <span>
                                <b-icon icon="person"></b-icon>  
                                {{so.user.name}}
                            </span>
                        </p>
                        <p class="card-text">
                        <span class="badge badge-info">
                            <b-icon icon="clock-history"></b-icon> 
                            <a href="" 
                               style="color:white;font-weight:bold;"
                                :title="moment(so.posted_at)">
                                {{moment(so.posted_at).fromNow()}}
                            </a>
                        </span> 
                         - 
                        <span class="badge badge-info">
                             <b-icon icon="headphones"></b-icon> 
                             {{so.read_count}}
                        </span>
                            
                        </p>
                    </div>
                </div>


            </div> <!-- end col-md-4 -->
        </div> <!-- end div.row-->


        <div class="nav-scroller py-1 mb-2 pt-4">
            <nav class="nav d-flex justify-content-center">
                <ul class="pagination flex-wrap">
                    <li class="page-item disabled">
                        <div class="page-link">
                            showing from  
                            <span>{{songs.from}}</span>  
                            to 
                            <span>{{songs.to}}</span>   
                            of 
                            <span>{{songs.total}}</span>
                        </div>
                    </li>
                    <li class="page-item" v-for="ll in songs.links">
                        <a href="" class="page-link"
                           v-html="ll.label" 
                        @click.prevent="$emit('getSongList',ll.url)" 
                        v-if="ll.active == false && ll.url != null">
                            {{ll.label}}
                        </a>
                        <span class="page-link active" v-html="ll.label" v-else>
                            {{ll.label}}
                        </span> 

                    </li>
                    <li class="page-item active">
                        <span class="page-link">
                            <b-icon icon="book-half"></b-icon>
                            {{songs.current_page}}</span>
                    </li>
                </ul>
            </nav>
        </div>
        <p class="pt-4">&nbsp;</p>
    </div>

</template>


<script>
var moment = require('moment')
export default{
    name:"SongList",
    props:["songs"],
    data(){
        return{
            moment:moment
        }
    },
methods:{
            readCount(id){
             let url = `/song/${id}` 
             axios.get(url)
             .then(res=>{
                //console.log(res.data.url)
                window.open(res.data.url,"_blank")
                setTimeout(()=>{
                    this.$emit("getSongList")
                        },2000) 
                     })
            },
            smartTitle(str,len){
                return (str.length > len)? str.substring(0,len)+"...":str
            },
        },
}
</script>
