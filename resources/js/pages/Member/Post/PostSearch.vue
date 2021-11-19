<template>
    <div class="row">
        <div class="col-lg-12 mt-4 mb-4">
            <form action="">
                <div class="form-group">
                    <input v-model="sForm.search" class="form-control" 
                    type="text" name="search" ref="search"
                    @keyup.prevent="getSearch"
                    placeholder="Search blog post...">
                </div>
            </form>
        </div>
        <div class="col-lg-12 mt-4 mb-4" v-for="po in search_result.data" 
        v-show="isShowSearchResult">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">
                    <a href="" @click.prevent="$emit('postRead',po.slug)">
                        {{po.post_title}}
                        <b-icon icon="arrow-up-right-circle"></b-icon>
                    </a>
                    </h3>
                </div>
                
                <div class="card-body">
                    <div v-html="po.post_excerpt">{!!po.post_excerpt!!}</div>     
                </div>
                <div class="card-footer">
                    <!-- div.row show user and view START -->
                    <div class="row">
                        <div class="col-md-4">
                            <span>
                                <b-icon icon="eye"></b-icon>
                                    read {{po.read_count}} time(s).
                            </span>
                            <span>
                                <b-icon icon="person"></b-icon>
                                post by {{po.user.name}}
                            </span>
                        </div>

                        <div class="col-md-8">
                            <div class="clearfix">
                                <div class="float-right">
                                    <span>
                                        <b-icon icon="calendar2-day"></b-icon>
                                        
                                        <a href="" :title="moment(po.created_at)">
                                            {{moment(po.created_at).fromNow()}}
                                        </a>
                                        
                                    </span>
                                </div>
                            </div>    
                        </div>
                    </div> 
                    <!-- div.row show user and view END -->

                </div>
            </div>
        </div>
    </div>
</template>

<script>
var moment = require('moment')
export default{
    name:"PostSearch",
             data(){
                 return{
                    sForm:new Form({
                        search:''
                                  }),
                    search_result:'',
                    isShowSearchResult:false,
                    moment:moment,
                 }
             },
methods:{
            getSearch(){
                this.isShowSearchResult = false
                let result_length = 0
                if(this.sForm.search.length >= 2){
                    let url = `/searchpost?search=${this.$refs.search.value}`
                    axios.get(url)
                    .then(res=>{
                        this.search_result = res.data.search_result
                        result_length = Object.keys(res.data.search_result).length
                        if(result_length != 0){
                           this.isShowSearchResult = true 
                        }
                   //     console.log(this.search_result)
                    })
                }
            },
        },
}
</script>
