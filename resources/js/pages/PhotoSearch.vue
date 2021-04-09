<template>
    <div>
       <div class="row">
           <div class="col-lg-12">
                <div class="section-title">
        <h2>photo</h2>
                </div>
                <form action="">
                    <div class="form-group">
                        <b-input-group>
                        <b-input-group-prepend is-text>
                            <b-icon icon="search"></b-icon>
                        </b-input-group-prepend>
                        <input v-model="search" class="form-control" 
                        v-on:keyup="searchPhoto"
                        type="text" ref="search" placeholder="Search photo...">
                        </b-input-group>
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
                    > 
                    <b-icon icon="person"></b-icon> 
                    {{po.user.name}}</span> &middot; 
                    <span class="badge badge-info" 
                    >
                    <b-icon icon="clock-history"></b-icon> 
                    {{moment(po.created_at).fromNow()}}</span>
                   </div><!-- end of div.card-body -->
               </div><!-- end of div.card -->
           </div><!-- end of div.col-lg-12 search result -->
           <b-modal :title="title" ref="showPhotoModal" 
           size="xl" hide-footer>
            <div class="card">
                <img class="card-img-top" :src="embed" alt="">
                <div class="card-body">
                   <span class="badge badge-info">
                        <b-icon icon="person"></b-icon> 
                       {{ownerName}}</span> &middot; 

                   <span class="badge badge-info">{{moment(createDate)}} 
                   &middot; {{moment(createDate).fromNow()}}</span>

                    <div class="form-group pt-2 pt-4">
                        <textarea ref="copyCode" class="form-control" 
                        @click.prevent="selectCode" >{{embed}}</textarea>
                    </div>
                </div><!-- end of div.card-body -->
            </div><!-- end of div.card -->
            <button class="btn btn-outline-primary btn-block" 
                @click="openOriginal(embed)">original</button>
            <button class="btn btn-outline-danger btn-block" 
                @click.prevent="closeBox">close</button>
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
                    ownerName:'',
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
            },
    openOriginal(url){

        window.open(url,'_blank')
        setTimeout(()=>{
            this.closeBox()
        },2500)

    },
    closeBox(){
        
        this.$refs["showPhotoModal"].hide()
    },

        },

}
</script>
