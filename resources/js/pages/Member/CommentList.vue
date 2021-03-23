<template>


  <div class="comment_list">
      <div class="card card-body"
        v-for="cm in comments"
        >
        <div class="clearfix">
          <div class="float-right">
            <p> 
            By 
            <span class="badge badge-info">
              {{cm.user.name}} 
            </span> &middot; 
            <span class="badge badge-info">{{moment(cm.created_at).fromNow()}}</span>


            </p>
          </div>
        </div>

        <div v-html="cm.comment_msg">
          {{cm.comment_msg}}
        </div>
        <div class="card card-body" v-for="re in cm.reply">

          <div v-html="re.reply_body">
              {{re.reply_body}} 
          </div>
          <div class="clearfix show_reply">
            <div class="float-right">
              <span>
                {{re.user.email}}
              </span>
              <span class="badge badge-success">
                {{re.user.name}}  
              </span> &middot;
              <ul>
                <li>
                    <span class="badge badge-info">
                        {{moment(re.created_at).fromNow()}}
                    </span>

                </li>
                <li>IP {{re.ip}}</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="clearfix">
          <div class="float-right"
            v-if="cm.user_id == xuser_id">
            <button 
            @click.prevent="delMyComment(cm.id)"
              class="btn btn-danger btn-sm">
delete 
            </button></div>
            <div v-else
              >
            <div  
              v-if="replyItem[cm.id]">
              <jodit-editor v-model="replyMsg"
                height="350"></jodit-editor>
              <div class="clearfix">
                <div class="float-right">
                  <button class="btn btn-danger"
                    @click="hideForm(cm.id)">Cancle</button>
                  <button class="btn btn-primary"
                    @click="rePlyTo(cm.id)">Reply</button>
                </div>
              </div><!-- end div.clearfix-->
            </div><!-- end div.edit from -->
              <span class="badge badge-info" 
                v-else @click="showForm(cm.id)">
                Reply
              </span>
            </div>
        </div>
      </div><!-- end div.card-body comment-list item-->
  </div>
</template>
<style scoped>

.comment_list{
  margin-bottom:15px;
}
.card-body{
  margin-top:1em;
}

.card-body .card-body{
  margin-top:0;
  margin-bottom:1em;
}
.show_reply{
  color:#6610f2;
  font-weight:bold;
}
.show_reply ul,li{
  margin-top:1em;
  display:inline-block;
}


@media only screen and (max-width: 480px){

  .show_reply ul,li{
    display:block;
  }
}
</style>
<script>

var moment = require('moment')
export default{
  name:"CommentList",
  props:["comments"],

  data(){
    return{
      xuser_id:window.userId,
      canEdit:false,
      showReplyForm:false,
      replyItem:[],
      replyMsg:'',
      oldMsg:[],
      moment:moment
    }
  },
  mounted(){

  },
  methods:{
    delMyComment(id){
      if(confirm(`are you sure to delete`) == true){
        this.$emit("delMyComment",id)
      }
    },
    showForm(id){
     this.$set(this.replyItem,id,true) 
    },
    hideForm(id){
      this.replyMsg = ""
     this.$set(this.replyItem,id,false) 
    },
    rePlyTo(id){
      let post_id = ''
      let data = {
        reply_body:this.replyMsg,
        comment_id:id,
      }
      let url = `/member/replyComment`
      axios.post(url,data)
        .then(res=>{
          this.hideForm()
          this.$emit("rePlyTo",id)
        })
        .catch(err=>{
          alert(`Error! check your input `)
        })
    },

  }



}
</script>
