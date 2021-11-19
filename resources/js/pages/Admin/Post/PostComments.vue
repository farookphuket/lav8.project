<template>

    <div class="contaniner-fluid">

        <div class="container">

<!-- === form START ======================================================= -->
            <div class="mt-2 mb-4" v-show="isEdit">

                <form action="">
                    <div class="form-group">
                        <input v-model="title" class="form-control" 
                        type="text" name="title" ref="title" 
                        placeholder="Enter the title (required)">
                    </div>
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
                            @click.prevent="saveReply(cmId)">
                            Update User Comment</button>
                    </div>
                </div>
            </div>
<!-- === form END ======================================================= -->
        </div>
        <div class="col-lg-12 mb-4">&nbsp;</div>
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
                 :showPagination="showPagination"
            :commentPostAll="commentPostAll"></post-comment-list>
    </div>
</template>


<script>
import JoditEditor from 'jodit-vue'
import PostCommentList from './PostCommentList.vue'
export default{
    name:"AdminPostComment",
    props:["post_id"],
    components:{
        PostCommentList
    },
    data(){
        return{
            commentPostAll:[],
            comment:'',
            title:'',
            cmId:0,
            showPagination:false,
            res_status:'',
            hasClick:true,
            isEdit:false,
        }
    },
    mounted(){
        this.getCommentAll()
    }
    ,methods:{
        getCommentAll(page){

            this.isEdit = false

            let url = ''
            if(page){
                url = page
                this.$cookies.set("acomment_old",url)
            }
            url = this.$cookies.get("acomment_old")
            if(!url){
                url = `/admin/getCommentPost/${this.post_id}`
            }

            axios.get(url)
                .then(res=>{
                   //console.log(res.data)
                    this.commentPostAll = res.data.comments


                })
        },
        getReply(id){
            if(id != 0){
                this.isEdit = true
                let url = `/admin/comments/${id}`
                axios.get(url)
                    .then(res=>{
                        this.title = res.data.comment.comment_title;
                        this.$refs.title.focus() 
                        this.comment = res.data.comment.comment_body;
                        this.cmId = res.data.comment.id
                        this.hasClick = false
                    })
            }
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

            setTimeout(()=>{
                this.getCommentAll()
                    },3200);
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
