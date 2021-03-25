<template>
    <div>
        <div class="row">
            
            <div class="col-lg-12">
                <form class="pt-4">
                    <div class="form-group">
                        <input v-model="search" class="form-control" type="text" 
                        ref="search" v-on:keyup="searchPhoto"
                        placeholder="Search photo">
                    </div>
                </form>
            </div>
            <div class="col-md-2" v-show="search" v-for="ph in photos">
                <div class="card">
                    <a href="" @click.prevent="$emit('openPhoto',ph.id)">
                        <img class="card img-top" :src="ph.embed" alt="">
                    </a>

                    <div class="card-body">
                        <span class="badge badge-info">{{ph.title}}</span> 
                        &middot; 
                        <span class="badge badge-info">
                            {{moment(ph.created_at).fromNow()}}
                        </span>
                    </div>
                </div><!-- end of div.card -->
            </div><!-- end of div.col-md-3 search result -->
        </div><!-- end of div.row -->
    </div><!-- end of main div -->
</template>

<script>

var moment = require('moment')
export default{
    name:"PhotoSearch",
             data(){
                 return{
                    moment:moment,
                    photos:'',
                    search:"",
                    embed:'',
                    title:'',
                 }
             },
methods:{
            searchPhoto(){
                
                if(this.search.length >= 2){
                    this.photos = []
                    let url = `/search?search=${this.search}`
                    axios.get(url)
                    .then(res=>{
                        this.photos = res.data.photos

                            })
                }
            }
        }
}
</script>
