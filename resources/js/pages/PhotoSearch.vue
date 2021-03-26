<template>
    <div>
       <div class="row">
           <div class="col-lg-12">
                <form action="">
                    <div class="form-group">
                        <input v-model="search" class="form-control" 
                        v-on:keyup="searchPhoto"
                        type="text" ref="search" placeholder="Search photo...">
                    </div>
                </form>
           </div>
           <div class="col-lg-3" v-show="search" v-for="po in photos">
               <div class="card" >
                    <a href="" 
                    @click.prevent="openPhoto(po.id)">
                        <img class="card-img-top" :src="po.embed" 
                        alt="">
                    </a>
                   <div class="card-body">
                    <span class="badge badge-info" 
                    >{{po.user.name}}</span> &middot; 
                    <span class="badge badge-info" 
                    >{{moment(po.created_at).fromNow()}}</span>
                   </div><!-- end of div.card-body -->
               </div><!-- end of div.card -->
           </div><!-- end of div.col-lg-12 search result -->
           <b-modal :title="title" ref="showPhotoModal" 
           size="xl" ok-only>
            <div class="card">
                <img class="card-img-top" :src="embed" alt="">
                <div class="card-body">
                   <span class="badge badge-info">{{ownerName}}</span> &middot; 

                   <span class="badge badge-info">{{moment(createDate)}} 
                   &middot; {{moment(createDate).fromNow()}}</span>

                    <div class="form-group pt-2 pt-4">
                        <textarea ref="copyCode" class="form-control" 
                        @click.prevent="selectCode" >{{embed}}</textarea>
                    </div>
                </div><!-- end of div.card-body -->
            </div><!-- end of div.card -->
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
                    search:'',
                    photos:[],
                    moment:moment,
                    title:'',
                    embed:'',
                    createDate:'',
                    ownerName:''
                 }
             },
methods:{
            searchPhoto(){
                let url = `/search?search=${this.search}`
                axios.get(url)
                .then(res=>{
                   this.photos = res.data.photos 
                })
            },
            openPhoto(id){
                let url = `/photo/${id}`
                axios.get(url)
                .then(res=>{
                        res.data.photo.forEach((val)=>{
                            if(val.id == id){
                                this.title = val.title
                                this.embed = val.embed
                                this.createDate = val.created_at
                                this.ownerName = val.user.name
                            }

                            this.$refs["showPhotoModal"].show()
                        })
                })
            },
            selectCode(){
                this.$refs.copyCode.select()
            }

        },

}
</script>
