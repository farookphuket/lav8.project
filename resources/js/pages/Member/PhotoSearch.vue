<template>
    <div>
        <div class="row">
            <div class="col-lg-12">
                <form action="">
                    <div class="form-group">
                       <input v-model="search" class="form-control" 
                       type="text" v-on:keyup="searchPhoto" 
                       placeholder="Search photo...">
                    </div>
                </form>
            </div><!-- end of div.col-lg-12 form -->
            <div class="col-lg-3 pt-4 mb-4" v-show="search" 
            v-for="po in photo">
              <div class="card">
                <a href="" @click.prevent="$emit('openPhoto',po.id)">
                    <img class="card-img-top" :src="po.embed" alt="">
                </a>
                  <div class="card-body">
                    <p>
                        {{po.title}} - {{po.user.name}}
                    </p>
                  </div>
              </div>  
            </div><!-- end of div.col-lg-12 search result -->
        </div><!-- end of div.row -->
    </div><!-- end of main div -->
</template>


<script>

export default{
    name:"PhotoSearch",
             data(){
                 return{
                    photo:[],
                    search:'',
                 }
             },
methods:{
            searchPhoto(){
                if(this.search.length >= 2){
                    let url = `/search?search=${this.search}`
                    axios.get(url)
                    .then(res=>{
                        this.photo = res.data.photos
                    })
                }
            }, 
        },
}
</script>
