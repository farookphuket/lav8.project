<template>

    <div class="contaniner-fluid">
        

        <div class="container">
            <form action="" class="mb-4">
                <div class="form-group">
                    <input v-model="title" class="form-control" 
                    type="text" name="title">
                </div>
                <div class="form-group">
                    <jodit-editor
                        v-model="comment"
                        height=550></jodit-editor>
                </div>
            </form>
            <div class="clearfix mb-4">
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

        <comment-list 
        @getCommentAll="getCommentAll($event)"
         @getReply="getReply($event)" :showPagination="showPagination"
         @getDel="getDel($event)"
                 @delSub="delSub($event)"
            :commentPostAll="commentPostAll"></comment-list>
    </div>
</template>


<script>
import JoditEditor from 'jodit-vue'
import CommentList from './CommentList.vue'
export default{
    name:"AdminComment",
    components:{
        CommentList,
    },
    data(){
        return{
            commentPostAll:[],
            showPagination:false,
            comment:'',
            title:'',
            cmId:0,
            res_status:'',
            hasClick:true
        }
    },
    mounted(){
        this.getCommentAll()
    }
    ,methods:{
        getCommentAll(page){
            let url = ''
            if(page){
                url = page
                this.$cookies.set("acomment_old",url)
            }
            url = this.$cookies.get("acomment_old")
            if(!url){
                url = `/admin/getPostCommentAll`
            }

            axios.get(url)
                .then(res=>{
              //     console.log(res.data)
              //     console.log("this is Comment file")
                    this.commentPostAll = res.data.comments


                })
        },
        getReply(id){
            let url = `/admin/comments/${id}`
            axios.get(url)
                .then(res=>{
                    this.title = res.data.comment.comment_title;
                    this.comment = res.data.comment.comment_body;
                    this.cmId = res.data.comment.id
                    this.hasClick = false
                })
            window.scrollTo(0,0)
        },
        saveReply(id){
            let url = `/admin/comments/${id}`
            let data = {
                comment_title:this.title,
                comment_body:this.comment,
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
            this.title = ''
            this.comment = ''
            this.cmId = 0
            this.hasClick = 0
        },
    }
}
</script>
