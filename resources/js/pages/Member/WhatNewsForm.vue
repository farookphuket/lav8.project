<template>
  <div class="wn-form">
    <form action="">
      <div class="form-group">
        <select ref="getTemplate" 
          :disabled="disable"
          class="form-control" @change="setTemplate">
          <option value="0">-- Select template --</option>
          <option v-for="li in templates"
          :value="li.id">
          {{li.title}}
          </option>
        </select>
      </div>
      <div class="form-group">
        <input v-model="title" class="form-control" 
        ref="title" type="text">
      </div>

      <div class="form-group">
        <jodit-editor
          height=550
          v-model="body"
          ></jodit-editor>
      </div>


      <div class="row">
          <div class="col-lg-4">
              <label for="">
                <input v-model="is_public" 
                       class="form-control"
                type="checkbox">
                <span class="badge badge-warning"
                      v-if="is_public == false">
                  No , I don't want to show
                </span>
                <span class="badge badge-success" v-else>
                  Yes, I want to show this post
                </span>
              </label>
          </div>
          <div class="col-lg-4">
              <div v-html="res_status">{{res_status}}</div>
          </div>
          <div class="col-lg-4">
            <div class="float-right">
              <button class="btn btn-outline-primary"
                type="submit" @click.prevent="wnSave(saveId)">
                Save
              </button>
              <button class="btn btn-outline-danger"
                  @click.prevent="clearFormdata">
                Clear
              </button>
            </div>
          </div>
      </div>

    </form>
    <b-modal title="message box"
      ref="onOk"
      @ok="closeBox" ok-only>
      <div v-html="res_status">{{res_status}}</div>
    </b-modal>
  </div>
</template>

<style scoped>
.wn-form{
  margin-bottom:8em;
}
</style>


<script>

import JoditEditor from 'jodit-vue'
export default{
  name:"WhatnewsForm",
  props:["editId","templates"],
  watch:{
    "editId":function(x){
      this.saveId = x
      this.getData(x)
    }

  },
  data(){
    return{
      saveId:0,
      is_public:0,
      disable:false,
      title:'',
      body:'',
      res_status:'',
      error:0
    }
  },
  methods:{
    getData(id){
      let url = `/member/whatnews/${id}`
      axios.get(url)
        .then(res=>{
          let fData = res.data.whatnews
          this.body = fData.whatnews_body
          this.title = fData.whatnews_title
          if(fData.is_public != 0){
            this.is_public = 1
          }else{
            this.is_public = 0
          }
          this.saveId = fData.id

          this.disable = true
          this.$refs.title.focus()
        })
    },
    setTemplate(){
      let tmId = this.$refs.getTemplate.value
      if(tmId == 0){
        this.clearFormdata()
      }else{
        this.templates.forEach((val)=>{
          if(val.id == tmId){
            this.title = val.title
            this.body = val.excerpt
          }
        })

      }
      setTimeout(()=>{
        this.$refs.getTemplate.value = 0
      },2500)
    },
    wnSave(id){
      let url = ''
      let data = {
        whatnews_title:this.title,
        whatnews_body:this.body,
        is_public: this.is_public
      }
      if(id){
        url = `/member/whatnews/${id}`
        axios.put(url,data)
          .then(res=>{
            this.res_status = res.data.msg
            this.error = 0
          },err=>{
            this.error = 1
            this.res_status = `<span class="badge badge-danger">
              ${err.response.data.message}</span>`
          })
          this.$refs["onOk"].show()
      }else{
        url = `/member/whatnews`
        axios.post(url,data)
          .then(res=>{
            this.res_status = res.data.msg
            this.error = 0
          },err=>{
            this.error = 1
            this.res_status = `<span class="badge badge-danger">
              ${err.response.data.message}</span>`
          })
          this.$refs["onOk"].show()
      }
    },
    clearFormdata(){
      this.title = ''
      this.body = ''
      this.saveId = 0
      this.is_public = 0
      this.disable = false
    },
    closeBox(){
      if(this.error == 0){
        this.clearFormdata()
      }else{
        alert(`sorry there are error`)
      }
      this.$emit("getWhatnews")
    },
  }
}
</script>
