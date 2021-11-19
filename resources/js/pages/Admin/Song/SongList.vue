<template>
<div class="row">
        <div class="col-lg-3" 
        v-for="so in songList.data"
        >
            <div class="card">
                
                <span style="min-height:200px;max-height:240px;">
                    <a href="" @click.prevent="$emit('songShow',so.id)">
                        <img class="responsive card-img-top" :src="so.song_cover" 
                        :alt="so.song_name"
                        style="max-height:220px;"
                        >
                    </a>
                </span>
                <div class="card-body">
                    <!-- song info START -->
                    <p>
                        {{so.song_name}} - 
                        <span class="badge badge-info font-weight-bold">
                            <a href="" :title="moment(so.posted_at)" 
                            class="text-white">
                                {{moment(so.posted_at).fromNow()}}
                            </a>
                             
                        </span>

                        <span>
                            <b-icon icon="eye"></b-icon>
                            {{so.read_count}}
                        </span>
                     </p>
                    <div class="table-responsive">
                        <table class="table table-striped table-bordered">
                            <tr>
                                <th>album</th>
                                <td>
                                    <span v-for="ab in so.album">{{ab.album_name}}</span>
                                </td>
                            </tr>
                            <tr>
                                <th>Artist</th>
                                <td>
                                    <span v-for="at in so.artist">{{at.artist_name}}</span>
                                </td>
                            </tr>
                            <tr>
                                <th>Post by</th>
                                <td>
                                    <span>{{so.user.name}}</span>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <!-- song info End -->
                    <!-- edit delete button START -->
                    <div class="clearfix">
                        <div class="btn-group float-right">
                           <button class="btn btn-outline-info" 
                           @click.prevent="$emit('songEdit',so.id)">
                                <b-icon icon="pen"></b-icon>
                                edit
                           </button>
                           <button class="btn btn-outline-danger" 
                           @click.prevent="$emit('songDel',so.id)">
                                <b-icon icon="trash"></b-icon>
                                delete
                           </button>
                        </div>
                    </div>
                    <!-- edit delete button END -->
                </div>
            </div>


        </div>
        <!-- pagination START -->
        <div class="col-lg-12 mt-4 mb-4">
                <div class="nav-scroller py-1 mb-2">
                    <nav class="nav d-flex justify-content-center">
                        <ul class="pagination flex-wrap">
                            <li class="page-item">
                                <div class="page-link disabled">
                                    showing from 
                                    <span>
                                        {{songList.from}}
                                    </span> to 
                                    <span>{{songList.to}}</span> of 
                                    <span>{{songList.total}}</span>
                                </div>

                            </li>
                            <li class="page-item" v-for="li in songList.links" 
                            >
                                <a href="" class="page-link p-2" 
                                @click.prevent="$emit('getSongList',li.url)" 
                                v-if="li.active != true && li.url != null" 
                                v-html="li.label">
                                    {{li.label}}
                                </a>
                                <span class="page-link" v-html="li.label" 
                                    v-else>
                                    {{li.label}}
                                </span> 
                            </li>
                            <li class="page-item active">
                                <span class="page-link">
                                    <b-icon icon="book-half"></b-icon>
                                    {{songList.current_page}}</span>
                            </li>
                        </ul>
                    </nav>
                </div>
        </div>
        <!-- pagination END -->
</div><!-- End of main div.row -->
</template>

<script>
var moment = require('moment')
export default{
    name:"SongList",
    props:["songList","showPagination"],
    data(){
        return{
            moment:moment,
            sTitle:new CustomText(),
        }
    },
    methods:{

    },
}
</script>
