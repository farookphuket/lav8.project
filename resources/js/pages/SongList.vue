<template>
    <div>
        
        <div class="row">
            <div class="col-md-4" v-for="so in songs.data">
                
                <div class="card card-body">
                   <a class="" target="_blank" :href="so.url">
                        <img :src="so.cover" class="responsive">
                   </a>
                   <span class="btn btn-outline-info btn-sm">
                        {{so.name}} - {{moment(so.posted_at).fromNow()}}
                   </span>
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
    }
}
</script>
