<template>
    <div>
        <b-tab title="Public song">
            <div class="row">
                <div class="col-lg-3 mt-4 " v-for="so in allSong.data">
                    <div class="text-center" 
                    style="min-height:220px;">
                        <a href="" @click.prevent="$emit('openSong',so.id)">

                            <img class="responsive d-block mx-auto" 
                            style="max-height:220px;"
                            :src="so.song_cover" :alt="so.song_name">
                        </a>

                    </div>
                    <p class="text-center pt-2">
                        {{so.song_name}} - 
                        <span class="badge badge-info p-2">
                            <b-icon icon="headphones"></b-icon>
                            {{so.read_count}}
                        </span>
                        {{moment(so.posted_at).fromNow()}}
                    </p>

                </div>

                <!-- pagination START -->

                <div class="col-lg-12 mt-4 mb-4">

                    <div class="nav-scroller py-1 mb-2 pt-4">
                        <nav class="nav d-flex justify-content-center" v-if="!isShowPagination == false">
                            <ul class="pagination flex-wrap">
                                <li class="page-item disabled">
                                    <div class="page-link">
                                        showing from  
                                        <span>{{allSong.from}}</span>  
                                        to 
                                        <span>{{allSong.to}}</span>   
                                        of 
                                        <span>{{allSong.total}}</span>
                                    </div>
                                </li>
                                <li class="page-item" v-for="ll in allSong.links">
                                    <a href="" class="page-link p-2"
                                       v-html="ll.label" 
                                    @click.prevent="$emit('getAllSong',ll.url)" 
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
                                        {{allSong.current_page}}</span>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <!-- pagination END -->
            </div>
        </b-tab>
        <b-tab title="My Song " lazy   
         @click.prevent="selMe">
            <div class="row">

               <div class="col-md-3 mt-4" v-for="so in mySong.data" 
               v-if="so.user_id == user_id">
                    <div class="row">
                        <div class="col-md-6">
                         {{moment(so.posted_at).fromNow()}}   
                        </div>
                        <div class="col-md-6 mb-2">
                            <div class="btn-group float-right">
                                <button class="btn btn-outline-info" 
                                @click.prevent="$emit('edit',so.id)">
                                    <b-icon icon="pen"></b-icon>
                                </button>

                                <button class="btn btn-outline-danger" 
                                @click.prevent="$emit('del',so.id)">
                                    <b-icon icon="trash"></b-icon>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="text-center">
                        <a href="" @click.prevent="$emit('openSong',so.id)">
                            <img class="responsive d-block mx-auto" 
                            :src="so.song_cover" :alt="so.song_name" 
                            style="max-height:220px;">
                        </a>

                        <p class="pt-2 font-weight-bold">{{so.song_name}} 
                            <span class="badge badge-info p-2">
                                <b-icon icon="headphones"></b-icon>
                                {{so.read_count}}
                            </span>
                        </p>
                    </div>
               </div>

                <!-- pagination START -->
                <div class="col-lg-12 mt-4 mb-4">
                    <div class="nav-scroller py-1 mb-2 pt-4">
                        <nav class="nav d-flex justify-content-center" v-if="!paginate_mysong == false">
                            <ul class="pagination flex-wrap">
                                <li class="page-item disabled">
                                    <div class="page-link">
                                        showing from  
                                        <span>{{mySong.from}}</span>  
                                        to 
                                        <span>{{mySong.to}}</span>   
                                        of 
                                        <span>{{mySong.total}}</span>
                                    </div>
                                </li>
                                <li class="page-item" v-for="ll in mySong.links">
                                    <a href="" class="page-link p-2"
                                       v-html="ll.label" 
                                    @click.prevent="$emit('getAllSong',ll.url)" 
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
                                        {{mySong.current_page}}</span>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <!-- pagination END -->
            </div>
        </b-tab>

    </div>
</template>

<script>
import SongForm from './SongForm.vue'
var moment = require('moment')
export default{
    name:"SongList",
             components:{
                 SongForm,
             },
    props:["allSong","user_id","mySong","isShowPagination","paginate_mysong"],

    data(){
        return{
            isActive:false,
            sTitle:new CustomText(),
            msong:'',
            msong_count:0,
            moment:moment,
        }
    },

      mounted(){
          this.u_id = this.user_id

      },

methods:{
            selMe(){
                this.isActive = true

                
            }, 

        },
}
</script>
