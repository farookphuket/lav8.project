<template>
    <div>
        <div class="row">
            <div class="col-lg-12 pt-4" v-if="photos.data == 0">
                <div class="alert alert-warning ">
                    <h2 class="text-center">
                        There is no data
                    </h2>
                </div>
            </div>
            <div class="col-lg-2" v-for="ph in photos.data" v-else>
                <p class="pt-4">&nbsp;</p>
               <div class="card">
                    <a href="" @click.prevent="photoOpen(ph.id)">
                        <img class="responsive" 
                        :src="ph.embed" :alt="ph.title">
                    </a>
                   <div class="card-body">
                        <span class="badge badge-info">
                            {{ph.user.name}} 
                        </span> &middot; 
                        <span class="badge badge-info">
                            {{moment(ph.created_at).fromNow()}}
                        </span>
                   </div><!-- end of div.card-body -->
                   <div class="card-footer">
                        <div class="float-right">
                            <button class="btn btn-outline-primary" 
                            @click.prevent="$emit('photoEdit',ph.id)" 
                            >edit</button>
                            <button class="btn btn-outline-danger" 
                            @click.prevent="$emit('photoDel',ph.id)"
                            >x</button>
                        </div>
                   </div><!-- end of div.card-footer -->
               </div><!-- end of div.card -->
            </div><!-- end of div.col-lg-3 -->
            <div class="col-lg-12 pt-2 mb-2">&nbsp;</div>
            <div class="col-lg-12">
                <div class="nav-scroller py-1 mb-2">
                    <nav class="nav d-flex justify-content-center">
                        <ul class="pagination flex-wrap">
                            <li class="page-item">
                                <div class="page-link disabled">
                                    showing from 
                                    <span>
                                        {{photos.from}}
                                    </span> to 
                                    <span>{{photos.to}}</span> of 
                                    <span>{{photos.total}}</span>
                                </div>

                            </li>
                            <li class="page-item" v-for="li in photos.links" 
                            >
                                <a href="" class="page-link p-2" 
                                @click.prevent="$emit('getPhotos',li.url)" 
                                v-if="li.active != true && li.url != null" 
                                v-html="li.label">
                                    {{li.label}}
                                </a>
                                <span class="page-link" v-html="li.label" 
                                    v-else>
                                    {{li.label}}
                                </span> 
                            </li>
                            <li class="page-item active">
                                <span class="page-link">
                                    <b-icon icon="book-half"></b-icon>
                                    {{photos.current_page}}</span>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div><!-- end of div.col-lg-12 pagination -->
            <b-modal title="show photo" ref="showPhotoModal" 
            size="xl" ok-only>
                <div class="container">
                    
                    <img class="responsive" :src="photo" alt="">
                    <div class="pt-4">
                        <div class="form-group">
                            <textarea class="form-control" ref="selectLink" 
                            @click="getSelect">{{photo}}</textarea>
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
    name:"PhotoList",
    props:["photos","openId"],
    data(){
        return{
            moment:moment,
            photo:'',
            title:'',
            photoId:0,
        }
    },
watch:{
          "openId":function(x){
            this.photoId = x
            this.photoOpen(this.photoId)
          }
      },
methods:{
            photoOpen(id){
               //console.log(`the id is ${id}`) 
                   this.photos.data.forEach((val)=>{
                           if(val.id == id){
                            this.photo = val.embed
                            this.title = val.title
                            this.photoId = val.id 
                           }    
                        })
                this.$refs["showPhotoModal"].show()
            },
            getSelect(){
                this.$refs.selectLink.select()
            },
        },
    
}
</script>
