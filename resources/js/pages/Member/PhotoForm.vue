<template>
    <div>
        <div class="row">
            <div class="col-lg-12">
                <form>
                    <div class="form-group">
                        <input v-model="title" class="form-control" 
                        type="text" ref="title" placeholder="title">
                    </div>

                    <div class="form-group">
                        <input v-model="embed" class="form-control" 
                        type="text" ref="embed" 
                        placeholder="the url of photo eg: www.photo.com/photo.jpg">
                    </div>

                    <div class="clearfix">
                        <div class="float-left">
                            <span v-html="res_status">
                                {{res_status}}
                            </span>
                        </div>
                        <div class="float-right">
                            <button class="btn btn-outline-primary" 
                            @click.prevent="save(saveId)">Save</button>
                        </div>
                    </div>
                </form>
                
            </div><!-- end of div.col-lg-12 form -->

        </div><!-- end of div.row -->
    </div><!-- end of main div -->
</template>

<script>
export default{
    name:"photoform",
    props:["editId","photos"],
    watch:{
        "editId":function(x){
            this.getEditdata(x)
        }
    },
             data(){
                 return{
                    title:'',
                    embed:'',
                    saveId:0,
                    res_status:'',
                 }
             },
methods:{
            getEditdata(id){
                if(id == 0){
                    return
                }
                this.photos.data.forEach((val)=>{
                        if(val.id == id){
                            this.title = val.title
                            this.embed = val.embed
                            this.saveId = val.id
                        }
                        })
            },
            save(id){
                let url = ''
                let data = {
                    title:this.title,
                    embed:this.embed,
                }

                if(id){
                    url = `/member/photo/${id}`
                    axios.put(url,data)
                    .then(res=>{
                        this.res_status = res.data.msg
                        },err=>{
                            this.res_status = `<span class="badge badge-danger">
                            ${err.response.data.message}</span>`
                        })
                }else{
                    url = `/member/photo`
                    axios.post(url,data)
                    .then(res=>{
                        this.res_status = res.data.msg
                        },err=>{
                            this.res_status = `<span class="badge badge-danger">
                            ${err.response.data.message}</span>`
                        })
                }
                setTimeout(()=>{
                    this.$emit('getPhotos')
                    this.clearForm()
                        },2000) 
            },
            clearForm(){
                this.title = ''
                this.embed = ''
                this.saveId = 0
                this.res_status = ''
            },
        }
}
</script>
