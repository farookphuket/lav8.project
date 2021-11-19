<template>
    <div>
        <form action="">
            <div class="form-group">
                <input v-model="abForm.album_name" class="form-control" 
                type="text" name="album_name" placeholder="Album name">
            </div>
            <div class="form-group">
                <input  class="form-control" 
                type="text" name="album_pic_url" placeholder="Album image url" 
                @keydown.enter.prevent="showAlbumPic"
                ref="album_pic_url"
                >
            </div>

            <!-- upload file ,show preview -->
            <div class="row">
                <div class="col-lg-12">
                    <input class="form-control" type="file" 
                    name="album_pic_upload"
                    ref="album_pic_upload"
                    @change.prevent="showImagePreview">
                </div>
                <div class="col-lg-12">
                    <div style="max-height:250px;" 
                        class="text-center mt-4 mb-4"
                        v-show="isShowPreview">
                        <img class="responsive d-block mx-auto" :src="photo.url" 
                        style="max-height:240px;"
                        :alt="photo.alt">
                    </div>
                </div>
            </div>
            <!-- upload file ,show preview -->

            <div class="row">
                <div class="col-lg-8">
                    <span v-html="res_status" class="text-center font-weight-bold">
                        {{res_status}}
                    </span>
                </div>
                <div class="col-lg-4">
                    <div class="btn-group float-right mt-4 mb-4">
                        <button class="btn btn-outline-primary" 
                        @click.prevent="saveAlbum(albumId)" type="submit">
                            <b-icon icon="pen"></b-icon>
                        </button>

                        <button class="btn btn-outline-danger" 
                        @click.prevent="$emit('isCancelAddAlbum',true)">
                            <b-icon icon="x-circle"></b-icon>
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
export default{
    name:"AlbumForm",
    props:["isSearchAlbum"],
             data(){
                 return{
                     albumId:0,
                     isShowPreview:false,
                    abForm:new Form({
                        album_name:'',
                        album_cover:'',
                        album_pic_url:'',
                    }),
                    upload_item:{
                        img:'',
                        file:null
                    },
                    photo:'',
                    res_status:'',
                    errorMessage:''
                 }
             },
methods:{
            saveAlbum(id){
                let url = `/album`
                let abData = new FormData()
                abData.append('album_name',this.abForm.album_name)
                abData.append('album_cover',this.abForm.album_cover)
                abData.append('album_pic_url',this.$refs.album_pic_url.value)
                if(id){
                    abData.append('_method','put')
                }
                axios.post(url,abData)
                    .then(res=>{
                        this.res_status = res.data.msg
                        this.clearForm()
                            })
                .catch((err)=>{
                    this.errorMessage = `<span class="text-danger">
                        ${Object.values(err.response.data.errors).join()}
                    </span>`
                    this.res_status = this.errorMessage
                        })
            },
            showImagePreview(e){
                this.$refs.album_pic_url.value = ''
                this.isShowPreview = true
                this.photo = {}
                const theFile = e.target.files[0]
                this.upload_item.img = URL.createObjectURL(theFile)
                this.file = theFile 

                this.photo = {
                    url:this.upload_item.img,
                    alt:this.upload_item.file
                }
                this.abForm.album_cover = theFile
            },
            showAlbumPic(){
                this.isShowPreview = false
                this.$refs.album_pic_upload.value = ''
                    if(this.abForm.album_cover.length > 6){
                        this.isShowPreview = true
                            this.photo = {
                                url:this.$refs.album_pic_url.value,
                                alt:this.abForm.album_name
                            }
                    }
                this.abForm.album_cover = this.$refs.album_pic_url.value
            },
            clearForm(){
                // wait before clear
                setTimeout(()=>{
                    this.$refs.album_pic_url.value = ''
                    this.$refs.album_pic_upload.value = ''
                    this.abForm.reset()
                    this.errorMessage = ''
                    this.res_status = ''
                    this.isShowPreview = false
                },5200)
            },
        },
}
</script>
