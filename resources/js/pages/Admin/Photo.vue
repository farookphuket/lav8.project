<template>
    <div class="container-fluid">
        
       <div class="clearfix">
           <div class="float-right">
            <div class="btn-group">
                <button class="btn btn-outline-primary" 
                @click.prevent="showSearch=true" v-if="showSearch==false">Search Box</button>
                <button class="btn btn-outline-danger" v-else 
                @click.prevent="showSearch=false">Close</button>
                <button class="btn btn-outline-primary" 
                @click.prevent="showFormPhoto=true" 
                v-if="showFormPhoto==false">Add Photo</button>
                <button class="btn btn-outline-danger" 
                @click.prevent="showFormPhoto=false" v-else>close</button>
            </div>
           </div>
       </div>
        <photo-search v-show="showSearch"></photo-search>
        <photo-form :editId="editId" :photos="photos"
        @getPhotos="getPhotos($event)"  
        v-show="showFormPhoto"></photo-form>

        <photo-list :photos="photos" 
        @photoEdit="photoEdit($event)"
        @photoDel="photoDel($event)"
        @getPhotos="getPhotos($event)"></photo-list>
    </div>
</template>


<script>

import PhotoSearch from './PhotoSearch.vue'
import PhotoList from './PhotoList.vue'
import PhotoForm from './PhotoForm.vue'
export default{
    name:"AdminPhoto",
             components:{
             
                PhotoSearch,
                PhotoList,
                PhotoForm,
             },
             data(){
                 return{
                    showFormPhoto:false,
                    showSearch:false,
                    photos:[],
                    editId:0,
                 }
             },
             mounted(){
                this.getPhotos()
             },
methods:{
            getPhotos(page){
                let url = ""
                if(page){
                    url = page
                    this.$cookies.set("old_page_admin_photo",url)
                }
                url = this.$cookies.get("old_page_admin_photo")
                    if(!url){
                        url = `/admin/getPhotos`
                    }
                axios.get(url)
                    .then(res=>{
                        this.photos = res.data.photos
                        },err=>{
                            this.photos = 'Error : somthing went wrong!'
                        })
            },
            photoEdit(id){
                this.editId = id
                this.showFormPhoto = true
            },
            photoDel(id){
                alert(id)
            },
        },
}
</script>
