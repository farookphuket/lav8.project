<template>
    <div>
        <div class="card card-body" v-for="so in songs.data">
            <h3 class="text-center">{{so.name}}</h3>
            <div class="row">
                <div class="col-lg-4">
                    <img :src="so.cover" 
                    class="responsive">
                    <p class="text-center">
                        {{so.name}} - {{moment(so.posted_at)}}
                    </p>
                </div>
                <div class="col-lg-8">
                   <a class="btn btn-outline-info" target="_blank"
                   :href="so.url">{{so.name}}</a>
                </div>
            </div>
        </div>

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
