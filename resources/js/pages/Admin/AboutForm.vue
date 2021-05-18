<template>
<div>

<!-- form START -->
    <div class="col-lg-12 pt-4 mb-4">
        <form >

            <div class="form-group">
                <select name="template" class="form-control" 
@change="setTemplate"
                    ref="selectTemplate">
                    <option value="0">--Select Template --</option>
                    <option :value="tt.id" v-for="tt in template" 
                    >
                    {{tt.title}}
                    </option>
                </select>
            </div>
            <div class="form-group">
                <jodit-editor
                    v-model="excerpt"
                    height=450></jodit-editor>
            </div><!--  end of div.form-group-->
            <div class="form-group">
                <jodit-editor
                    v-model="body"
                    height=450></jodit-editor>
            </div><!--  end of div.form-group-->
            <div class="clearfix">
                <div class="float-left">
                    <span v-html="res_status">
                        {{res_status}}
                    </span>
                </div>
                <div class="float-right">
                    <button 
                     @click.prevent="saveAbout(saveId)"
                        class="btn btn-primary">
                        Save
                    </button>
                </div>
            </div><!--  end of div.clearfix -->
        </form>
    </div>
<!-- form END -->


    <div class="col-lg-12 mb-4 pt-4">
        <div class="preview">
            <div class="card card-body">
               <h1 class="text-center">About</h1>
                <div class="pt-4 mb-2" v-html="excerpt">{{excerpt}}</div>
                <div v-html="body">{{body}}</div>
            </div>
        </div>
    </div>

</div>




</template>


<script>

export default{
    name:"AboutForm",
    props:["template","editId","about"],
    data(){
        return{
            excerpt:'',
            body:'',
            saveId:'',
            res_status:''
        }
    },
    mounted(){
        this.showAbout()
    },
    methods:{
        saveAbout(id){
            let data = {
                title:'about',
                slug:'about',
                excerpt:this.excerpt,
                body:this.body,
                is_public:true
            }
            let url = ''
            if(!id){
                url = '/admin/post'
                axios.post(url,data)
                    .then(res=>{
                        this.res_status = res.data.msg
                    })
            }else{
                url = `/admin/post/${id}`
                axios.put(url,data)
                    .then(res=>{
                        this.res_status = res.data.msg
                    })
            }
            setTimeout(()=>{
                location.reload()
            },3000)
        },
        showAbout(){
            if(!this.about.length){
                this.excerpt = `
                <div class="container">
                   <div class="row">
                       <div class="col-lg-4">
                        <img class="responsive mb-2" 
                        src="https://lh3.googleusercontent.com/cfOid3sYJtcVhxh6pXTQ9l2LfCTIDnPXGIY2TidhJRi2bkwzmtlZItSFINgzyFyG2FDXgfFS7bX1AQuzK03HOwJ-67Blc9oHtPD6QdrNpP_avEAYUhYyX6DLwuXKe5P_te8rbr0Ny4w=w1920-h1080" 
                        alt="your profile picture">
                        <p class="text-center pt-2">
                            your profile picture here
                        </p>
                       </div>
                       <div class="col-lg-8">
                            <h2 class="text-center">you are using default about page</h2>
                            <div>
                                <p>
                                    dear friends if you want to change this page just 
                                    edit it from the above form.
                                </p>
                                <div class="alert alert-warning">
                                    <h3 class="text-center">
                                        this will not show anywhere
                                    </h3>
                                    <p class="pt-2 mb-2">
                                    this is the template and will not be shown 
                                    in anywhere unless you press the Save 
                                    button 
                                    </p>
                                </div>
                            </div>
                       </div>
                   </div>
                </div>
                `
                this.body = `
                <div class="container">
                    <h2 class="text-center pt-2 mb-2">
                        your teams
                    </h2>
                    <p class="pt-2">
                    your company is very cool we work great in all season just 
                    for nothing.
                    </p>
                    <div class="row">
                        <div class="col-lg-4">
                            <img class="responsive" 
                            src="https://i.ibb.co/gvMphpd/IMG-20210420-201440.jpg" 
                            alt="วันหลังลาย">
                        </div>
                        <div class="col-lg-4">
                            <p>
                                this can be text or you can just delete it
                            </p>
                        </div>
                        <div class="col-lg-4">
                            <div class="video-container">
                                <iframe width="560" height="315" src="https://www.youtube.com/embed/q3Sanjl93dQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>
                            <p class="pt-2 mb-2">
                                how do I setup i3wm for manjaro(gnome)
                            </p>
                        </div>
                    </div>
                    <p class="pt-4">
                    down here you can put your location map or your contact 
                    information
                    </p>
                    <ul class="list-group">
                        <li class="list-group-item">
                            <b-icon icon="phone"></b-icon>
                            Tel : +66 95 954-3920
                        </li>
                        <li class="list-group-item">
                            <b-icon icon="envelope"></b-icon>
                            e-mail : firefrook@gmail.com
                        </li>
                        <li class="list-group-item">
                            <b-icon icon="book-half"></b-icon>
                            56 m.3 t.lam-suk a.ao-luk Krabi Thailand 81110
                        </li>
                    </ul>
                </div>

                `
            }else{
                this.about.forEach((val)=>{
                    this.excerpt = val.post_excerpt
                    this.body = val.post_body
                    this.saveId = val.id
                })
//                console.log(this.about)
            }

        },
        setTemplate(){
            let tm = this.$refs.selectTemplate.value 
            let url = `/admin/templates/${tm}`
            axios.get(url)
                .then(res=>{
                    let val = res.data.template
                        this.excerpt = val.excerpt
                        this.body = val.body
                })

        }
    },
}
</script>
