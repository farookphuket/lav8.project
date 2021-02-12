<template>
<div class="container">

    <h1 class="text-center">new template Admin using Vue</h1>
    <p>
        this is the template generate customizer in your post.
    </p>




    <div class="row">

        <div class="col-lg-12">
            <form>
                
                <div class="form-group">
                    <label for="">section</label>
                    <input id="" class="form-control" 
                    type="text" 
                    ref="section"
                    placeholder="Enter section"
                    v-model="section">
                </div>
                <div class="form-group">
                    <label for="">title</label>
                    <input id="" class="form-control" 
                    type="text" 
                    ref="title"
                    v-on:focus="getPreview"
                    placeholder="Enter title"
                    v-model="title">
                </div>

                <div class="form-group">
                    <label for="">excerpt</label>
                    <jodit-editor 
                        height="550"
                        :placeholder="placeholder('excerpt')"
                        v-model="excerpt"></jodit-editor>
                </div>

                <div class="form-group">
                    <label for="">body</label>
                    <jodit-editor 
                        height="550"
                        v-model="body"></jodit-editor>
                </div>
                <div class="float-right btn-group">
                    <button class="btn btn-primary" type="submit" @click.prevent="saveTemplate(editId)">
                        Save
                    </button>
                </div>
            </form>
            <div class="text-center" style="margin-top:2.5em;" v-html="res_status">{{res_status}}</div>
        </div><!-- form -->

        <div class="card card-body show_preview" v-if="show_preview===true">
            <h1 class="text-center">{{title}}</h1>
            <ul class="list-group">
                <li class="list-group-item">
                    By 
                    <span class="badge badge-warning">
                        {{ownerName}}
                    </span>
                </li>
                <li class="list-group-item">
                    on {{moment(new Date().toLocaleString())}}
                    &middot;
                    {{moment(new Date().toLocaleString()).fromNow()}}
                </li>
            </ul>
            <div v-html="excerpt">{{excerpt}}</div>
            <div v-html="body">{{body}}</div>
        </div>

        <div class="col-lg-12 show_list">

            <div class="card card-body">
                <h1 class="text-center">

                </h1>
                <ul class="list-group">
                    <li class="list-group-item"></li>
                    <li class="list-group-item">
                        
                        &middot;
                        
                    </li>
                </ul>
               <div >
                   
               </div>
               <div style="text-align:left;">
                   your post
               </div>
               <div style="text-align:right;">
                   <div class="btn-group">
                    <button class="btn btn-primary" @click.prevent="editTemplate()">Edit</button>
                    <button class="btn btn-danger" @click.prevent="delTemplate(item.id)">Delete</button>
                   </div>
               </div>
            </div>

            <div class="pagination">
                <ul class="pagination justify-content-center">
                    <li class="page-item">
                        showing {{templates.from}} to {{templates.to}} of {{templates.total}}
                    </li>
                    <li class="page-item" 
                        v-for="item in templates.links" 
                        :pageId="item.label">
                        <a href="#" 
                            v-html="item.label"
                            v-if="item.active !== true && item.url !== null"
                            v-bind:class="{active:getActive(item.active)}"
                            @click.prevent="goToPage(item.url)">
                        {{item.label}}
                        </a>
                        <span class="badge badge-default active" v-html="item.label" v-else>{{item.label}}</span>
                    </li>
                    <li class="list-group-item">
                        Page {{templates.current_page}}
                    </li>
                </ul>
            </div>

        </div>

    </div><!-- .row -->
</div><!--.contanier-->

</template>

<style scoped>

.show_preview{
    padding-top:2em;
    padding-bottom:4em;
}

.card-body{
    margin-top:1em;
}
.show_list .pagination ul,li{
    display:inline-block;
}


    .pagination a{
      padding:8px 16px;
    }

    
    .pagination a:hover{
      padding:8px 16px;
      border:1px #ff0000 dashed; 
      background-color:black;
      color:red;
    }

    .pagination .active{
      font-size:25px;
      font-weight:bold;
      color:#e7e7e7;
    }

    @media all and(max-width:600px){
        .pagination li{
            display:flex;
        }
        .pagination a{
            padding:1px 8px;
            color:blue;
        }
    }

</style>

<script>

var moment = require("moment");
    
import JoditEditor from 'jodit-vue'
export default{
    name:"AdminTemplate",

    data(){
        return{
            moment: moment,
            editId:false,
            theHolder:'',
            excerpt:'',
            title:'',
            section:'',
            body:'',
            show_preview:'',
            res_status: '',
            ownerId: '',
            ownerName: '',
            
        }
    },
    mounted(){
        //console.log(this.templates);
        this.show_preview = false;
        this.ownerId = window.ownerId;
        this.ownerName = window.ownerName;


    },
    methods:{
        editTemplate(id){
            let url = `/admin/templates/${id}/edit`;
            axios.get(url)
                .then(res=>{
                    //console.log(res.data);
                    this.body = res.data.template.body;
                    this.section = res.data.template.section;
                    this.title = res.data.template.title;
                    this.excerpt = res.data.template.excerpt;
                    this.editId = res.data.template.id;
                    this.$refs.title.focus();
                });

        },
        getPreview(){
            this.show_preview = true;
        },
        getActive(st){
            let active = '';
            if(st == true){
                active = 'active';
            }
            return active;
        },
        saveTemplate(id){
            let url = '';
            let data = {
                    title:this.title,
                    section:this.section,
                    excerpt:this.excerpt,
                    body:this.body
                };

            if(!id){
                url = '/admin/templates';

                axios.post(url,data)
                    .then(res=>{

                        this.res_status = res.data.msg;
                    }).catch(err=>{
                        //console.log(err.response.data.message);
                        this.res_status = `<span class="alert alert-danger">
                            ${err.response.data.message}
                            please check your input
                        </span>`;
                    });

            }else{
                url = `/admin/templates/${id}`;
                axios.put(url,data)
                    .then(res=>{
                        this.res_status = res.data.msg;
                    })
                    .catch(err=>{
                        //console.log(err.response.data);
                        this.res_status = `<span class="alert alert-danger">
                            ${err.response.data.message}  Please check your input field!
                           </span> `;
                    });

            }

            setTimeout(()=>{
              //  location.reload();
            },2000);

        },
        goToPage(url){
            location.href=url;
        },
        delTemplate(id){
            let url = `/admin/templates/${id}`;
            axios.delete(url)
                .then(res=>{
                    //console.log(res.data.msg);
                    this.res_status = res.data.msg;
                });
            setTimeout(()=>{
                location.reload();
            },2000);
        },
        placeholder(what){

            switch(what){
                case"excerpt":
                    this.theHolder = `Howdy, ${ownerName} what's in your mind?`;
                break;
                case"body":
                    this.theHolder = `How to write in here ha ha`;
                break;
                    default:
                    this.theHolder = `please enter ${what} name his TAT`;
                    break;
            }

            return this.theHolder;

        },
    }



}


</script>
