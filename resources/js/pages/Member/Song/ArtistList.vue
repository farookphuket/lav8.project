<template>
    <div class="row">
        <!-- button show form area START -->
        <div class="col-lg-12 mb-4">
            <div class="btn-group float-right">
                <button class="btn btn-outline-primary" 
                @click.prevent="isShowArtistForm = true">
                    create new artist
                </button>
            </div>

        </div>
        <div class="col-lg-12">
            <artist-form 
            @getArtist="getArtist($event)"
            v-show="isShowArtistForm"></artist-form>
        </div>
        <!-- button show form area END -->

        <div class="col-lg-3" v-for="ar in artist.data">
           <div class="text-center">
                <a href="" :title="ar.artist_name" 
                @click.prevent="$emit('setArtist',ar.id)">
                    <img :src="ar.artist_cover" alt="">
                </a>
           </div>
           <p class="text-center pt-2">{{ar.artist_name}}</p>
        </div>
    </div>
</template>
<script>
import ArtistForm from './ArtistForm.vue'
export default{
    name:"ArtistList",
             components:{
                 ArtistForm,
             },
             data(){
                 return{
                     artist:'',
                     isShowArtistForm:false,
                 }
             },
             mounted(){
                 this.getArtist()
             },
methods:{
            getArtist(page){
                let url = ''
                    if(page){
                        url = page 
                        this.$cookies.set('m_artist_old',url)
                    }
                    url = this.$cookies.get('m_artist_old')
                    if(!url) url = `/getartist`
                axios.get(url)
                    .then(res=>{
                        this.artist = res.data.artist
                            })
            },
        },
}
</script>
