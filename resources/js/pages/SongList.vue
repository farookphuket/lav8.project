<template>
    <div>
        
        <div class="row">
            <div class="col-md-4" v-for="so in songs.data">
                
                <div class="card ">
                   <a class="" target="_blank" :href="so.url" 
                   @click.prevent="readCount(so.id)">
                        <img :src="so.cover" class="responsive card-image-top">
                   </a>
                    <div class="card-body">
                        <p class="card-text">
                            {{so.name}}
                        </p>
                        <p class="card-text">
                        {{moment(so.posted_ar).fromNow()}} - 
                         <b-icon icon="headphones"></b-icon> 
                         {{so.read_count}}
                            
                        </p>
                    </div>
                </div>


            </div> <!-- end col-md-4 -->
        </div> <!-- end div.row-->


        <div class="pa">
            <ul class="pagination">
                <li class="page-item">
                    showing from  
                    <span>{{songs.from}}</span>  
                    to 
                    <span>{{songs.to}}</span>   
                    of 
                    <span>{{songs.total}}</span> &middot;
                </li>
                <li class="page-item" v-for="ll in songs.links">
                    <a href="" v-html="ll.label" 
                    @click.prevent="$emit('getSongList',ll.url)" 
                    v-if="ll.active == false && ll.url != null">
                        {{ll.label}}
                    </a>
                    <span class="active" v-html="ll.label" v-else>
                        {{ll.label}}
                    </span>
                </li>
                <li class="page-item">
                    <span class="active">{{songs.current_page}}</span>
                </li>
            </ul>
        </div>
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
             let url = `/readCount/${id}` 
             axios.get(url)
             .then(res=>{
                //console.log(res.data.url)
                window.open(res.data.url,"_blank")
                setTimeout(()=>{
                    this.$emit("getSongList")
                        },2000) 
                     })
            },
        },
}
</script>
