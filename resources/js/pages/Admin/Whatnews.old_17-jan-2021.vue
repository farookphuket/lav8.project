<template>
    <div class="container">
        <h1 class="text-center">this is admin Vue</h1>
        <p>{{msg}}</p>
        <div class="col-lg-12">
            <form class="mb-4 pt-4">
                <div class="form-group">
                    <label for="">
                        Title
                    </label>
                    <input  type="text" class="form-control" v-model="title" ref="title" v-on:keypress="getPreview('show')">
                </div>
                <div class="form-group">
                    <jodit-editor 
                        v-model="body"
                        height=550
                        ></jodit-editor>
                </div>

                <div class="form-group" style="text-align:right;">
                    <label class="alert alert-warning">
                        <input id="" 
                        type="checkbox" 
                        v-bind:value="is_public"
                        v-bind:true-value="1"
                        v-model="is_public"
                        > show as Public?
                    </label>
                </div>

                <div class="btn-group float-right">
                    <button class="btn btn-primary" @click.prevent="saveItem(editId)">Save</button>
                </div>
                <p style="margin-top:1.5em;">&nbsp;</p>
            </form>
        </div>
        <div class="line"></div>
        <div class="show_preview" v-if="show_preview===true">
            <h2 v-html="title">{{title}}</h2>
            <div v-html="body">{{body}}</div>
            <div class="line"></div>
            <div class="alert alert-warning" v-if="is_public === false || !is_public">
                Note : Your post will be only visible to you  
                as you have not set public for it.
            </div>

            <div class="alert alert-success" v-else>
                Note : Your post will be public for every one.  
            </div>
            <p style="margin-top:1.5em" v-html="status">{{status}}</p>

            <div class="line"></div>
        </div>
        <div v-for="item in whatnews.data" :editId="item.id">
            <div class="card card-body mb-2">
                <h1 class="text-center">{{item.whatnews_title}}</h1>
                <p>created {{moment(item.created_at)}} {{moment(item.created_at).fromNow()}} </p>
                
                <div style="text-align:right;">
                By
                <span class=" badge badge-success">
                 {{item.user.name}}
                </span>
                </div>
                <div v-html="item.whatnews_body"> 
                {{item.whatnews_body}}
                </div>
                <div style="margin-top:1.5em;">

                    <span class="float-left" v-if="ownerId === item.user_id">
                        yours..
                    </span>
                    <span class="float-right badge badge-danger" v-if="item.is_public === '0'">Private</span>
                </div>

                <div class="line"></div>
                <div style="text-align:right;">
                    <div class="btn-group">
                        <button class="btn btn-primary" @click.prevent="editItem(item.id)">Edit</button>
                        <button class="btn btn-danger" 
                            @click.prevent="delItem(item.id)">Delete</button>
                    </div>
                </div>

            </div>
        </div>
        <div class="pagination">
            <ul>
                <li>
                    from {{whatnews.from}} to {{whatnews.to}} of {{whatnews.total}} items.
                </li>
                <li v-for="item in whatnews.links" 
                    :pageId="item.label">
                    <a v-html="item.label" 
                        href="#" @click.prevent="goUrl(item.url)"
                        v-bind:class="{active:isActive(item.active)}"
                        >
                    {{item.label}}
                    </a>
                </li>
                <li></li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
    .show_preview{
        background-color:white;
        color:black;


    }
    .pagination ul,li{
        display:inline-block;
    }

    .pagination a{
      padding:8px 16px;
      border:1px #ff0000 dotted; 
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
      color:red;
    }



/*-----Make your webpage responsive ---*/
/*

image responsive

*/
.responsive{
    max-width: 100%; 
    height: auto;
    border: 2px solid #B98CC3;
}

/*
    add this  line Sat 2 Jun 2018 to make an embeded youtube video responsive
    from  https://avexdesigns.com/responsive-youtube-embed/
*/


.video-container {
    position: relative;
    padding-bottom: 56.25%;
    padding-top: 30px; height: 0; overflow: hidden;
    }
    
.video-container iframe,
.video-container object,
.video-container embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}




.sound-container {
    position: relative;
    padding-bottom: 8.4%;
    padding-top: 6px; height: 0; overflow: hidden;
    }
    
.sound-container iframe,
.sound-container object,
.sound-container embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

/*
End of video section
*/





</style>


<script>
var moment = require('moment');
import JoditEditor from "jodit-vue";
export default{

    props:["whatnews"],
    data(){
        return{
            moment: moment,
            msg: 'Whatnews Admin using Vue',
            body: '',
            title: '',
            is_public: '',
            status: '',
            editId: '',
            ownerId: '',
            show_preview: false,

        }
    },
    mounted(){
        this.init()
    },
    methods:{
        init(){
            //console.log(this.whatnews);
            this.ownerId = window.ownerId;

        },
        editItem(id){
            axios.get(`/admin/whatnews/${id}/edit`)
                .then(res=>{
                    //console.log(res.data.wm.whatnews_title);
                    this.body = res.data.wm.whatnews_body;
                    this.title = res.data.wm.whatnews_title;
                    this.$refs.title.focus();
                    this.show_preview = true;
                    let pb = res.data.wm.is_public;
                    this.is_public = pb;
                    this.editId = res.data.wm.id;

                    if(pb === "1"){
                        this.status = `<span class="badge badge-success">Public</span>`;
                    }else{

                        this.status = `<span class="badge badge-danger">NOT Public</span>`;
                    }
                });
        },
        saveItem(id){
            if(!id){
                axios.post(`/admin/whatnews`,{
                    title: this.title,
                    body: this.body,
                    is_public: this.is_public
                })
                    .then(res=>{
                        console.log(res.data);
                        this.status = res.data.msg;
                    }).catch(err=>{
                        this.status = `<span class="badge badge-danger">

                            </span>`;
                    });
            }else{
                axios.put(`/admin/whatnews/${id}`,{
                    title: this.title,
                    body:this.body,
                    is_public:this.is_public
                })
                    .then(res=>{
                        alert(res.data.msg);
                        setTimeout(()=>{
                            location.reload();
                        },2500);
                    }).catch(err => {
                        //console.log(err.response.data);
                        this.status = `<span class="badge badge-danger">
                            ${err.response.data.message} Error! 
                            please check your form.
                        </span>`;

                    });
            }
        },
        delItem(id){
            axios.delete(`/admin/whatnews/${id}`)
                .then(res=>{
                    //console.log(res.data);
                    alert(res.data.msg);
                    setTimeout(()=>{
                        location.reload();
                    },2500);
                });
        },
        goUrl(where){
            if(where !== null){
                location.href=where;
            }
        },
        isActive(label){
            let st = "";
            if(label == true){
                st = "active";
            }
            return st;
        },
        getPreview(get){
            //console.log("v-on call now");
            if(get === 'show'){
                this.show_preview = true;
            }else{
                this.show_preview = false;
            }
        },

    }
}
</script>
