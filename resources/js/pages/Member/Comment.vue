<template>
    <div style="margin-top:2em;" class="card">
        <div class="card-header">
            <h2 class="card-title">new comment</h2>
        </div>

        <comment-form :post_id="post_id" 
            ></comment-form>
    </div>

</template>

<script>
import CommentForm from './CommentForm.vue'
export default{
    name:"CommentMember",
    props:["post_id"],
    components:{
        CommentForm,
    },
    data(){
        return{
            comments:'',

        }
    },
    mounted(){
        this.getPostComment()
    },
    methods:{
        getPostComment(page){
            let url = ''
            if(page){
                url = page+"?post_id="+this.post_id
            }
            url = `/member/getPostComment?post_id=${this.post_id}`
            axios.get(url)
                .then(res=>{
                    console.log(res)
                })
        },
    },
}
</script>
