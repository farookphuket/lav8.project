<template>
    <div>
        <ul class="list-group">
            <li class="list-group-item" v-for="re in lists">
                <a href="" @click.prevent="getURL(re.method,re.target_id,re.id)">
                    {{re.target_title}}
                </a> - 
                {{re.method}}
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
            lists:'',
        }
    },
    watch:{
        "result":function(x){
            this.lists = x
        }
    },
    methods:{
        getURL(method,target_id,id){
            this.$emit('getURL',{method,target_id,id})
        }
    },


}
</script>
