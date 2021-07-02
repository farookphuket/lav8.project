<template>
    <div>
        <ul class="list-group">
            <li class="list-group-item" v-for="re in result">
                <a href="" @click.prevent="getURL(re.method,re.target_id)">
                    {{re.target_title}}
                </a>

            </li>
        </ul>
    </div>
</template>

<script>
export default{
    name:"SearchList",
    props:["result"],
    data(){
        return{


        }
    },
    methods:{
        getURL(method,id){
            this.$emit('getURL',method,id)
        }
    },


}
</script>
