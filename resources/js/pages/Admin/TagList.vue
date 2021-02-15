<template>
    <div class="container">
        <div class="card card-body" 
            v-for="li in tags.data">
            <div>
                <div class="row">
                    <div class="col-md-6">
                        <h3 class="text-center">
                            {{li.tag_name}}
                        </h3>
                    </div>
                    <div class="col-md-3">
                        <span class="badge badge-info">
                            {{li.tag_name}}
                        </span> 
                        <span class="badge badge-info">
                            {{moment(li.created_at)}}
                        </span> &middot; 
                        <span class="badge badge-info">
                            {{moment(li.created_at).fromNow()}}
                        </span> 
                    </div>
                    <div class="col-md-3">
                        <div class="clearfix">
                            <div class="float-right">
                                <div class="badge badge-info">
                                    {{li.posts.length}}
                                </div>
                                <button class="btn btn-primary"
                                    @click.prevent="$emit('tagEdit',li.id)">
                                    edit</button>
                                <button class="btn btn-danger"
                                    @click.prevent="$emit('tagDelete',li.id)">
                                    x</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ul class="list-group"
                v-show="li.posts.length != 0">
                <li class="list-group-item"
                    v-for="mm in li.posts">
                    <a href="#" @click="$emit('goReadPost',mm.slug)">
                        {{mm.post_title}}
                    </a>
                </li>
            </ul>
        </div>

        <div class="pa">
            <ul class="pagination">
                <li class="page-item">
                    showing from 
                    <span>{{tags.from}}</span> to 
                    <span>{{tags.to}}</span> of 
                    <span>{{tags.total}}</span>
                </li>
                <li class="page-item" v-for="mm in tags.links">
                    <a href="" 
                        v-if="mm.active == false && mm.url != null"
                        @click.prevent="$emit('getTags',mm.url)"
                        v-html="mm.label">
                        {{mm.label}}
                    </a>
                    <span class="active" v-html="mm.label" v-else>
                        {{mm.label}}
                    </span>
                </li>
                <li class="page-item">
                    <span class="active">
                        {{tags.current_page}}
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>


<script>
var moment = require('moment')
export default{
    name:"TagList",
    props:["tags"],
    data(){
        return{
            moment:moment
        }
    },
    methods:{

    }
}
</script>
