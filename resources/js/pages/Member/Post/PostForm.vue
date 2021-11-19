<template>

  <div>
    <b-tab title="Add or Edit my post" @click.prevent="$emit('getMyPost')">

        
        <div class="mt-4 mb-4">

            <form>
              <div class="form-group">
                <select class="form-control" ref="getTemplate" 
                  @change.prevent="setTemplate">
                  <option value="0">-- Select Template --</option>
                  <option :value="li.id" v-for="li in templates">
                  {{li.title}}
                  </option>
                </select>
              </div>
              <div class="form-group">
                <input v-model="title" placeholder="Enter the title"
                  v-on:keyup="setSlug(title)" ref="title"
                class="form-control" type="text">
              </div>
              <div class="form-group">
                <input v-model="slug" placeholder="leave this field blank"  
                class="form-control" type="text">
              </div>
              
              <div class="form-group">
                <jodit-editor v-model="excerpt"
                      height=550 placeholder="Enter excerpt"></jodit-editor>
              </div>
              <div class="form-group">
                <jodit-editor v-model="body"
                  height=550></jodit-editor>
              </div>
                  <div class="form-group">
                    <label for="">Select tag (Hold "Ctrl" key to select multiple
                      "Ctrl+a" to select all)
                    </label>
                    <select multiple="true" ref="tags"  
                      v-model="tags" class="form-control">
                      <option  
                      :value="li.id" v-for="li in tag_all">
                      {{li.id}} -  {{li.tag_name}}
                      </option>
                    </select>

                  </div>
                  <div class="col-lg-12">
                    <p>&nbsp;</p>
                  </div>
                  <div class="row">
                    <div class="col-md-4">
                      <span v-html="res_status">{{res_status}}</span>
                    </div>

                    <div class="col-md-4">
                          <div class="form-group">
                            <input v-model="new_tag" class="form-control" type="text" 
                        placeholder="Create new tag">
                          </div>
                    </div>

                    <div class="col-md-4">
                      <div class="clearfix">
                          <div class="float-left">
                              <label for="">
                                <input v-model="is_public" type="checkbox" 
                                class="form-control">
                                <span class="badge badge-warning"
                                      v-if="is_public == false">Private</span>
                                <span class="bage badge-success" v-else>Public</span>
                              </label>
                          </div>

                          <div class="float-right">
                              <button class="btn btn-outline-primary btn-sm" 
                                  @click.prevent="postSave(saveId)"
                                >save</button>
                              <button class="btn btn-outline-danger btn-sm" 
                                @click.prevent="clearFormData">Clear</button>
                          </div>

                      </div>
                    </div>
                  </div>

            </form>
        </div>
        <!-- end form area -->

    </b-tab>
    <b-modal title="server said :" ref="onOk" centered @ok="closeBox"
      ok-only>
      <div v-html="res_status">
        {{res_status}}
      </div>
    </b-modal>
  </div>
</template>


<script>
import JoditEditor from 'jodit-vue'
export default{
  name:"PostForm",
  props:["editId","templates","tag_all"],
  data(){
    return{
      title:'',
      slug:'',
      excerpt:'',
      body:'',
      tags:[],
      is_public:'',
      saveId:0,
      new_tag:'',
      error:0,
      res_status:'',
      show_form:false,
      btnLabel:'new post'
    }
  },
  watch:{
    "editId":function(x){
      this.getEditData(x)
    }
  },
  mounted(){
        this.$emit("getPosts")
  },
  methods:{
    toggle(id){
      if(id){
        this.btnLabel = 'show edit'
      }else{
        this.btnLabel = 'new post'

      }    
      this.show_form = !this.show_form
    },
    getEditData(id){
      this.user_select_tag = []
      this.is_public = false
      this.btnLabel = 'Close'
      this.show_form = true
      if(!id){
        return
      }
      let url = `/member/posts/${id}/edit`
      axios.get(url)
        .then(res=>{
          let fData = res.data.post
          fData.tags.forEach((val)=>{
            this.tags.push(val.id)
          })
          if(fData.is_public != '0'){
            this.is_public = true
          }
          this.slug = fData.slug
          this.title = fData.post_title
          this.$refs.title.focus()
          this.excerpt = fData.post_excerpt
          this.body = fData.post_body
          this.saveId = fData.id

        })
    },
    postSave(id){
      let url = ''
      let data = {
        title:this.title,
        slug:this.slug,
        excerpt:this.excerpt,
        is_public:this.is_public,
        new_tag:this.new_tag,
        body:this.body,
        tags:this.tags
      }
      if(id){
        url = `/member/posts/${id}`
        axios.put(url,data)
          .then(res=>{
            this.res_status = res.data.msg
            this.error = 0
          },err=>{
            this.error = 1
            this.res_status = `<span class="badge badge-danger">
              ${err.response.data.message}</span>`
          })
      }else{
        axios.post(url,data)
          .then(res=>{
            this.res_status = res.data.msg
            this.error = 0
          },err=>{
            this.error = 1
            this.res_status = `<span class="badge badge-danger">
              ${err.response.data.message}</span>`
          })
      }
      this.$refs["onOk"].show()
    },
    setTemplate(){
      let tm = this.$refs.getTemplate.value
      this.templates.forEach((val)=>{
        if(tm == val.id){
          this.excerpt = val.excerpt
          this.title = val.title
          this.body = val.body
        }
      })
      setTimeout(()=>{
        this.$refs.getTemplate.value = 0
      },2000)
    },
    setSlug(slug){
      this.slug = slug.replace(/\s+/g,"-") /* replace space with - */
      .replace(/[^\u0E00-\u0E7F\w\-]+/g,"") /* replace Thai letter */
      .replace(/\-\-+/g,"-") /* replace -- to - */
      .replace(/^-+/,"") /* I don''t know */
      .replace(/_/g,"") /* replace _ with null */
      .toLowerCase() /* convert to lowoer case */
      return this.slug
    },
    clearFormData(){
      this.saveId = 0
      this.is_public = false
      this.excerpt = ''
      this.body = ''
      this.title = ''
      this.new_tag = ''
      this.tags = []
      this.slug = ''
      setTimeout(()=>{
        this.$emit('getPosts')
      },2500)
    },
    closeBox(){
      setTimeout(()=>{this.res_status = ''},3000)
      if(this.error != 0){

        return
      }else{
        this.clearFormData()
        
        this.$emit('getPosts')
      }

    },
  },
}
</script>
