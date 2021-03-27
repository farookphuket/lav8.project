<template>
    <div>
       <div class="row">
           <div class="col-md-3" v-for="po in photos.data">
               <div class="card">
                    <a href="" @click.prevent="openItem(po.id)">
                        <img class="card-img-top" :src="po.embed" alt="">
                    </a>
                    <div class="card-body">
                        <span class="badge badge-info">
                        {{po.user.name}}</span> &middot; 
                        <span class="badge badge-info">
                        {{moment(po.created_at).fromNow()}}</span>
                    </div>
                    <div class="card-footer">
                        
                        <div class="float-left">
                            <span class="badge badge-info">
                                {{smartTitle(po.title,13)}}
                            </span>
                        </div>
                        <div class="float-right">
                            <div class="btn-group" v-if="ownerId == po.user.id">
                               <button class="btn btn-outline-primary" 
                               @click.prevent="$emit('photoEdit',po.id)"
                               >edit</button>
                               <button class="btn btn-outline-danger" 
                               @click.prevent="$emit('photoDel',po.id)"
                               >x</button>
                            </div>
                            <span class="badge badge-info" v-else>
                                {{po.user.name}}
                            </span>
                        </div>
                    </div>
               </div><!-- end of div.card -->
           </div><!-- end of div.col-md-3 -->
           <div class="col-lg-12">
            <div class="po">
                <ul class="pagination">
                    <li class="page-item">
                        showing of 
                        <span>{{photos.from}}</span> to 
                        <span>{{photos.to}}</span> of
                        <span>{{photos.total}}</span> &middot;

                    </li>
                    <li class="page-item" v-for="li in photos.links" 
                    >
                    <a href="" @click.prevent="$emit('getPhotos',li.url)" 
                    v-if="li.active != true && li.url != null" 
                    v-html="li.label">
                        {{li.label}}
                    </a> 
                        <span class="active" v-html="li.label" v-else>
                            {{li.label}}
                        </span> &middot; 
                    </li>
                    <li class="page-item">
                        {{photos.current_page}}
                    </li>
                </ul>
            </div><!-- end of div.po -->
           </div><!-- end of div.col-lg-12 pagination -->
           <b-modal :title="title" centered ref="showPhotoModal" 
           size="xl" ok-only>
            <div class="container">
                <img class="responsive" :src="embed" alt="">
                <p class="pt-4 mb-2">
                    <span class="badge badge-info">
                        {{ownerName}}
                    </span> &middot; 
                </p>
                <div class="form-group">
                    <textarea  class="form-control" ref="selectPhotoCode"
                    @click.prevent="selectCode">{{embed}}</textarea>
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
    props:["openPhoto","photos"],
    data(){
        return{
            title:'',
            embed:'',
            ownerName:'',
            ownerId:window.ownerId,
            moment:moment
        }
    },
watch:{
          "openPhoto":function(x){
            this.openItem(x)
          }
      },
    methods:{
                openItem(x){
                    this.photos.data.forEach((val)=>{
                            if(val.id == x){
                                this.title = val.title 
                                this.embed = val.embed
                                this.ownerName = val.user.name              

                            }
                            })
                    this.$refs["showPhotoModal"].show()
                },
                selectCode(){
                    this.$refs.selectPhotoCode.select()
                },
                smartTitle(str,len){
                    return (str.length > len)? str.substr(0,len)+"...":str
                },
    }
}
</script>
