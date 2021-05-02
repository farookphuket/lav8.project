<template>
    <div>
        <div class="card card-body"
            v-for="po in wnlist.data">

            <h2 class="text-center">
                <a href=""
                    @click.prevent="goRead(po.id)">
                    <b-icon icon="arrow-up-right"></b-icon>
                {{po.whatnews_title}}
                </a>
            </h2>
            <div class="clearfix x-info">
                <div class="float-left">
                    <span class="badge badge-danger p-2"
                        v-if="po.is_public !== '1'">
                        <b-icon icon="lock"></b-icon>
                    </span>
                    <span class="badge badge-success p-2"
                        v-else>
                        <b-icon icon="unlock"></b-icon>
                    </span>
                </div><!-- end div.float-left -->
                <div class="float-right">
                    <span>
                        <b-icon icon="person"></b-icon>
                        {{po.user.name}}
                    </span> &middot;
                    <span class="badge badge-info">
                        <b-icon icon="calenda2-day"></b-icon>
                        {{moment(po.created_at)}}
                    </span> &middot;
                    <span class="badge badge-info">
                        <b-icon icon="clock-history"></b-icon>
                        {{moment(po.created_at).fromNow()}}
                    </span>
                </div><!-- end div.float-right -->
            </div><!-- end div.clearfix -->
            <div class="line"></div>
            <div class="clearfix">
                <div class="float-right">
                    <div class="btn-group">
                        <button 
                            @click.prevent="goEdit(po.id)"
                            class="btn btn-outline-primary btn-sm">
                            Edit
                        </button>

                        <button 
                            @click.prevent="goDel(po.id)"
                            class="btn btn-outline-danger btn-sm">
                            <b-icon icon="trash"></b-icon>
                        </button>
                    </div>
                </div>
            </div>
        </div><!-- end of div.card -->
        <!-- =========== need some space START ====== -->
        <div class="col-lg-12 pt-2 mb-2">&nbsp;</div>
        <!-- =========== need some space End ====== -->
        <!-- =========== pagination START ========= -->
        <div class="col-lg-12">

        </div>

        <!-- =========== pagination End ========= -->
        <div class="nav-scroller py-1 mb-2">
            <nav class="nav d-flex justify-content-center">
                <ul class="pagination flex-wrap">
                    <li class="page-item active">
                        <div class="page-link disabled">
                            showing from 
                            <span>
                                {{wnlist.from}}
                            </span>
                            to 
                            <span>
                                {{wnlist.to}}
                            </span>
                            of 
                            <span>
                                {{wnlist.total}}
                            </span>
                        </div>
                    </li>
                    <li class="page-item" 
                        v-for="li in wnlist.links">
                        <a v-if="li.active === false && li.url !== null"
                           href="#" class="page-link p-2"
                           @click="goToPage(li.url)"
                            v-html="li.label">
                        {{li.label}}
                        </a>
                        <span class="page-link disabled active" v-else
                            v-html="li.label">
                            {{li.label}}
                        </span>
                    </li>
                    <li class="page-item active">
                        <span class="page-link">
                            <b-icon icon="book-half"></b-icon>
                            {{wnlist.current_page}}
                        </span>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>
<style scoped>

.pa span{
    font-size:20px;
}
.pa a{
    font-size:16px;
}



@media only screen and (max-width: 480px){


    .x-info{
        display:block;
    }

    .x-info p{
        font-color:blue;
    }
    .x-info span{
        word-wrap:break-word;
    }

}
</style>
<script>
var moment = require('moment')

export default{

    name:"WhatnewsList"
    ,props:["wnlist"]
    ,data(){
        return{
            moment: moment,

        }
    },
    methods:{
        goToPage(url){
            this.$emit("goToPage",url)
        },
        goRead(id){
            this.$emit("goRead",id)
        },
        goEdit(id){
            this.$emit("goEdit",id)
        },
        goDel(id){
            this.$emit("goDel",id)
        },
    }
}

</script>
