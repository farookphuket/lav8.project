<template>
    <div class="row">
       <div class="col-lg-12">
            <h2>artist list</h2>
            <p>select the artist from the list below.</p>
       </div>
        <div class="col-lg-3 mt-4 mb-4" 
        v-for="ar in artists.data">
            <div class="text-center" 
            style="min-height:200px;">
                <a href="" @click.prevent="$emit('setArtist',ar.id)">
                    <img class="responsive d-block mx-auto" :src="ar.artist_cover" 
                    style="max-height:200px;"
                    alt="">
                </a>
            </div>
            <p class="text-center">{{ar.artist_name}}</p>
        </div>


       <!-- pagination -->
       <div class="col-lg-12 mt-4">
            
                <div class="nav-scroller py-1 mb-2">
                    <nav class="nav d-flex justify-content-center">
                        <ul class="pagination flex-wrap">
                            <li class="page-item">
                                <div class="page-link disabled">
                                    showing from 
                                    <span>
                                        {{artists.from}}
                                    </span> to 
                                    <span>{{artists.to}}</span> of 
                                    <span>{{artists.total}}</span>
                                </div>

                            </li>
                            <li class="page-item" v-for="li in artists.links" 
                            >
                                <a href="" class="page-link p-2" 
                                @click.prevent="getArtist(li.url)" 
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
                                    {{artists.current_page}}</span>
                            </li>
                        </ul>
                    </nav>
                </div>
       </div>
       <!-- pagination END -->
    </div>
</template>
<script>
export default{
    name:"ArtistList",
             data(){
                 return{
                     artists:''
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
                        this.$cookies.set('old_ar_page',url)
                    }
                url = this.$cookies.get('old_ar_page')
                if(!url) url = `/getartist`
                axios.get(url)
                    .then(res=>{
                        this.artists = res.data.artist
                            })
            },
        },
}
</script>
