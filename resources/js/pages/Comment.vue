<template>
<div>

        <div class="card-body" v-if="objNum == 0">
            <div class="container">
                <h2 class="text-center">There is no comment yet!</h2>
                <div class="row">
                    <div class="col-lg-8">
                        <p>
                            be the first to give this post comment?
                        </p>
                    </div>
                    <div class="col-lg-4">
                        <login-form></login-form>
                    </div>
                </div>

            </div>
        </div>
    <div v-else
        class="card" v-for="co in comments.data" style="margin-top:1em;">
        <div class="card-header">
            <h3 class="text-center card-title">{{co.comment_title}}</h3>
        </div>
       <div class="card-body">
            <div v-html="co.comment_body">{{co.comment_body}}</div>

       </div>
       <div class="card-footer">
            <div class="row">
                <div class="col-md-10">
                    <span>{{co.created_at}}</span>
                </div>
                <div class="col-md-2">
                    <span class="float-right">
                        <b-icon icon="person"></b-icon>
                        <a href="" :title="co.ip">
                            {{co.name}}
                        </a>

                    </span>
                </div>
            </div>
       </div>
    </div>

    <!-- ============= pagination =========== -->
    <div style="margin-top:2em;" v-show="isShow">

                <div class="nav-scroller py-1 mb-2">
                    <nav class="nav d-flex justify-content-center">
                        <ul class="pagination flex-wrap">
                            <li class="page-item disabled">
                                <div class="page-link">
                                    showing from {{comments.from}}
                                    to <span>{{comments.to}}</span> of
                                    <span>{{comments.total}}</span>
                                </div>
                            </li>
                            <li class="page-item" v-for="li in comments.links">
                                <a class="page-link p-2" href="" v-html="li.label"
                                    v-if="!li.active && li.url != null"
                                    @click.prevent="getPostComments(li.url)">
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
                                    {{comments.current_page}}
                                </span>
                            </li>
                        </ul>
                    </nav>
                </div>

       </div>
    <!-- ============= pagination =========== -->
            <span v-html="res_status">{{res_status}}</span>
</div>
</template>

<script>
export default{
    name:"PubComment",
    props:["post_id"],
    data(){
        return{
            comments:'',
            objNum:0,
            res_status:'',
            isShow:false,
        }
    },
    mounted(){
        this.getPostComments()

    },
    methods:{
        getPostComments(page){
            let url = ''

            // we have to kill some cookies
            this.checkPage()
            this.$cookies.set("cur_post_id",this.post_id)
            if(page){
                url = page+"&post_id="+this.post_id
                this.$cookies.set("pcomment_old_page",url)
            }
            url = this.$cookies.get("pcomment_old_page")
            if(!url){
                url = `/getPostComments?post_id=${this.post_id}`
            }
            axios.get(url)
                .then(res=>{
                    this.comments = res.data.comments

                    this.objNum = Object.keys(this.comments.data).length
                    //console.log(Object.keys(this.comments.data).length)
                    if(Object.keys(this.comments.data).length >= 2){
                        this.isShow = true

                    }

                })
                .catch(err=>{
                    let ob = Object.values(err)
                    this.res_status = `<span class="alert alert-danger">
                        ${ob.join()}</span>`
                })
        },
        checkPage(){
            if(parseInt(this.$cookies.get("cur_post_id")) != this.post_id){
                this.$cookies.set("pcomment_old_page","")
            }
        },

    },
}
</script>
