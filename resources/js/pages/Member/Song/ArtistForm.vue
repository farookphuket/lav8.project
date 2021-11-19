<template>
    <div class="mt-4 mb-4">


        <div class="row">
            <div class="col-lg-12">

               <form action="">
                    <div class="form-group">
                        <input v-model="arForm.artist_name" class="form-control" 
                        type="text" placeholder="Artist Name (* this field is required)"
                        name="">
                    </div>


                    <!-- show upload cover preview END -->
                    <div class="row">
                        <div class="col-md-6">
                            <input ref="artist_cover_url" type="text" 
                            class="form-control" placeholder="Artist Image URL....(not required)"
                            @keyup.enter.prevent="showUrlPreview"
                            name="">
                            <p class="text-center text-warning 
                            font-weight-bold">
                            * hit enter to show preview (your file choosen will 
                            be remove)
                            </p>
                        </div>
                        <div class="col-md-6">
                            <input ref="artist_cover_upload" type="file" 
                            name="artist_cover_upload" class="form-control" 
                            
                            @change.prevent="showUploadPreview">
                            <p class="pt-2 text-center text-warning 
                            font-weight-bold">
                            * your image url on the left will be remove
                            </p>
                        </div>
                        <div class="col-lg-12">
                            <div class="text-center" 
                            style="min-height:220px;"
                            v-show="isShowUploadPreview">
                                <img :src="photo.url" :alt="photo.alt" 
                                class="responsive d-block mx-auto" 
                                style="max-height:220px;">
                                <p class="pt-2">{{photo.alt}}</p>
                            </div>
                        </div>
                    </div>
                    <!-- show upload cover preview END -->
                    <!-- artist bio START -->
                    <div class="form-group">
                        <jodit-editor 
                        v-model="arForm.artist_bio" 
                        height="350" 
                        placeholder="Enter the artist bio (*this field is required)"
                        ></jodit-editor>
                    </div>
                    <!-- artist bio END -->
                    <!-- form request status ,button START -->
                    <div class="row">
                        <div class="col-md-8">
                            <span v-html="res_status" 
                            class="text-center font-weight-bold">{{res_status}}</span>
                        </div>
                        <div class="col-md-4">
                            <div class="float-right btn-group">
                                <button class="btn btn-outline-primary" 
                                type="submit"
                                @click.prevent="saveArtist(artistId)">
                                    <b-icon icon="check2-square"></b-icon>
                                </button>
                            </div>
                        </div>
                    </div>
                    <!-- form request status ,button END -->
               </form>
            </div>
        </div>


    </div>
</template>

<script>
import JoditEditor from 'jodit-vue'
export default{
    name:"ArtistForm",
             data(){
                 return{
            arForm:new Form({
                artist_name:'',
                artist_cover:'',
                artist_bio:'',

                }),
               isShowUploadPreview:false,
               upload_obj:{
                   file:null,
                   img:''
               },
               photo:'',
               res_status:'',
               artistId:0,
                 }
             },
methods:{
            showUploadPreview(e){
                this.$refs.artist_cover_url.value = ''
                this.isShowUploadPreview = true
                
                const theFile = e.target.files[0]
                this.upload_obj.file = theFile
                this.upload_obj.img = URL.createObjectURL(theFile)

                this.photo = {
                    url:this.upload_obj.img,
                    alt:this.upload_obj.file.name
                }
                this.arForm.artist_cover = theFile
            },
            showUrlPreview(){
                this.$refs.artist_cover_upload.value = ''
                    this.photo = {
                        url:this.$refs.artist_cover_url.value,
                        alt:this.arForm.artist_name
                    }
                this.abForm.artist_cover = this.$refs.artist_cover_url.value
            },
            saveArtist(id){
                let url = `/artist`
                let arData = new FormData()
                arData.append('artist_name',this.arForm.artist_name)
                arData.append('artist_cover',this.arForm.artist_cover)
                arData.append('url_cover',this.$refs.artist_cover_url.value)
                arData.append('artist_bio',this.arForm.artist_bio)

                if(id){
                    arData.append("_method","put")
                    url = `/artist/${id}`
                }
                axios.post(url,arData)
                    .then(res=>{
                        this.res_status = res.data.msg
                        this.clearForm()
                        this.$emit('getArtist')
                            })
                .catch((err)=>{
                    this.res_status = `<span class="text-danger">
                        ${Object.values(err.response.data.errors).join()}
                    </span>`
                    setTimeout(()=>{
                        this.res_status = ''
                            },3000)
                        })
            },
            clearForm(){
                setTimeout(()=>{

                    this.artistId = 0
                    this.res_status = ''
                    this.$refs.artist_cover_url.value = ''
                    this.$refs.artist_cover_upload.value = ''
                    this.isShowUploadPreview = false
                    this.arForm.reset()
                },3200)

            },
        },
}
</script>
