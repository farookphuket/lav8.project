<template>

    <div class="contaniner-fluid">
        

        <div class="container">
            <form action="">
                <div class="form-group">
                    <jodit-editor
                        v-model="comment"
                        height=550></jodit-editor>
                </div>
            </form>
            <div class="clearfix">
                <div class="float-right">
                    <button class="btn btn-outline-primary"
                        v-model="hasClick"
                        :disabled="hasClick"
                        @click.prevent="saveReply(cmId)">Update User Comment</button>
                </div>
            </div>
        </div>
        <b-modal title="Message" ref="onOk" 
           @ok="modClose()"
            ok-only>
            <div v-html="res_status">
                {{res_status}}
            </div>
        </b-modal>

        <post-comment-list 
        @getCommentAll="getCommentAll($event)"
         @getReply="getReply($event)"
         @getDel="getDel($event)"
                 @delSub="delSub($event)"
            :commentPostAll="commentPostAll"></post-comment-list>
    </div>
</template>


<script>
import JoditEditor from 'jodit-vue'
import PostCommentList from './PostCommentList.vue'
export default{
    name:"AdminPostComment",
    components:{
        PostCommentList
    },
    data(){
        return{
            commentPostAll:[],
            comment:'',
            cmId:0,
            res_status:'',
            hasClick:true
        }
    },
    mounted(){
        this.getCommentAll()
    }
    ,methods:{
        getCommentAll(){
            let url = `/admin/getPostCommentAll`
            axios.get(url)
                .then(res=>{
                   // console.log(res.data)
                    this.commentPostAll = res.data.comments
                })
        },
        getReply(id){
            let url = `/admin/comments/${id}`
            axios.get(url)
                .then(res=>{
                    this.comment = res.data.comment.comment_msg;
                    this.cmId = res.data.comment.id
                    this.hasClick = false
                })
            window.scrollTo(0,0)
        },
        saveReply(id){
            let url = `/admin/comments/${id}`
            let data = {
                comment:this.comment,
                id:this.cmId

            }
            axios.put(url,data)
                .then(res=>{
                    this.res_status = res.data.msg
                    this.$refs["onOk"].show()

                })
        },
        getDel(id){
            let url = `/admin/comments/${id}`
            axios.delete(url)
                .then(res=>{
                    this.res_status = res.data.msg
                    this.$refs["onOk"].show()
                })
        },delSub(id){
            let url = `/admin/replies/${id}`
            axios.delete(url)
                .then(res=>{
                    alert(res.data.msg)
                    this.getCommentAll()
                })
        },
        modClose(){
            this.getCommentAll()
            this.comment = ''
            this.cmId = 0
            this.hasClick = 0
        },
    }
}
</script>
