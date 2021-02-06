<template>
    <div class="container">



        <p>{{msg}}</p>

        <div class="card card-body"
            v-for="po in wnlist.data">

            <h2 class="text-center">
                <a href=""
                    @click.prevent="goRead(po.id)">
                {{po.whatnews_title}}
                </a>
            </h2>
            <div class="clearfix x-info">
                <div class="float-left">
                    <span class="badge badge-danger"
                        v-if="po.is_public !== '1'">
                        Not Public
                    </span>
                    <span class="badge badge-success"
                        v-else>
                        Public
                    </span>
                </div><!-- end div.float-left -->
                <div class="float-right">
                    <div class="x-info">
                        By 
                        <span class="badge badge-info">
                            {{po.user.name}}
                        </span>
                        on 
                        <span class="badge badge-info">
                            {{moment(po.created_at)}}
                        </span>
                        <span class="badge badge-info">
                            &middot;
                            {{moment(po.created_at).fromNow()}}
                        </span>
                    </div>
                </div><!-- end div.float-right -->
            </div><!-- end div.clearfix -->
            <div class="line"></div>
            <div class="clearfix">
                <div class="float-right">
                    <div class="btn-group">
                        <button 
                            @click.prevent="goEdit(po.id)"
                            class="btn btn-primary">
                            Edit
                        </button>

                        <button 
                            @click.prevent="goDel(po.id)"
                            class="btn btn-danger">
                            delete
                        </button>
                    </div>
                </div>
            </div>

        </div><!-- end of div.card -->
        <div class="pa">
            <ul class="pagination">
                <li class="page-item">
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
                </li>
                <li class="page-item" 
                    v-for="li in wnlist.links">
                    <a v-if="li.active === false && li.url !== null"
                       href="#"
                       @click="goToPage(li.url)"
                        v-html="li.label">
                    {{li.label}}
                    </a>
                    <span class="active" v-else
                        v-html="li.label">
                        {{li.label}}
                    </span>
                </li>
                <li class="page-item">
                    current page 
                    <span>
                        {{wnlist.current_page}}
                    </span>
                </li>
            </ul>
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
            msg:'I still cannot make this work with the line number'
            ,moment: moment

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
