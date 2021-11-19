<template>
    <div>
        <div class="row">
            
            <div class="col-lg-12">
                <form class="pt-4">
                    <div class="form-group">
                        <input v-model="search" class="form-control" type="text" 
                        ref="search" v-on:keyup="searchPhoto"
                        placeholder="Search photo">
                    </div>
                </form>
            </div>
            <div class="col-md-2" v-show="search" v-for="ph in photos">
                <div class="card">
                    <a href="" @click.prevent="openPhoto(ph.id)">
                        <img class="card img-top" :src="ph.embed" alt="">
                    </a>

                    <div class="card-body">
                        <span class="badge badge-info">{{ph.title}}</span> 
                        &middot; 
                        <span class="badge badge-info">
                            {{moment(ph.created_at).fromNow()}}
                        </span>
                    </div>
                </div><!-- end of div.card -->
            </div><!-- end of div.col-md-3 search result -->
            <b-modal :title="title" ref="showSearchModal" 
            size="xl" ok-only>
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
                        <textarea class="form-control" ref="copyCode" 
                        @click.prevent="selectCode">{{embed}}</textarea>
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
                    moment:moment,
                    photos:[],
                    search:"",
                    embed:'',
                    title:'',
                    ownerName:'',
                    createDate:''
                 }
             },
methods:{
            searchPhoto(){
                if(this.search.length >= 2){
                    this.photos = []
                    let url = `/search?search=${this.search}`
                    axios.get(url)
                    .then(res=>{
                        //console.log(res.data.photos)
                        this.photos = res.data.photos
                    })
                }
            },
            openPhoto(id){
                let url = `/photo/${id}`
                axios.get(url)
                .then(res=>{
                    res.data.photo.forEach((val)=>{
                        //console.log(val)    
                            this.title = val.title
                            this.embed = val.embed
                            this.ownerName = val.user.name
                            this.createDate = val.created_at
                        })
                     this.$refs["showSearchModal"].show()
                })
            },
            selectCode(){
              this.$refs.copyCode.select()  
            },
        },
}
</script>
