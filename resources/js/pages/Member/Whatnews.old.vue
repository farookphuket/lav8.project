<template>

    <div clas="container">
      <div class="col-lg-12 editForm">

        <form>
          <div class="form-group">

          </div>
          <div class="form-group">

            <label for="">title</label>
            <input v-model="title" 
            ref="title" class="form-control" 
            type="text" >
          </div>

            <div class="form-group">
              <jodit-editor
                v-model="body"
                height="350"></jodit-editor>
            </div>

            <!-- div. clearfix START-->
            <div class="clearfix">
              <div class="float-left">

                <label class="alert alert-warning">
                  <input v-model="is_public" 
                  class="" 
                  type="checkbox">
                is public</label>
                <span class="alert alert-success"
                  v-if="!is_public === false">
                  Public
                </span>
                <span class="alert alert-warning"
                  v-else>Not Public</span>
              </div><!-- div.float-left END -->
                <div class="float-right">
                  <button class="btn btn-primary"
                    @click.prevent="saveWhat(editId)">
                    Save
                  </button>
                </div><!-- div.float-right END-->
            </div><!-- div.clearfix END-->

        </form>

        <b-modal ref="onOk" 
          @ok="clearForm"
          title="message response from server" ok-only>
          <div class="text-center"
               v-html="res_status">{{res_status}}</div>
        </b-modal>

      </div>
      <div class="show_preview">
        <h1 class="text-center">{{title}}</h1>

        <div v-html="body">{{body}}</div>
      </div>
      <div class="col-lg-12 show_whatnews"
           id="show_whatnews"
        ref="show_whatnews"
        v-show="show_whatnews">
        <div class="clearfix">
          <div class="float-right">
            <button class="btn btn-danger"
              @click="show_whatnews = false">x</button>
          </div>
        </div>
        
        <div v-html="show_body">
          {{show_body}}
        </div>
        <p style="page-bottom:10px;">&nbsp;</p>
        <div class="text-center">
          <button class="btn btn-primary"
            @click="goUrl(show_url_id)">Read Full Post</button>
          <button class="btn btn-danger"
            @click="show_whatnews = false">Close</button>
        </div>
        <hr>
        
      </div>

      
      <what-news-list
        :wnlist="wnlist"
        @goRead="goRead($event)"
        @getEdit="getEdit($event)"
        @goToPage="getWhatNewsList($event)"
        @getDel="getDel($event)"></what-news-list>

    </div>
</template>

<style scoped>


.show_whatnews{
  margin-top:10em;
}
.post-list{
  padding-top:2.5em;
}


</style>


<script>

var moment = require('moment');

//import WhatNewsForm from './WhatNewsForm.vue'
import WhatNewsList from './WhatNewsList.vue'

import 'jodit/build/jodit.min.css';
import {JoditEditor} from 'jodit-vue';

export default{

  components:{
  //  WhatNewsForm,
    WhatNewsList
  },
  data(){
    return{
      moment: moment,
      is_public: '',
      title:'',
      body:'',
      editId:'',
      wnlist:'',
      res_status:'',
      error:'',
      error_msg: [],
      show_whatnews:false,
      show_body:'',
      show_url_id:0
    }
  },
  mounted(){
    //alert('test')
    this.getWhatNewsList();
    this.error = false
  },
  methods:{
    
    getWhatNewsList(page){
      let url = ``

      if(page){
        url = page
        this.$cookies.set("old_wn_page",url)
      }
      url = this.$cookies.get("old_wn_page")
      if(!url){
        url = `/member/whatnews`
      }
      axios.get(url)
        .then(res=>{
          this.wnlist = res.data.whatnews;
          //console.log(this.wnlist)
        })
        .catch(err =>{
          this.error = 1
          this.error_msg = err.response.message

        })
    },
    goRead(id){
      let url = `/member/whatnews/${id}`
      axios.get(url)
        .then(res=>{
          //console.log(res.data)
          this.show_url_id = res.data.whatnews.id
          this.show_whatnews = true
          this.show_body = res.data.whatnews.whatnews_body
          this.$nextTick(()=>this.$refs.show_whatnews.scrollIntoView(true))
        })
    },
    goUrl(id){
      let url = `/member/wnFullRead/${id}`
      location.href=url
    },
    getEdit(id){
      let url = `/member/whatnews/${id}/edit`
      axios.get(url)
        .then(res=>{
          console.log(res.data)
          //this.title = res.data.whatnews.whatnews_title
          let rData = res.data.whatnews;
          this.title = rData.whatnews_title;
          this.body = rData.whatnews_body
          this.is_public = rData.is_public
          if(this.is_public !== '1'){
            this.is_public = false
          }
          this.editId = rData.id
          this.$refs.title.focus()
        })
    },
    saveWhat(id){
      let url = ''
      let data = {
        whatnews_title:this.title,
        whatnews_body:this.body,
        is_public:this.is_public
      }
      if(id){
        url = `/member/whatnews/${id}`
        axios.put(url,data)
          .then(res=>{
            this.res_status = res.data.msg
            this.$refs["onOk"].show()
          }).catch(err=>{
            this.error = true
          })

        setTimeout(()=>{this.getWhatNewsList()},2500)
      }else{
        url = `/member/whatnews`
        axios.post(url,data)
          .then(res=>{
            this.res_status = res.data.msg
            this.error = false
          })
          .catch(err=>{
            this.error = true
            this.error_msg = `<span class="alert alert-danger">
             ${err.message} : Check your input!</span> `
            this.res_status = this.error_msg

          })
        setTimeout(()=>{
          this.getWhatNewsList()
        },2500)

      }
      this.showModal()
    },
    showModal(){
      this.$refs["onOk"].show()
    },
    clearForm(){

      if(this.error !==false){
        this.res_status = `<span class="alert alert-danger">
          Error! please check your input! ${this.error_msg}</span>`
      }else{
        this.title = '';
        this.body ='';
        this.is_public = false
      }

    },
    getDel(id){
      let url = `/member/whatnews/${id}`
      axios.delete(url)
        .then(res=>{
          this.res_status = res.data.msg
        })

      this.showModal()
      setTimeout(()=>{this.getWhatNewsList()},2500)
    },
  }

}


</script>


