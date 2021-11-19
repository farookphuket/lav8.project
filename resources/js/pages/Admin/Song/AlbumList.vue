<template>
    <div class="row">
       <div class="col-lg-12">
            <h2>show album list</h2>
            <p>get the album from the list below.</p>
       </div>
       <div class="col-md-3 mt-4 mb-4" v-for="ab in albums.data">
            <div class="text-center mx-auto" 
            style="min-height:200px;max-height:220px;">
                <a href="" @click.prevent="$emit('setAlbum',ab.id)">
                    <img class="d-block responsive" 
                    style="max-height:200px;"
                    :src="ab.album_cover" alt="">
                </a>
            </div>
            <p class="text-center">{{ab.album_name}}</p>
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
                                        {{albums.from}}
                                    </span> to 
                                    <span>{{albums.to}}</span> of 
                                    <span>{{albums.total}}</span>
                                </div>

                            </li>
                            <li class="page-item" v-for="li in albums.links" 
                            >
                                <a href="" class="page-link p-2" 
                                @click.prevent="getAlbum(li.url)" 
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
                                    {{albums.current_page}}</span>
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
    name:"albumList",

             data(){
                 return{
                     albums:''
                 }
             },
             mounted(){
                 this.getAlbum()
             },
methods:{
            getAlbum(page){
                let url = ''
                    if(page){
                        url = page 
                        this.$cookies.set('old_album_page',url)
                    }
                    url = this.$cookies.get('old_album_page')
                    if(!url) url = `/getalbum`
                   axios.get(url) 
                       .then(res=>{
                           this.albums = res.data.album
                               })
            },
        },
}
</script>
