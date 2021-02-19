<template>
    <div class="container"><!-- main div element -->
        <div>
            <span v-for="li in tag_with_content">
                <a href="#" class="btn btn-outline-info btn-sm"
                    @click.prevent="getPostsByTagId(li.id)">
                {{li.tag_name}}
                </a>
            </span>
        </div>
    </div><!-- end of main element -->

</template>



<script>

export default{
    name:"Tagmember",
    props:["tag_with_content","tag_all"],
    methods:{
        getPostsByTagId(tag){
            this.$emit('getPostsByTagId',tag)
        }
    }
}
</script>
