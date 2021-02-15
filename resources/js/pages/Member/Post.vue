<template>
  <div>
      <post-form :editId="editId" :tag_all="tags" :templates="template"
         @getPosts="getPosts($event)" ></post-form>


    <post-list :posts="posts" :ownerid="ownerid" 
      @getPosts="getPosts($event)"
      @postEdit="postEdit($event)"
      @postDel="postDel($event)"
      @postRead="postRead($event)"
      :tag_with_content="tag_with_content"></post-list>

    <div class="clearfix">
      <div class="float-right">
        <post-tag @getPostsByTagId="getPostsByTagId($event)"
          :tag_with_content="tag_with_content"></post-tag>
      </div>
    </div>

    <b-modal title="server said :" centered ref="onOk" 
        @ok="closeBox"
      ok-only>
      <div v-html="res_status">{{res_status}}</div>
    </b-modal>
  </div>
</template>


<script>
import PostList from './PostList.vue'
import PostForm from './PostForm.vue'
import PostTag from './PostTag.vue'
export default{
  name:"Post",
  props:["ownerid","template"],
  components:{
    PostList,
    PostForm,
    PostTag
  },
  data(){
    return{
      posts:[],
      tag_with_content:[],
      tags:[],
      editId:0,
      res_status:'',
      error:0,
    }
  },
  mounted(){
    this.getPosts()
  },
  methods:{
    getPosts(page){
      this.editId = 0
      let url = ''
      if(page){
        url = page
        this.$cookies.set("old_post_page",url)
      }
      url = this.$cookies.get("old_post_page")
      if(!url){
        url = `/member/getPosts`
      }

      axios.get(url)
        .then(res=>{
          let rData = res.data
          this.posts = rData.posts
          this.tag_with_content = rData.tag_with_content
          this.tags = rData.tag_all
        },err=>{
          alert('Error in page please try again later')
          return
        })
    },
    postRead(slug){
      let url = `/member/posts/${slug}`
      location.href=url
    },
    postEdit(id){
      this.editId = id

    },
    postDel(id){
      if(confirm(`Delete the id ${id} ?`) == true){
        let url = `/member/posts/${id}`
        axios.delete(url)
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
        return
      }
    },
    getPostsByTagId(id){
      let url = `/member/getPostsByTagId?tag=${id}`
      location.href=url
    },
    closeBox(){
      this.getPosts()
    },

  },
}
</script>
