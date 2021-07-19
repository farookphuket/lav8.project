<template>
    <div>
        <div class="row">
            <!-- ======== v-for Start ======== -->
            <div class="col-lg-4 col-md-2 p-2 pt-2" v-for="vi in videos.data">
                <div class="card card-body">
                    <div class="video-container" v-html="vi.embed">
                        {{vi.embed}}
                    </div>
                </div>
                <div class="card-footer">
                    <div class="clearfix">
                        <div class="float-left">
                            <span>
                                <b-icon icon="film"></b-icon>
                                <a href="" 
                                   :title="vi.title"
                                    @click.prevent="$emit('openVideo',vi.id)">
                                    {{smartTitle(vi.title,16)}}
                                </a>
                            </span> &middot;
                            <span>
                               <b-icon icon="person"></b-icon>
                                {{vi.user.name}}
                            </span>
                        </div><!-- end of div.float-left -->
                        <!-- ==== div.float-right START===== -->
                        <div class="float-right">
                            <span>
                                <button 
                                    class="btn btn-outline-primary btn-sm" 
                                    @click.prevent="$emit('editVideo',vi.id)"
                                    >edit</button>
                                <button 
                                    class="btn btn-outline-danger btn-sm" 
                                    @click.prevent="$emit('delVideo',vi.id)"
                                    >
                                    <b-icon icon="trash"></b-icon>
                                </button>
                            </span>
                        </div>
                        <!-- ==== div.float-right END===== -->
                    </div><!-- end of div.clearfix -->

                </div><!-- end div.footer -->
            </div><!-- end of div v-for -->
            <!-- ======== v-for End ======== -->
            <!-- ======== need a space START ====== -->
            <div class="col-lg-12 pt-2 mb-2 p-2">&nbsp;</div>
            <!-- ======== need a space End ====== -->

            <!-- ======== pagination Start ======== -->
            <div class="col-lg-12">
                <div class="nav-scroller py-1 mb-2">
                    <nav class="nav d-flex justify-content-center">
                        <ul class="pagination flex-wrap">
                            <li class="page-item disabled">
                                <div class="page-link">
                                    showing from <span>{{videos.from}}</span> to 
                                    <span>{{videos.to}}</span> of 
                                    <span>{{videos.total}}</span>
                                </div>
                            </li>
                            <li class="page-item" v-for="li in videos.links">
                                <a href="" v-if="!li.active && li.url != null" 
                                    @click.prevent="$emit('getVideos',li.url)"
                                           class="page-link p-2"
                                           v-html="li.label">
                                    {{li.label}}
                                </a>
                                <span class="page-link disabled" 
                                    v-html="li.label" v-else>
                                    {{li.label}}
                                </span>
                            </li>
                            <li class="page-item active">
                                <span class="page-link disabled">
                                    <b-icon icon="book-half"></b-icon>
                                    {{videos.current_page}}
                                </span>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <!-- ======== pagination End ======== -->
        </div><!-- end of div.row -->
    </div><!--end of main div -->

</template>

<script>

var moment = require('moment')

export default{
    name:"VideoList",
    props:["videos"],
    data(){
        return{
            moment:moment,
        }
    },
    methods:{
        smartTitle(str,len=9){
            return (str.length > len)?str.substring(0,len)+"...":str
        },
    },
}
</script>
