<template>

    <div class="col-lg-12">

        <form action="">
            <div class="form-group">
                <label for=""></label>
                <input v-model="tag" ref="tag" 
                class="form-control" type="text"
                v-on:focus="setForm()"
                placeholder="Make new Tag"
                @keypress.enter.prevent="makeTag(tagId)">

            </div>
            <div class="float-right">
                <p v-html="res_status">{{res_status}}</p>
            </div>
        </form>

        <p v-if="show_preview===true && tag ">you will manage tag 
        <span class="badge badge-info">
            {{tag}}
        </span>
            please hit Enter to Save it
        </p>

        <div class="card card-body"
            v-for="tag in tags.data" :tagId="tag.id">
            <h2 class="text-center">
                {{tag.tag_name}}
            </h2>
            <div class="clearfix">
                <div class="float-right">
                    on {{moment(tag.created_at)}} &middot;
                    {{moment(tag.created_at).fromNow()}}
                </div>
            </div>
            <div class="btn-group">
                <button class="btn btn-primary" @click="editTag(tag.id)">edit</button>
                <button class="btn btn-danger" 
                    @click="delTag(tag.id)">Delete</button>
            </div>
        </div>
        <div class="pagination">
            <ul class="pagination">
                <li class="page-item">
                    <span>
                        showing {{tags.from}} to {{tags.to}} 
                        of {{tags.total}}
                    </span>
                </li>
                <li v-for="li in links" 
                    :pageId="li.label"
                    class="page-item">
                    <a href="#" 
                        v-html="li.label"
                        v-bind:class="{active:setActive(li.active)}"
                        @click.prevent="getTags(li.url)"
                        v-if="li.active !== true && li.url !== null">
                    {{li.label}}
                    </a>
                    <span class="badge badge-default" 
                        v-html="li.label" v-else>
                        {{li.label}}
                    </span>
                </li>
                <li class="page-item">
                    <span class="badge badge-info">
                        {{tags.current_page}}
                    </span>
                </li>
            </ul>
        </div>
    </div>

</template>

<style scoped>
.card-body{
    margin-top:1em;
}

.pagination ul,li{
    margin-top:2em;
}
.pagination a{
    padding:8px 16px;
}
.pagination .active{
  font-size:25px;
  font-weight:bold;
  color:red;
}
.pagination span{
    color:blue;
    font-weight:bold;
    background-color:#e7e7e7;
    font-size:18px;
}
</style>


<script>

var moment = require('moment')

export default{

    data(){
        return{
            tags:[],
            tag:'',
            tagId:'',
            old_tag_page: '',
            moment: moment,
            page_label:'',
            links: [],
            res_status:'',
            show_preview:''
        }
    },
    mounted(){
        this.show_preview = false;
        this.tagId = 0;
        this.getTags();
        
    }
    ,methods:{
        setForm(){
            this.show_preview = true;
        }
        ,resetForm(){
            this.show_preview = false;
            this.tag = '';
            this.tagId = 0;
            this.res_status = '';
        }
        ,makeTag(id){
            let url = `/admin/tags`;
            if(id !== 0){
                url = `/admin/tags/${id}`
                axios.put(url,{tag:this.tag,tagId:this.tagId})
                    .then(res=>{
                        this.res_status = res.data.msg;
                        setTimeout(()=>{
                           this.resetForm(); 
                            this.getTags();
                            this.setForm();
                        },2500);
                    })
            }else{

                axios.post(url,{tag:this.tag})
                    .then(res=>{
                        this.res_status = res.data.msg;
                        setTimeout(()=>{
                            this.getTags();
                            this.resetForm();
                            this.setForm();
                        },2500);
                    })
                    .catch(err=>{
                        this.res_status = `<span class="alert alert-danger">
                            Error! check the input! 
                            ${err.response.data.message}</span>`;
                        this.$refs.tag.focus();
                    });
            }
        }
        ,setActive(label){
            let st = "";
            if(label == true){
                st = 'active';
            }

            //console.log(label);
            return st;
        }
        ,getTags(pageUrl){
            this.res_status = '';
            let url = '';
            if(pageUrl){
                url = pageUrl;
                this.$cookies.set("old_tag_page",url);
            }else{
                this.old_tag_page = this.$cookies.get("old_tag_page");
                if(this.old_tag_page === null){
                    url = '/admin/getTags';
                }else{
                    url = this.old_tag_page;
                }
            }
            axios.get(url)
                .then(res=>{
                    this.tags = res.data.tags;
                    this.links = res.data.tags.links;
                })
            

        }
        ,editTag(id){
            let url = `/admin/tags/${id}/edit`;
            axios.get(url)
                .then(res=>{
                    this.tag = res.data.tag.tag_name;
                    this.tagId = res.data.tag.id;
                    this.$refs.tag.focus();
                    //console.log(this.tag);
                });
        }
        ,delTag(id){
            let url = `/admin/tags/${id}`
            axios.delete(url)
                .then(res=>{
                    this.res_status = res.data.msg;
                    setTimeout(()=>{
                        this.setForm();
                        this.getTags();
                    },2500);
                })
        }
    }

}

</script>
