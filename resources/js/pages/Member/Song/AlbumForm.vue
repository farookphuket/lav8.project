<template>
    <div class="row">
        <!-- formarea START -->
        <div class="col-lg-12">

            <form action="">
                <div class="form-group">
                    <input v-model="abForm.album_name" class="form-control" 
                    type="text" placeholder="Enter Album Name..."
                    name="album_name">
                </div>

                <!-- cover url,upload file,preview show START -->
                <div class="row">
                    <div class="col-lg-6">
                        <input ref="album_cover_url" class="form-control" 
                        placeholder="Enter the image URL..."
                        @keydown.enter.prevent="showUrlPreview"
                        type="text" name="album_cover_url">
                        <p class="text-center">
                        *hit enter to show image ,select file on the right 
                        panel will be remove.
                        </p>
                    </div>
                    <div class="col-lg-6">
                        <input ref="album_cover_upload" class="form-control" 
                        type="file" name="album_cover_upload" 
                        @change.prevent="showUploadPreview">
                        <p class="pt-2 text-center">
                        * the image url on the left panel will be remove.
                        </p>
                    </div>
                    <div class="col-lg-12">
                       <div class="text-center" 
                        style="min-height:220px;"
                       v-show="isShowUploadPreview">
                            <img class="responsive mx-auto d-block" 
                            style="max-height:220px;"
                            :src="photo.url" 
                            :alt="photo.alt">
                            <p class="pt-2">
                                {{photo.alt}}
                            </p>
                       </div>
                    </div>
                </div>

                <!-- cover url,upload file,preview show END -->
                <!-- button float right START -->
                <div class="row">
                    <div class="col-lg-4">
                        <span class="text-center" v-html="res_status">
                            {{res_status}}
                        </span>
                    </div>

                    <div class="col-lg-8">
                        <div class="float-right btn-group mb-4">
                            <button class="btn btn-outline-primary" 
                            type="submit" @click.prevent="saveAlbum(album_id)">
                                <b-icon icon="check2-square"></b-icon>
                            </button>
                        </div>
                    </div>
                </div>
                <!-- button float right End -->
            </form>
        </div>
        <!-- formarea END -->


    </div>
</template>
<script>
export default{
    name:"AlbumForm",
             data(){
                 return{
                     isShowUploadPreview:false,
                     photo:'',
                     upload_obj:{
                         img:'',
                         file:null
                     },
                     album_id:0,
                    abForm:new Form({
                        album_name:''
                    }),
                    res_status:'',
                 }
             },
methods:{
            showUploadPreview(e){
                this.$refs.album_cover_url.value = ''
                this.isShowUploadPreview = false
                this.abForm.album_cover = ''

                const theFile = e.target.files[0]

                this.upload_obj.file = theFile
                this.upload_obj.img = URL.createObjectURL(theFile)

                this.photo = {
                    url:this.upload_obj.img,
                    alt:this.upload_obj.file.name
                }
                // set cover to form
                this.abForm.album_cover = theFile
                
                this.isShowUploadPreview = true
            },
            showUrlPreview(){
                this.$refs.album_cover_upload.value = ''
                this.isShowUploadPreview = true 

                this.abForm.album_cover = this.$refs.album_cover_url.value
                this.photo = {
                    url:this.$refs.album_cover_url.value,
                    alt:this.abForm.album_name
                }

            },
            saveAlbum(id){
                let url = `/album`
                let aData = new FormData()
                aData.append('album_name',this.abForm.album_name)
                aData.append('album_cover',this.abForm.album_cover)
                aData.append('album_pic_url',this.$refs.album_cover_url.value)

                if(id){
                    url = `/album/${id}`
                    aData.append('_method','put')
                }
                axios.post(url,aData)
                    .then(res=>{
                        this.res_status = res.data.msg

                        setTimeout(()=>{
                            this.res_status = ''
                            this.abForm.reset()
                            this.isShowUploadPreview = false

                            this.$emit('getAlbum')
                                },2200)
                            })
                .catch((err)=>{
                    this.res_status = `<span class="text-danger font-weight-bold">
                    ${Object.values(err.response.data.errors).join()}
                    </span>`
                        })

            },
        },
}
</script>
