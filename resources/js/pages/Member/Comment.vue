<template>


  <div>

    <div class="comment-main">
      <h1 class="text-center">leave a Comment </h1>

      <form action="">
        <div class="form-group">
          <jodit-editor
            height=350
            v-model="comment"></jodit-editor>
          
        </div>

        <div class="clearfix">
          <div class="float-right">
            <button class="btn btn-primary"
              @click.prevent="sentComment(editId)">
              Save
            </button></div>
        </div>
      </form>
    </div>

    <b-modal
      title="response message :"
      ref="onOk"
      @ok="modClose"
      ok-only>
      <div v-html="res_status">
        {{res_status}}
      </div>
    </b-modal>

  <!-- comment list will wrap in div.container -->
    <comment-list 
      @delMyComment="delMyComment($event)"
      :comments="comments"
      @rePlyTo="rePlyTo($event)"
      ></comment-list>
  <!-- comment list will wrap in div.container -->

  </div>
</template>

<style scoped>
.comment-main{
  padding:0;
  margin-top:50px;
  margin-bottom:50px;
}

@media only screen and (max-width: 480px){

    .comment-main{
      padding:0;
      margin-top:90px;
    }

}

</style>
<script>
import CommentList from './CommentList.vue'
import JoditEditor from 'jodit-vue'
export default{
  name:"Comment",
  props:["post"],
  components:{
    CommentList,
  },
  data(){
    return{
      editId:0,
      comment:'',
      post_id:this.post.id,
      comments:[],
      res_status:'',


    }
  },
  mounted(){
    this.getCommentList()
  },
  methods:{

    sentComment(id){
      let url = ""
      let data = {
        comment:this.comment,
        post_id:this.post_id
      }
      if(id){

      }else{
        url = `/member/comments`
        axios.post(url,data)
          .then(res=>{
            this.res_status = res.data.msg
            this.$refs["onOk"].show()
          })
          .catch(err=>{
            alert('Error ! please check your input')
            
          })

      }
    },
    getCommentList(page){
      let url = `/member/getPostComment/${this.post_id}`;
      axios.get(url)
        .then(res=>{
          this.comments = res.data.comments
        })
    },
    modClose(){

      this.comment = ''
      this.getCommentList()
    },
    rePlyTo(id){
    //  alert('cool!')
      this.getCommentList()
    },
    delMyComment(id){
      let url = `/member/comments/${id}`
      axios.delete(url)
        .then(res=>{
          this.res_status = res.data.msg
        })
      this.$refs["onOk"].show()
    },


  }

}

</script>
