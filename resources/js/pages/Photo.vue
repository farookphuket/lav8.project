<template>
    <div>
        <photo-search></photo-search>
        <photo-list></photo-list>
    </div>
</template>


<script>

import PhotoSearch from './PhotoSearch.vue'
import PhotoList from './PhotoList.vue'
export default{
    name:"PubPhoto",
             components:{
                PhotoSearch,
                PhotoList
             }

}
</script>
