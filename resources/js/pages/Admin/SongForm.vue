
<template>
<div>
    <form>
        
        <div class="form-group">
            <input class="form-control" type="text" v-model="song"
            placeholder="Song title">
        </div>
        <div class="form-group">
            <input class="form-control" type="text" v-model="album"
            placeholder="Album">
        </div>

        <div class="row">
            <div class="col-lg-6">

            </div>
            <div class="col-lg-6">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text">
                                Artist
                            </span>

                            <input class="form-control" type="text" v-model="artist"
                            v-on:keyup="findArtist()"
                            placeholder="Artist">
                        
                            <button class="btn btn-outline-secondary" @click.prevent="makeArtist()">
                                Save {{artist}} ?
                            </button>

                        </div>
                    </div>
            </div>
        </div>


        <div class="clearfix">
            <div class="float-right">
                <button class="btn btn-outline-primary"
                @click.prevent="saveSong(editId)">
                    Save
                </button>
            </div>
        </div>
    </form>
</div>
</template>

<script>
export default{
    name:"SongForm",
             data(){
                 return{
                 editId:0,
                 song:"",
                 artist:"",
                 album:"",
                 fData:{},
                 fUrl:''
                 }
             },
methods:{
            saveSong(id){
                this.fData = {
                    song:this.song,
                    artist:this.artist,
                    album:this.artist
                }
                    if(id){
                        this.fUrl = ``
                    }else{
                        this.fUrl = ``
                    }
            },
            makeArtist(){
                
                alert(this.artist)
            },
            findArtist(){
                
            },
        }

}
</script>
