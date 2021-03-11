<template>
    <div class="row">
       <div class="col-lg-12">

        <div v-if="showForm==true" class="mb-4">
            <div class="float-right">
                <button class="mb-4 btn btn-outline-danger" @click.prevent="showForm=false">
                   close 
                </button>
            </div>


           <div class="mb-4"><!-- form div -->
 
            <div class="form-group">
                <input v-model="song" class="form-control" type="text" 
                name="">
            </div>


            <div class="form-group">
                <input v-model="url" class="form-control" type="text" 
                name="">
            </div>


            <div class="form-group">
                <input v-model="cover" class="form-control" type="text" 
                name="">
                <div class="col-lg-3">
                    <img class="responsive" :src="cover" alt="">
                </div>
            </div>

                <div class="row">
                    <div class="col-lg-6">
                        <div class="form-group">
                            <input class="form-control" type="text" name="">
                        </div>
                        <div class="form-group">
                            <select class="form-control" multiple="true">
                                <option value="">Artist</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="form-group">
                            <input class="form-control " type="text" 
                            v-model="album">
                        </div>
                        <div class="form-group">
                            <select class="form-control pt-2" multiple="true" 
                            ref="album">
                                <option value="">Album</option>
                                <option :value="al.id" v-for="al in albums">{{al.name}}</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="clearfix">
                    <div class="float-right">
                        <button class="btn btn-outline-primary">
                            Save
                        </button>

                        <button class="btn btn-outline-warning">
                            clear
                        </button>
                    </div>
                </div>
           </div><!-- form div -->



        </div>

        <div class="mb-4" v-else>
            <div class="float-right">

                <button class="mb-4 btn btn-outline-info" @click.prevent="showForm=true">
                    Add my song
                </button>
            </div>
        </div>
       </div><!-- end of div.col-lg-12 -->

    </div>
</template>

<script>
export default{
    name:"SongForm",
    props:["editId","artists","albums"],
             data(){
                 return{
                     showForm:false,
                     song:"",
                     cover:"",
                     url:"",
                     artist:"",
                     album:"",
                     saveId:0,
                     formData:{},

                 }
             },
watch:{
          "editId":function(x){
              this.getEditData(x)
          }
      },
methods:{
            getEditData(id){
                console.log(`the edit id ${id}`)
            }
        }
}
</script>
