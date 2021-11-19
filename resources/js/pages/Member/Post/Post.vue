<template>
  <div class="row">
        <!-- div.col-lg-12 change layout on 29 Oct 2021 START -->
        <div class="col-lg-12">

            <b-tabs>

                <post-list :posts="posts" :ownerid="ownerid" :my_post="my_post"
                  @getPosts="getPosts($event)"
                  @getMyPost="getMyPost($event)" 
                  :isShowMyPostPagination="isShowMyPostPagination"
                  :isShowPostPagination="isShowPostPagination"
                  @postEdit="postEdit($event)"
                  @postDel="postDel($event)"
                  @postRead="postRead($event)"
                  :tag_with_content="tag_with_content"></post-list>

              <post-form :editId="editId" :tag_all="tags" :templates="template"
                 @getMyPost="getMyPost($event)" ></post-form>



            </b-tabs>
        </div>
        <!-- div.col-lg-12 END change layout on 29 Oct 2021 START -->


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
export default{
  name:"Post",
  props:["ownerid","template"],
  components:{
    PostList,
    PostForm,
  },
  data(){
    return{
      posts:[],
      tag_with_content:[],
      tags:[],
      editId:0,
      res_status:'',
      error:0,
      my_post:'',
      isShowMyPostPagination:false,
      isShowPostPagination:false,
    }
  },
  mounted(){
    this.getPosts()
    this.getMyPost()
  },
  methods:{
    getPosts(page){
        this.isShowMyPostPagination = false
        this.isShowPostPagination = false
      this.editId = 0
      let url = ''
      if(page){
        url = page
        this.$cookies.set("old_post_page",url)
      }
      url = this.$cookies.get("old_post_page")
      if(!url){
        url = `/getpost`
      }

      axios.get(url)
        .then(res=>{
          let rData = res.data
          let po_length = rData.posts.total 
          let per_page = rData.posts.per_page

          if(po_length > per_page) this.isShowPostPagination = true
          this.posts = rData.posts
          this.tag_with_content = rData.tag_with_content
          this.tags = rData.tag_all
        },err=>{
          alert('Error in page please try again later')
          return
        })
    },
    getMyPost(page){
       this.isShowMyPostPagination = false 
      this.editId = 0
      let myPost_length = 0

      let url = ''
      if(page){
        url = page
        this.$cookies.set("my_post_page",url)
      }
      url = this.$cookies.get("my_post_page")
      if(!url){
        url = `/member/getPosts`
      }

      axios.get(url)
        .then(res=>{
          let rData = res.data
          //this.posts = rData.posts
          let my_length = rData.posts.total
          this.my_post = rData.posts
            if(my_length > rData.posts.per_page) this.isShowMyPostPagination = true

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
        alert(`data has load and ready to edit \nplease click on "Add or Edit my post" tab`)
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
