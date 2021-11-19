<template>
    <div class="container-fluid">
        <div class="card-header">
            <h2 class="card-title">new comment</h2>
        </div>

        <comment-form :post_id="post_id" @getPostComment="getPostComment($event)"
            ></comment-form>
        <comment-list 
            @getPostComment="getPostComment($event)"
            :comments="comments" :owner_id="owner_id" 
            :showPagination="showPagination"
            @del="del($event)"
            ></comment-list>
        <div class="row">
            <div class="col-lg-12" style="margin-top:4em;">
                <div v-html="res_status">{{res_status}}</div>
            </div>
        </div>
    </div>

</template>

<script>
import CommentForm from './CommentForm.vue'
import CommentList from './CommentList.vue'
export default{
    name:"CommentMember",
    props:["post_id","owner_id"],
    components:{
        CommentForm,
        CommentList,
    },
    data(){
        return{
            comments:'',
            res_status:'',
            showPagination:false,
        }
    },
    mounted(){

        this.getPostComment()

    },
    methods:{
        getPostComment(page){
            this.checkPage()
            this.$cookies.set("post_page_id",this.post_id)
            let url = ''
            if(page){
                url = page+"&post_id="+this.post_id
                this.$cookies.set("m_comment_old_page",url)
            }
            url = this.$cookies.get("m_comment_old_page")
            if(!url){
                url = `/member/getPostComment?post_id=${this.post_id}`
            }
            axios.get(url)
                .then(res=>{
                    //console.log(res)
                    this.comments = res.data.comments

                    if(Object.keys(this.comments.data).length >= 10){
                        this.showPagination = true
                    }
                })

        },
        checkPage(){
            let old_page = parseInt(this.$cookies.get("post_page_id"))
            if(old_page != this.post_id){
                this.$cookies.set("m_comment_old_page","")
            }
            console.log(this.$cookies.get("m_comment_old_page"))
        },
        del(id){

            let url = `/member/comments/${id}`
            axios.delete(url)
                .then(res=>{
                    this.res_status = res.data.msg
                })
            setTimeout(()=>{
                this.res_status = ''
                this.getPostComment()
            },3200)
        },
    },
}
</script>
