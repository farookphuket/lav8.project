<template>
    <div>
        <div class="row">
            <div class="col-lg-12">
                <form action="">
                    <div class="form-group">
                       <input v-model="search" class="form-control" 
                       type="text" v-on:keyup="searchPhoto" 
                       placeholder="Search photo...">
                    </div>
                </form>
            </div><!-- end of div.col-lg-12 form -->
            <div class="col-lg-3 pt-4 mb-4" v-show="search" 
            v-for="po in photo">
              <div class="card">
                <a href="" @click.prevent="openPhoto(po.id)">
                    <img class="card-img-top" :src="po.embed" alt="">
                </a>
                  <div class="card-body">
                    <p>
                        {{po.title}} - {{po.user.name}}
                    </p>
                  </div>
              </div>  
            </div><!-- end of div.col-lg-12 search result -->
            <b-modal :title="title" size="xl" ref="showSearchModel" 
            ok-only>
                <div class="card">
                    <img class="card-img-top" :src="embed" alt="">
                    <div class="card-body">
                        <span class="badge badge-info">{{ownerName}}</span> 
                        &middot; 
                        <span class="badge badge-info">
                        {{moment(createDate)}} &middot; 
                        {{moment(createDate).fromNow()}}
                        </span>
                        <div class="form-group pt-2">
                            <textarea ref="copyCode" class="form-control" 
                            @click.prevent="selectCode"
                            >{{embed}}</textarea>
                        </div>
                    </div>
                </div>
            </b-modal>
        </div><!-- end of div.row -->
    </div><!-- end of main div -->
</template>


<script>
var moment = require('moment')
export default{
    name:"PhotoSearch",
             data(){
                 return{
                    photo:[],
                    search:'',
                    moment:moment,
                    ownerName:'',
                    title:'',
                    embed:'',
                    createDate:''
                 }
             },
methods:{
            searchPhoto(){
                if(this.search.length >= 2){
                    let url = `/search?search=${this.search}`
                    axios.get(url)
                    .then(res=>{
                        this.photo = res.data.photos
                    })
                }
            }, 
            openPhoto(id){
                let url = `/photo/${id}`
                axios.get(url)
                .then(res=>{
                    //console.log(res.data)
                    res.data.photo.forEach((val)=>{
                        this.title = val.title
                        this.embed = val.embed
                        this.ownerName = val.user.name
                        this.createDate = val.created_at
                     }) 
                     this.$refs["showSearchModel"].show()
                })
            },
            selectCode(){
                this.$refs.copyCode.select()
            },
        },
}
</script>
