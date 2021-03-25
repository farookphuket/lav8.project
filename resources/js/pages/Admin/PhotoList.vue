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
            <div class="col-lg-12">
                <div class="pa">
                    <ul class="pagination">
                        <li class="page-item">
                            showing from 
                            <span>
                                {{photos.from}}
                            </span> to 
                            <span>{{photos.to}}</span> of 
                            <span>{{photos.total}}</span> &middot;

                        </li>
                        <li class="page-item" v-for="li in photos.links" 
                        >
                            <a href="" 
                            @click.prevent="$emit('getPhotos',li.url)" 
                            v-if="li.active != true && li.url != null" 
                            v-html="li.label">
                                {{li.label}}
                            </a>
                            <span class="active" v-html="li.label" v-else>
                                {{li.label}}
                            </span> &middot;
                        </li>
                        <li class="page-item">
                            <span class="active">{{photos.current_page}}</span>
                        </li>
                    </ul>
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
    props:["photos","openPhoto"],
    data(){
        return{
            moment:moment,
            photo:'',
            title:'',
            photoId:0,
        }
    },
watch:{
          "openPhoto":function(x){
            this.photoOpen(x)
          }
      },
methods:{
            photoOpen(id){
                    this.photos.data.forEach((val)=>{
                            if(val.id == id){
                                console.log(`the val is ${val.id}`)
                            }
                    })
                
            },
            getSelect(){
                this.$refs.selectLink.select()
            },
        },
    
}
</script>
