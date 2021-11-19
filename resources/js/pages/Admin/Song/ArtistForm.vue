<template>
    <div class="container">
       <div>
            <form action="">
                <div class="form-group">
                    <input v-model="arForm.artist_name" class="form-control" 
                    type="text" name="artist_name" 
                    placeholder="Enter artist name *">
                </div>

                <!-- artist cover START -->
                <div class="row">
                    <div class="col-lg-12">
                        <div class="form-group">
                            <input  class="form-control" 
                            ref="url_cover"
                            type="text" name="url_cover" 
                            @keydown.enter.prevent="getShowImage"
                            placeholder="Enter cover url 'Not Require'">
                            <p>*hit enter to preview your image</p>
                        </div>
                    </div>
                    <!-- end of url -->
                    <!-- upload START -->
                    <div class="col-lg-12">
                        <input  class="form-control" type="file" 
                        @change.prevent="showUploadArtistPreview"
                        ref="artist_cover"
                        name="artist_cover">
                    </div>
                    <!-- upload END -->
                    <div class="col-lg-12">
                        <div class="text-center mb-4 mt-4 " 
                        v-show="isShowPreview">
                            <img class="responsive d-block mx-auto" :src="photo.url" 
                            style="max-height:250px;"
                            :alt="photo.alt">
                            <p class="pt-2 mb-2">{{photo.alt}}</p>
                        </div>
                    </div>
                </div>
                <!-- artist cover END -->

                <!-- artist bio START -->
                <div class="form-group">
                    <jodit-editor 
                    height=450 
                    v-model="arForm.artist_bio"></jodit-editor>
                </div>
                <!-- artist bio END -->

                <div class="row">
                    <div class="col-lg-8">
                        <span v-html='res_status'>{{res_status}}</span>
                    </div>

                    <!-- button START -->
                    <div class="col-lg-4">
                        <div class="float-right">
                            <button class="btn btn-outline-info" 
                            @click.prevent="saveArtist(artistId)">
                                <b-icon icon="pen"></b-icon>

                            </button>
                            <button class="btn btn-outline-danger" 
                            @click.prevent="$emit('isCancelAddArtist',true)">
                                <b-icon icon="x-circle"></b-icon>

                            </button>
                        </div>
                    </div>
                    <!-- button END -->

                </div>
            </form>
       </div>

    </div>
</template>

<script>
import JoditEditor from 'jodit-vue'
export default{
    name:"ArtistForm",
             data(){
                 return{
                     artistId:0,
                    arForm: new Form({
                        artist_name:'',
                        artist_cover:'',
                        artist_bio:'',
                    }),
                    isShowPreview:false,
                    photo:'',
                    upload_obj:{
                        file:'',
                        img:''
                    },
                    errorMessage:'',
                    res_status:'',
                 }
             },
methods:{
            showUploadArtistPreview(e){
                this.$refs.url_cover.value = ''
                this.isShowPreview = true
                let theFile = e.target.files[0]
                this.upload_obj.file = theFile 
                this.upload_obj.img = URL.createObjectURL(theFile)
                this.photo = {
                    url:this.upload_obj.img,
                    alt:this.upload_obj.file.name
                }
                this.arForm.artist_cover = theFile

            },
            saveArtist(id){
                let url = `/artist`
                let arData = new FormData()
                arData.append('artist_name',this.arForm.artist_name)
                arData.append('artist_cover',this.arForm.artist_cover)
                arData.append('url_cover',this.$refs.url_cover.value)
                arData.append('artist_bio',this.arForm.artist_bio)
                if(id){
                    url = `/artist/${id}`
                    arData.append('_method','put')
                }
                axios.post(url,arData)
                    .then(res=>{
                     //   console.log(res)
                        this.res_status = res.data.msg
                        this.clearForm()
                            })
                .catch((err)=>{
                    this.errorMessage = `<span class="text-danger">
                        ${Object.values(err.response.data.errors).join()}
                    </span>`
                    //console.log(this.errorMessage)
                    this.res_status = this.errorMessage
                        })
            },
            getShowImage(){
                this.$refs.artist_cover.value = ''
                this.isShowPreview = true 
                //console.log(`the value ${this.$refs.url_cover.value}`)
                this.photo = {
                    url:this.$refs.url_cover.value,
                    alt:this.arForm.artist_name
                }
                this.arForm.artist_cover = this.$refs.url_cover.value
            },
            clearForm(){
                setTimeout(()=>{
                    this.isShowPreview = false
                    this.$refs.artist_cover.value = ''
                    this.$refs.url_cover.value = ''
                    this.arForm.reset()
                    this.res_status = ''
                    this.errorMessage = ''
                },5300)
            },
        },
}
</script>
