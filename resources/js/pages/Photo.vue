<template>
    <div class="container">
        <photo-search :photos="photos" ></photo-search>

        <photo-list :photos="photos"  
        @getPhotos="getPhotos($event)"></photo-list>
    </div>
</template>


<script>

import PhotoSearch from './PhotoSearch.vue'
import PhotoList from './PhotoList.vue'
export default{
    name:"PubPhoto",
             components:{
                PhotoSearch,
                PhotoList
             },
             data(){
                 return{
                    photos:[],
                 }
             },
             mounted(){
                this.getPhotos()
             },
methods:{
            getPhotos(page){
                let url = ''
                    if(page){
                        url = page
                        this.$cookies.set("pic_old_page",url)
                    }
                url = this.$cookies.get('pic_old_page')
                    if(!url){
                        url = `/getPhotos`
                    }
                axios.get(url)
                    .then(res=>{
                        this.photos = res.data.photos
                    })
            },
        },

}
</script>
