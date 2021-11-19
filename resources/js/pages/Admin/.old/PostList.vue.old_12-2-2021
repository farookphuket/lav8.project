<template>

    <div class="container">
        <div class="row">
            <div class="col-lg-12">

                <div class="card card-body" 
                    v-for="li in posts.data" :pId="li.id">

                    <div class="clearfix">
                        <div class="float-right">
                        <span class="badge badge-danger"
                        v-if="li.is_public != 1">
                            Not public
                        </span>
                        <span class="badge badge-success" 
                        v-else>
                            Public
                        </span>
                            By
                            <span class="badge badge-info">
                                {{li.name}} 
                            </span>
                            <button class="btn btn-danger btn-close" 
                                @click.prevent="del(li.id)">&times;</button>
                        </div>
                    </div>
                    <h2 class="text-center">
                        <a href="#"
                            @click.prevent="goRead(li.slug)">
                        {{li.post_title}} 
                        </a>
                    </h2>
                    <div class="container"
                       v-html="li.post_excerpt">
                        {{li.post_excerpt}}
                    </div>
                   


                    <div class="clearfix">
                        <div class="text-center text-sm">
                            <ul>
                                <li>{{moment(li.created_at)}}&middot;{{moment(li.created_at).fromNow()}}</li>
                                
                                <li>{{moment(li.updated_at)}}&middot;{{moment(li.updated_at).fromNow()}}</li>
                            </ul>
                        </div>
                        <div class="float-right">
                            <div class="btn-group">
                                <button class="btn btn-primary" 
                                    @click.prevent="edit(li.id)">edit</button>

                            </div>
                        </div>
                    </div><!-- end of div.clearfix -->



                </div><!-- end .card-body-->

            </div><!-- end of element col12-->
            <div class="col-lg-12 pa">
                <ul class="pagination">
                    <li class="page-item"
                        v-for="li in posts.links"
                        :pageId="li.label"
                        >
                        <a href=""
                            v-html="li.label" 
                            v-if="li.active !== true && li.url !== null"
                            @click.prevent="goToPage(li.url)">
                            {{li.label}}
                        </a>
                        <span v-else v-html="li.label">{{li.label}}</span>
                    </li>
                </ul>
            </div><!-- end .col-lg-12 pagination -->
        </div><!-- end of .row -->
    </div><!-- end of main element -->

</template>

<style scoped>

.card-body{
    margin-top:1em;
}
.card-body ul,li{
    margin-top:2px;
    color:green;
 vertical-align:bottom;
    display:inline-block;
}
.card-body ul{
    vertical-align:bottom;
}

.pa{
    margin-top:2em;
}
.pa span{
    background-color:#e7e7e7;
    padding:2px;
}

.pagination ul,li{
    padding:8px 16px;
}
.pa .pagination a{
    color:green;
}

.pa .pagination a:hover{
    padding:4px 8px;
    color:red;
    background-color:black;

}

</style>

<script>
var moment = require('moment')
export default{

    name: 'Postlist',
    props: ["posts"],
    data(){
        return{

            moment:moment,
        }
    },

    methods:{

        edit(id){
            this.$emit(`editPost`,id);
        },
        del(id){
            this.$emit(`delPost`,id)
        },
        goToPage(id){
            this.$emit('getPostsList',id);
        },
        goRead(id){
            let url = `/admin/post/${id}`
            location.href=url;
        }
    }
}
</script>
