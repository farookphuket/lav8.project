<template>
    <div>
        <div class="row">
            <div class="col-lg-3" v-for="po in photos.data">
                <div class="card">
                    <a href="" @click.prevent="openPhoto(po.id)">
                        <img class="card-img-top" :src="po.embed" alt="">
                    </a>
                    <div class="card-body">
                      <span class="badge badge-info" 
                      >{{po.title}}</span> &middot; 
                      <span class="badge badge-info" 
                      >{{moment(po.created_at).fromNow()}}</span>
                    </div>
                </div><!-- end of div.card -->
            </div><!-- end of div.col-lg-3 photo list -->
            <div class="col-lg-12">
                <div class="po">
                    <ul class="pagination">
                        <li class="page-item">
                            showing from  
                            <span>{{photos.from}}</span> to 
                            <span>{{photos.to}}</span> of  
                            <span>{{photos.total}}</span> &middot;  
                        </li>
                        <li class="page-item" v-for="li in photos.links">
                            <a href="" v-html="li.label" 
                            v-if="li.active != true && li.url != null" 
                            @click.prevent="$emit('getPhotos',li.url)"
                            >{{li.label}}</a>
                            <span class="active" v-html="li.label" 
                            v-else>{{li.label}}</span> &middot;
                        </li>
                        <li class="page-item">
                        <span>{{photos.current_page}}</span>
                        </li>
                    </ul>
                </div>
            </div><!-- end of div.col-lg-12 pagination -->
            <b-modal ref="showPhotoModal" :title="title" 
            size="xl" ok-only>
                <div class="card">
                    <img class="card-img-top" :src="embed" alt="">
                    <div class="card-body">
                        <span class="badge badge-info">{{ownerName}}</span> 
                        &middot; 
                        <span class="badge badge-info" 
                        >{{moment(createdDate)}} &middot; 
                        {{moment(createdDate).fromNow()}}</span>
                    </div>
                    <div class="form-group pt-4 mb-4">
                        <textarea ref="copyCode" class="form-control" 
                        @click.prevent="selectCode" >{{embed}}</textarea>
                    </div>
                </div>
            </b-modal>
        </div><!-- end of div.row -->
    </div><!-- end of main div -->
</template>


<script>
var moment = require('moment')

export default{
    name:"PhotoList",
    props:["photos","openId"],
             data(){
                 return{
                    moment:moment,
                    title:'',
                    embed:'',
                    createdDate:'',
                    ownerName:''
                 }
             },
methods:{
            openPhoto(id){
                //console.log(this.photos.data)
                this.photos.data.forEach((val)=>{
                    if(val.id == id){
                        this.title = val.title
                        this.embed = val.embed
                        this.ownerName = val.user.name
                        this.createdDate = val.created_at 
                        //console.log(this.title)
                    }
                    this.$refs["showPhotoModal"].show()
                })
            },
            selectCode(){
                this.$refs.copyCode.select()
            },
        }
}
</script>
