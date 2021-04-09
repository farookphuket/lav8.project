<template>
    <div class="container">
        <div class="section-title">
        <h2>search</h2>
        </div>

        <form action="">
            <div class="form-group">
                <b-input-group>
                <b-input-group-prepend is-text>
                    <b-icon icon="search"></b-icon>
                </b-input-group-prepend>
                <input v-model="search" class="form-control" 
                v-on:keyup="searchPost"
                type="text" ref="search" placeholder="Search post">
                </b-input-group>
            </div>
        </form>
    </div>
</template>

<script>

export default{
    name:"PostSearch",
    data(){
        return{
            posts:[],
            search:'',
        }
    },
    methods:{
        searchPost(){
            console.log(this.search)
        }
    }
}
</script>
