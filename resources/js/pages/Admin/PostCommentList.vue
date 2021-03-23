<template>
    <div class="container">
        <div class="card card-body"
            v-for="cm in commentPostAll">
            <div class="float-right">
                <button 
                    @click.prevent="getDel(cm.id)"
                    class="btn btn-danger close">&times;</button>
            </div>
            <div>
                <ul>
                    <li>{{cm.user.name}}</li>
                    <li>{{cm.user.email}}</li>
                    <li>{{moment(cm.created_at)}}</li>
                    <li>{{moment(cm.created_at).fromNow()}}</li>
                    
                </ul>
            </div>
            <div v-html="cm.comment_msg">
                {{cm.comment_msg}}
            </div>
            <div class="card card-body show_info"
                v-for="re in cm.reply">
                <div class="float-rig">
                    <button class="btn btn-danger close"
                        @click.prevent="delSub(re.id)">&times;</button>
                </div>
                <div v-html="re.reply_body">
                    {{re.reply_body}}
                </div>
                <ul>
                    <li>{{re.user.name}}</li>
                    <li>{{re.user.email}}</li>
                    <li>{{moment(re.created_at)}}</li>
                    <li>{{moment(re.created_at).fromNow()}}</li>
                </ul>
            </div>
            <div class="line"></div>

            <div>
                <div class="reply_form"
                    v-if="replyItem[cm.id]"
                    >
                    <jodit-editor
                        v-model="replyMsg"
                        height="350"></jodit-editor>

                </div>
                <button v-else
                    class="btn btn-outline-info btn-sm"
                    @click="showReplyForm(cm.id)">
                    show reply form
                </button>
            </div>
            <div class="clearfix">
                <div class="float-right">
                    <button 
                        v-if="replyItem[cm.id]"
                        :disabled="bReply"
                        @click.prevent="sentReply(cm.id)"
                        class="btn btn-outline-primary btn-sm">
                        Reply
                    </button>
                    <button class="btn btn-outline-warning btn-sm"
                        v-if="bReply == false && replyItem[cm.id]"
                        @click.prevent="hideReplyForm(cm.id)">
                        Cancle
                    </button>
                    <button class="btn btn-outline-primary btn-sm"
                        @click.prevent="getReply(cm.id)">edit comment</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card-body{
    margin-top:1em;
}
.reply_form{
    margin-bottom:1em;
}

.show_info{
    color:#007bff;
    font-weight:bold;
}
.show_info ul,li{
    display:inline-block;
}


@media only screen and (max-width: 480px){
    .show_info ul,li{
        display:block;

    }

}

</style>

<script>

import JoditEditor from 'jodit-vue'
var moment = require('moment')
export default{
    name:"PostCommentList",
    props:["commentPostAll"],
    data(){
        return{
            moment:moment,
            replyItem:[],
            replyMsg:'',
            bReply:true,
        }
    },
    methods:{
        getReply(id){
            this.$emit("getReply",id)
        },
        getDel(id){
            if(confirm(`You are going to remove ${id}`) == true){
                alert('delete')
                //this.$emit("getDel",id)
            }else{
                alert('not del')
            }
        },
        delSub(id){
            if(confirm(`are your sure you want to remove ${id}` )== true){
                this.$emit("delSub",id)
            }else{
                return false
            }
        },
        showReplyForm(id){
            this.bReply = false
            this.$set(this.replyItem,id,true)
        },
        hideReplyForm(id){
            this.bReply = true
            this.replyMsg = ''
            this.replyItem = []
            this.$set(this.replyItem,id,false)
        }
        ,sentReply(id){
            let url = `/admin/sentReply`
            let data = {
                comment_id:id,
                reply_body:this.replyMsg
            }
            axios.post(url,data)
                .then(res=>{
                    //console.log(res.data.msg)
                    this.hideReplyForm()
                    this.$emit("getCommentAll")
                })
        }
    }
}
</script>
