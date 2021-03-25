<template>
    <div>
        <div class="clearfix">
            <div class="float-right">
                <div class="btn-group">
                    <button class="btn btn-outline-primary" 
                    @click="showSearchForm=true" v-if="showSearchForm == false">
                    Search Box</button>
                    <button class="btn btn-outline-danger" 
                    @click="showSearchForm=false"
                    v-else>Close</button>

                    <button class="btn btn-outline-primary" 
                    @click="showPhotoForm=true" v-if="showPhotoForm == false">
                    Add</button>
                    <button class="btn btn-outline-danger" 
                    @click="showPhotoForm=false"
                    v-else>Close</button>
                </div>
            </div>
        </div>
        <p class="mb-2">&nbsp;</p>
        <photo-search v-show="showSearchForm" @openPhoto="openPhoto($event)">
        </photo-search>
        <photo-form v-show="showPhotoForm" :editId="editId" 
        :photos="photos" @getPhotos="getPhotos($event)"></photo-form>

        <p class="pt-4">&nbsp;</p>
        <photo-list @getPhotos="getPhotos($event)" :photos="photos" 
        :openPhoto="photoId" @photoEdit="photoEdit($event)" 
        @photoDel="photoDel($event)"></photo-list>

        <b-modal title="Server Said :" ref="onOk" centered ok-only>
            <div v-html="res_status">
                {{res_status}}
            </div>
        </b-modal>
    </div><!-- end of main div -->
</template>


<script>
import PhotoSearch from './PhotoSearch.vue'
import PhotoForm from './PhotoForm.vue'
import PhotoList from './PhotoList.vue'
export default{
    name:"MemberPhoto",
             components:{
                PhotoSearch,
                PhotoForm,
                PhotoList
             },
             data(){
                 return{
                    photos:[],
                    photoId:0,
                    editId:0,
                    showSearchForm:false,
                    showPhotoForm:false,
                    res_status:''
                 }
             },
             mounted(){
                this.getPhotos()
             },
methods:{
            getPhotos(page){
                this.editId = 0
                let url = ''
                if(page){
                    url = page
                    this.$cookies.set("mPhoto_old_page",url)
                }
                url = this.$cookies.get("mPhoto_old_page")
                    if(!url){
                        url = `/member/getPhotos`
                    }
                    axios.get(url)
                        .then(res=>{
                            this.photos = res.data.photos
                            },err=>{
                                this.photos = `<span class="badge badge-danger">
                                ${err.response.data.message}
                                </span>`
                            })
            },
            openPhoto(id){
                this.photoId = id
            },
            photoEdit(id){
                this.editId = id
                this.showPhotoForm = true
            },
            photoDel(id){
               let url = `/member/photo/${id}`
               axios.delete(url)
               .then(res=>{
                this.res_status = res.data.msg
                },err=>{
                    this.res_status = `<span class="badge badge-danger">
                    ${err.response.data.message}
                    </span>`
                })
                this.$refs["onOk"].show()
               setTimeout(()=>{
                this.getPhotos()
                       },2000)
            },
        },
}
</script>
