<template>
    <div>
       <div class="row">
           <div class="col-lg-12">
                <form action="">
                    <div class="form-group">
                        <input v-model="search" class="form-control" 
                        type="text" ref="search" placeholder="Search photo...">
                    </div>
                </form>
           </div>
           <div class="col-lg-12">

           </div><!-- end of div.col-lg-12 search result -->
       </div><!-- end of div.row -->
    </div><!-- end of main div -->
</template>


<script>

export default{
    name:"PhotoSearch",
             data(){
                 return{
                    search:''
                 }
             },

}
</script>
