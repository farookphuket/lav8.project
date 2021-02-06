<template>
    <div class="container">
                <h1>display post in tag using vue</h1>
                <p>
                what left to do is the pagination and styling!
                </p>
                <div class="card card-body"
                    v-for="item in posts.data"
                    :tagId="item.pivot.tag_id"
                    >
                    <h3>
                        <a href="" @click.prevent="goRead(item.slug)">
                            {{item.post_title}}
                        </a>
                    </h3>
                    <div class="clearfix">
                        <div class="float-right">
                            <span>{{item.slug}}</span>
                            &middot;
                            <span>{{item.name}}</span>
                        </div>
                    </div>
                </div><!-- end of .card-body -->


            <div class="pa">
                <ul class="pagination">
                    <li class="page-item">
                        showing 
                        <span>
                            {{posts.from}}
                        </span>
                        to 
                        <span>{{posts.to}}</span>
                        of 
                        <span>{{posts.total}}</span>
                    </li>
                    <li class="page-item"
                        v-for="li in posts.links" 
                        :tagkey="li.label"
                        >
                        <a href=""
                            v-html="li.label"
                            v-if="!li.active && li.url !== null"
                            @click.prevent="getPosts(li.url)">

                            {{li.label}}
                        </a>
                        <span v-html="li.label" v-else>
                            {{li.label}}
                        </span>
                    </li>
                    <li class="page-item">
                        <span>{{postlist.current_page}}</span>
                    </li>
                </ul>

            </div><!-- end of  div.pa for pagination-->



    </div>



</template>

<style scoped>
.card-body{
    margin-top:1em;
}
.pa ul,li{
    padding:5px;

}
</style>

<script>


export default{

    props: ["postlist","owner_name","tag_id"],
    data(){
        return{
            posts:[]
            ,ownerName: ''
            ,tag: ''
        }
    }
    ,mounted(){
        this.tag = this.tag_id;
        this.getPosts();
        console.log(this.$cookies.keys())
     //   if(this.$cookies.get("old_tag_page")){
     //       this.$cookies.remove("old_tag_page")
     //   }

     //   console.log(this.$cookies.keys())
    }
    ,methods:{
        getPosts(page){
            let url = '';
            if(page){
                url = page
                this.$cookies.set("tag_old_page",url)
            }
            url = this.$cookies.get("tag_old_page")
            if(!url){
                url = `/admin/getPostsInTag/${this.tag}`
            }
            axios.get(url)
                .then(res=>{
                    console.log(res.data)
                    this.posts = res.data.posts;
                })
        }
        ,goRead(slug){

            let url = `/admin/post/${slug}`;
            location.href=url;
        }
    }
}
</script>
