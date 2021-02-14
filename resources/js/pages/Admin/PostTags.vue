<template>


    <div class="container">
        <div class="clearfix">
            <div class="float-right tags">
                <ul>
                    <li v-for="ll in tag_has_content" :tagkay="ll">
                        <a href="" @click.prevent="$emit('getPostByTagId',ll.id)">
                            {{ll.tag_name}} 
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
.tags{

}
.tags ul,li{
    display:inline-block;
}
.tags li{
    background-color:#20c997;
    border-radius:2px;
}
.tags a{
    font-size:12px;
    color:white;
    font-weight:bold;

}

.tags a:hover{
    font-size:15px;
    color:blue;
    font-weight:bold;
    background-color:#6c757d;

}
</style>


<script>


export default{

    name:'PostTags',
    props:["tag_all","tag_has_content"],
    data(){
        return{
            msg: '',
            tags:[],
            tag_with_content: [],
            postsData: []
        }
    }
}




</script>
