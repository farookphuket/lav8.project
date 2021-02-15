<template>
<div class="container">
    <div class="card card-body"
        v-for="li in templates.data">
        <a href=""
            @click.prevent="$emit('tmpRead',li.id)">
            <h2 class="text-center">
               {{li.title}} 
            </h2>
        </a>
        <div class="clearfix">
            <div class="float-right">
                created 
                <span class="badge badge-info">
                    {{moment(li.created_at)}} &middot;
                    {{moment(li.created_at).fromNow()}}
                </span>
                by  
                <span class="badge badge-info">
                    {{li.user.name}} &middot;  
                    {{li.user.email}}
                </span>
            </div>
        </div>
        <div v-html="li.excerpt">
            {{li.excerpt}}
        </div>
        <div class="clearfix">
            <div class="float-left">
                Section 
                <span class="badge badge-info">
                    {{li.section}}
                </span>
            </div>
            <div class="float-right">
                <button class="btn btn-primary"
                        @click.prevent="$emit('editTemplate',li.id)">
                    edit
                </button>

                <button class="btn btn-danger"
                        @click.prevent="$emit('delTemplate',li.id)">
                    delete
                </button>
            </div>
        </div>
    </div>
    <div class="pa">
        <ul class="pagination">
            <li class="page-item">
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
            </li>
            <li class="page-item" v-for="li in templates.links"
                
                >
                <a v-if="li.active == false && li.url != null"
                   href="" v-html="li.label"
                           @click.prevent="$emit('getTemplates',li.url)">
                    {{li.label}}
                </a>
                <span v-html="li.label"
                     v-else>
                    {{li.label}}
                </span>
            </li>
            <li class="page-item">
                current page 
                <span>
                    {{templates.current_page}}
                </span>
            </li>
        </ul>
    </div>
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
