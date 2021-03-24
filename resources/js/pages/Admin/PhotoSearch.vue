<template>
    <div>
        <div class="row">
            
            <div class="col-lg-12">
                <form class="pt-4">
                    <div class="form-group">
                        <input v-model="search" class="form-control" type="text" 
                        ref="search" placeholder="Search photo">
                    </div>
                </form>
            </div>
            <div class="col-lg-12">
                {{search_result}}
            </div>
        </div>
    </div>
</template>

<script>


export default{
    name:"PhotoSearch",
             data(){
                 return{
                    search_result:'',
                    search:"",
                    embed:'',
                    url:'',
                    title:'',
                 }
             }
}
</script>
