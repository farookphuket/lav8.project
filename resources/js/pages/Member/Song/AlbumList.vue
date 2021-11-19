<template>
    <div class="row">
        <div class="col-lg-12 mb-4">
            <div class="float-right btn-group">
                <button class="btn btn-outline-primary" v-if="isShowAlbumForm == false"
                @click.prevent="isShowAlbumForm = true">create album</button>
                <button class="btn btn-outline-danger" 
                @click.prevent="isShowAlbumForm = false" v-else>
                    <b-icon icon="x-circle"></b-icon>
                </button>
            </div>
        </div>
        <div class="col-lg-12" v-show="isShowAlbumForm">
            <album-form 
            @getAlbum="getAlbum($event)"></album-form>
        </div>
       <div class="col-md-3" v-for='ab in albums.data'>
            <div class="text-center" 
            style="min-height:200px;">
                <a href="" :title="ab.album_name" 
                @click.prevent="$emit('setAlbum',ab.id)">
                    <img class="responsive d-block mx-auto" :src="ab.album_cover" 
                    style="max-height:220px;"
                    alt="">
                </a>
            </div>
            <p class="text-center">{{ab.album_name}}</p>
       </div>
    </div>
</template>
<script>
import AlbumForm from './AlbumForm.vue'
export default{
    name:"AlbumList",
             components:{
                 AlbumForm,
             },
             data(){
                 return{
                     albums:'',
                     isShowAlbumForm:false,
                 }
             },
             mounted(){
                 this.getAlbum()
             },
methods:{
            getAlbum(page){
                let url =''
                    if(page){
                        url = page 
                        this.$cookies.set('m_album_old',url)
                    }
                    url = this.$cookies.get('m_album_old')
                    if(!url) url = `/getalbum`
                    axios.get(url)
                        .then(res=>{
                            this.albums = res.data.album
                            console.log(res.data)
                                })
            },
        },
}
</script>
