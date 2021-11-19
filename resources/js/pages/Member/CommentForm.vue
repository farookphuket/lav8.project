<template>
    <div>
        <form action="" style="margin-top:2em;" @submit.prevent="save(saveId)">
            <div class="form-group">
                <input v-model="cForm.comment_title" class="form-control" 
                type="text" name="comment_title" 
                placeholder="Comment Title">
                <input type="hidden" name="post_id" v-model="cForm.post_id">
            </div>
            <div class="form-group">
               <jodit-editor height="450" 
                   v-model="cForm.comment_body" 
                   placeholder="please respect the community"></jodit-editor>
            </div>

            <div class="row">
                <div class="col-lg-6">
                    <span v-html="res_status">{{res_status}}</span>
                </div>
                <div class="col-lg-6">
                    <div class="float-right">
                        <button class="btn btn-outline-primary" 
                            type="submit">
                            <b-icon icon="pencil"></b-icon>
                        </button>

                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import JoditEditor from 'jodit-vue'
export default{
    name:"CommentForm",
    props:["post_id"],
    data(){
        return{
            editId:'',
            res_status:'',
            saveId:'',
            cForm:new Form({
                comment_title:'',
                comment_body:'',
                post_id:this.post_id,
            }),
        }
    },
    mounted(){

    },
    methods:{
        save(id){
            let url = ''

            if(id){

            }else{
                url = `/member/comments`
                this.cForm.submit('post',url)
                    .then((res)=>{
                        this.res_status = res.msg
                        console.log(res)
                    })
                    .catch((err)=>{
                        let ob = Object.values(err)
                        this.res_status = `<span class="alert alert-danger">
                            ${ob.join()}</span>`
                    })
            }
            setTimeout(()=>{
                this.res_status = ''
                this.$emit('getPostComment')
            },3200)
        },
    },
}
</script>
