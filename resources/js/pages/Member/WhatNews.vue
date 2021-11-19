<template>
  <div>

    <whatnews-form 
      :editId="editId"
      @getWhatnews="getWhatnews($event)"
      :templates="templates"></whatnews-form>
    <whatnews-list 
      @wnEdit="wnEdit($event)"
      @wnDel="wnDel($event)"
      @wnRead="wnRead($event)"
      @getWhatnews="getWhatnews($event)"
      :whatnews="whatnews" 
      :user_id="user_id"></whatnews-list>

    <b-modal title="message box"
        ref="onOk"
        ok-only>
      <div v-html="res_status">
        {{res_status}}
      </div>
    </b-modal>
  </div>
</template>


<script>

import WhatnewsList from './WhatNewsList.vue'
import WhatnewsForm from './WhatNewsForm.vue'
export default{
  name:"WhatnewsMember",
  props:["templates","user_id"],
  components:{
    WhatnewsForm,
    WhatnewsList
  },
  data(){
    return{
      whatnews:[],
      editId:0,
      res_status:''
    }
  },
  mounted(){
    this.getWhatnews()
  },
  methods:{
    getWhatnews(page){
      this.editId = 0
      let url = ''
      if(page){
        url = page
        this.$cookies.set("old_whatnews_page",url)
      }
      url = this.$cookies.get("old_whatnews_page")
      if(!url){
        url = `/member/whatnews`
      }
      axios.get(url)
        .then(res=>{
          this.whatnews = res.data.whatnews

        })
    },
    wnRead(id){

      //this.$bvModal.hide('showBox')
      let url = `/member/wnFullRead/${id}`
      location.href=url
    },
    wnEdit(id){
      this.editId = id
    },
    wnDel(id){
      if(confirm(`this will delete ${id}`) == true){
        let url = `/member/whatnews/${id}`
        axios.delete(url)
          .then(res=>{
            this.res_status = res.data.msg
            this.$refs["onOk"].show()
            setTimeout(()=>{
              this.getWhatnews()
            },2500)
          })
      }else{
        return
      }
    },

  }
}
</script>
