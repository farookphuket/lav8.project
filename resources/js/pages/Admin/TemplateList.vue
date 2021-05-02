<template>
<div>
    <div class="card card-body pt-2 mb-2"
        v-for="li in templates.data">
        <a href=""
            @click.prevent="$emit('tmpRead',li.id)">
            <h2 class="text-center">
               {{li.title}} 
            </h2>
        </a>
        <div class="clearfix">
            <div class="float-right">
                <span>
                    <b-icon icon="calendar2-day"></b-icon>
                    {{moment(li.created_at)}} 
                </span> &middot;
                <span>
                    <b-icon icon="clock-history"></b-icon>
                    {{moment(li.created_at).fromNow()}}
                </span> &middot;
                <span>
                    <b-icon icon="person"></b-icon>
                    {{li.user.name}}   
                </span> &middot;
                <span>
                    <b-icon icon="envelope"></b-icon>
                    {{li.user.email}}
                </span>
            </div>
        </div>
        <div v-html="li.excerpt">
            {{li.excerpt}}
        </div>
        <hr class="pt-2 mb-2">
        <div class="clearfix">
            <div class="float-left">
                <span class="badge badge-info p-2">
                    <b-icon icon="tags" variant="danger"></b-icon>
                    {{li.section}}
                </span>
            </div>
            <div class="float-right">
                <button class="btn btn-outline-primary btn-sm"
                        @click.prevent="$emit('editTemplate',li.id)">
                    edit
                </button>

                <button class="btn btn-outline-danger btn-sm"
                        @click.prevent="$emit('delTemplate',li.id)">
                    <span>
                    <b-icon icon="trash" variant="danger" ></b-icon>
                    </span>
                </button>
            </div>
        </div>
    </div>
    <!-- need some space -->
    <div class="col-lg-12 pt-2 mb-2">&nbsp;</div>
    <!-- need some space -->
    <div class="nav-scroller py-1 mb-2">
        <nav class="nav d-flex justify-content-center">
            <ul class="pagination flex-wrap">
                <li class="page-item">
                    <div class="page-link disabled">
                        showing
                        <span>
                            {{templates.from}}
                        </span> to 
                        <span>
                            {{templates.to}}
                        </span> total 
                        <span>
                            {{templates.total}}
                        </span>
                    </div>
                </li>
                <li class="page-item" v-for="li in templates.links"
                    
                    >
                    <a class="page-link p-2"
                        v-if="li.active == false && li.url != null"
                       href="" v-html="li.label"
                               @click.prevent="$emit('getTemplates',li.url)">
                        {{li.label}}
                    </a>
                    <span v-html="li.label" class="page-link"
                         v-else>
                        {{li.label}}
                    </span>
                </li>
                <li class="page-item active">
                    <span class="page-link">
                        <b-icon icon="book-half"></b-icon>
                        {{templates.current_page}}
                    </span>
                </li>
            </ul>
        </nav>
    </div><!-- end of main pagination div -->
</div>
</template>

<script>
var moment = require("moment")
export default{
    name:"TemplateList",
    props:["templates"],
    data(){
        return{
            moment:moment
        }
    }
}
</script>
