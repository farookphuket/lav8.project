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
            <!-- new pagination 3 July 2021 START -->
                <!-- pagination START -->
                <div class="container" style="margin-top:2em;margin-bottom:2em;">
                            <div class="nav-scroller py-1 mb-2">
                                <nav class="nav d-flex justify-content-center">
                                    <ul class="pagination flex-wrap">
                                        <li class="page-item disabled">
                                            <div class="page-link">
                                                showing from
                                                <span>{{ photos.from }}</span> to
                                                <span>{{ photos.to }}</span> of
                                                <span>{{ photos.total }}</span> 
                                            </div> 
                                        </li>
                                        <li class="page-item" v-for="li in photos.links">
                                            <a
                                                href=""
                                                class="page-link p-2"
                                                v-html="li.label"
                                                v-if="li.active != true && li.url != null"
                                                @click.prevent="$emit('getPhotos', li.url)"
                                                >{{ li.label }}</a
                                            >
                                            <span class="page-link disabled" 
                                                v-html="li.label" v-else>
                                                {{ li.label  }}
                                            </span>
                                            
                                        </li>
                                        <li class="page-item active">
                                            <span class="page-link">
                                                <b-icon icon="book-half"></b-icon> 
                                                {{ photos.current_page }}
                                            </span>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            <!-- end of div.nav-scroller pagination -->
                </div>
                <!-- pagination END -->

            <!-- new pagination 3 July 2021 End -->
        </div><!-- end of div.col-lg-12 -->


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
