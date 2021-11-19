<template>
    <div class="container">
        <div class="card card-body"
            v-for="cm in commentPostAll.data">

            <div class="row">
                <div class="col-lg-12" v-for="comment in cm.comments">
                   <h4 class="mb-2 text-center ">{{comment.comment_title}}</h4>

<!-- ====== detail info user name ,posted time START ====================== -->
                   <div class="row">
                       <div class="col-md-4">
                            <span>
                                <b-icon icon="person"></b-icon>
                                {{comment.user.name}}
                            </span>

                       </div>
                   </div> <!-- end of div.row info -->
<!-- ====== detail info user name ,posted time END   ====================== -->
                    <div class="pt-2 mt-4" v-html="comment.comment_body">
                        {{comment.comment_body}}
                    </div>


                </div>
            </div><!-- end of div.row comment -->

<!--

            <div class="card card-body pt-4 show_info"
                v-for="re in cm.reply">
                <div v-html="re.reply_body" class="pt-4">
                    {{re.reply_body}}
                </div>
-->

<!--
                <div class="clearfix">
                    <div class="float-right">
                        <span>
                            <b-icon icon="person"></b-icon>
                            {{re.user.name}}
                        </span> &middot;
                        <span>
                            <b-icon icon="envelope"></b-icon>
                            {{re.user.email}}
                        </span> &middot;
                        <span>
                            <b-icon icon="calendar2-date"></b-icon>
                            {{moment(re.created_at)}}
                        </span> &middot;
                        <span>
                            <b-icon icon="clock-history"></b-icon>
                            {{moment(re.created_at).fromNow()}}
                        </span> &middot;
                        <button class="btn btn-outline-danger btn-sm"
                            @click.prevent="delSub(re.id)">
                            <b-icon icon="trash"></b-icon>
                        </button>
                    </div>
                </div>  end of div.clearfix -->
<!--

            </div>
-->
            <div class="line"></div>

            <div>
                <div class="reply_form"
                    v-if="replyItem[cm.id]"
                    >
                    <jodit-editor
                        v-model="replyMsg"
                        height="350"></jodit-editor>

                    <span class="mt-6 mb-4 mr-4" v-html="res_status">
                        {{res_status}}
                    </span>
                </div>
                <div class="btn-group" v-else>
                    <button 
                        class="btn btn-outline-info btn-sm"
                        @click="showReplyForm(cm.id)">
                        show reply form
                    </button>
                </div>
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

        <!-- ================== pagination ============ -->
        
       <div style="margin-top:2em;">

                <div class="nav-scroller py-1 mb-2" v-show="showPagination">
                    <nav class="nav d-flex justify-content-center">
                        <ul class="pagination flex-wrap">
                            <li class="page-item disabled">
                                <div class="page-link">
                                    showing from {{commentPostAll.from}}
                                    to <span>{{commentPostAll.to}}</span> of
                                    <span>{{commentPostAll.total}}</span>
                                </div>
                            </li>
                            <li class="page-item" v-for="li in commentPostAll.links">
                                <a class="page-link p-2" href="" v-html="li.label"
                                    v-if="!li.active && li.url != null"
                                    @click.prevent="$emit('getCommentAll',li.url)">
                                    {{li.label}}
                                </a>
                                <span class="page-link active"
                                    v-html="li.label" v-else>
                                    {{li.label}}
                                </span>
                            </li>
                            <li class="page-item active">
                                <span class="page-link ">
                                    <b-icon icon="book-half"></b-icon>
                                    {{commentPostAll.current_page}}
                                </span>
                            </li>
                        </ul>
                    </nav>
                </div>

       </div>
        <!-- ================== pagination ============ -->
    </div>
</template>

<script>

import JoditEditor from 'jodit-vue'
var moment = require('moment')
export default{
    name:"PostCommentList",
    props:["commentPostAll","showPagination"],
    data(){
        return{
            moment:moment,
            replyItem:[],
            replyMsg:'',
            bReply:true,
            res_status:'',
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
                    this.res_status = res.data.msg

                })

            setTimeout(()=>{
                this.res_status = ''
                this.hideReplyForm()
                this.$emit("getCommentAll")
            },3200)
        }
    }
}
</script>
