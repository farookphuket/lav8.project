<template>

  <div class="container">
    <div class="card card-body user_list" 
      v-for="li in users.data">
      <div class="clearfix">
        <div class="float-right">

          <button class="btn btn-outline-danger btn-sm "
            @click.prevent="delUser(li.id)" v-if="li.id != userId">
              <b-icon icon="trash"></b-icon>
          </button>
          <button class="btn btn-outline-danger btn-sm" disabled v-else>
              <b-icon icon="trash"></b-icon>
          </button>
        </div>
      </div>
      <div>
        <p>
        <span>
            <b-icon icon="person"></b-icon>
            {{li.name}}
        </span> &middot; 
        <span>
            <b-icon icon="envelope"></b-icon>
            {{li.email}}
        </span>
          
        </p>
        <p class="pt-2">
            <span>
                <b-icon icon="calenda2-day"></b-icon>
              {{moment(li.created_at)}}
            </span> &middot;
            <span>
                <b-icon icon="clock-history"></b-icon>
              {{moment(li.created_at).fromNow()}}
            </span> 
        </p>
      </div>
      <span>role</span>
      <ul>
       
        <li
         v-for="ro in li.roles">
            <span>
                <b-icon icon="tags"></b-icon>
                {{ro.role_name}}
            </span>
        </li>
      </ul>


        <div class="clearfix">
          <div class="float-right">
            <button class="btn btn-outline-primary btn-sm"
              @click.prevent="editUser(li.id)">
                <b-icon icon="arrow-up-circle"></b-icon>
              edit
            </button>
          </div>
        </div><!-- end div.clearfix -->

    </div><!-- end div.card-body -->
    <!-- ===== need some space ==== -->
    <div class="col-lg-12 pt-2 mb-4">&nbsp;</div>
    <!-- ===== need some space ==== -->


    <!-- ======== pagination START ======= -->
    <div class="nav-scroller py-1 mb-2">
        <nav class="nav d-flex justify-content-center">
            <ul class="pagination flex-wrap">

            <li class="page-item active">
                <div class="page-link disabled">
                    showing from 
                    <span>
                        {{users.from}}
                    </span>
                    to 
                    <span>
                        {{users.to}}
                    </span>
                    of 
                    <span>
                        {{users.total}}
                    </span>
                </div>
            </li>
            <li class="page-item" 
                v-for="li in users.links">
                <a v-if="li.active == false && li.url != null"
                   href="#" class="page-link p-2"
                   @click="goChangePage(li.url)"
                    v-html="li.label">
                {{li.label}}
                </a>
                <span class="page-link disabled active" v-else
                    v-html="li.label">
                    {{li.label}}
                </span>
            </li>
            <li class="page-item active">
                <span class="page-link">
                    <b-icon icon="book-half"></b-icon>
                    {{users.current_page}}
                </span>
            </li>
            </ul>
        </nav>
    </div>
    <!-- ======== pagination END ======= -->
  </div>
</template>

<style scoped>

.card-body{
  margin-top:1em;
}
.card-body .user_list ul,li{
  display:inline-block;
  padding:4px;
}


</style>

<script>

var moment = require('moment')
export default{
  name:"UserList",
  props:["users"],
  data(){
    return{
      moment:moment,
        userId:'',
    }
  },
    mounted(){
        this.userId = window.userId
        //console.log(this.userId)
    },

  methods:{
    editUser(id){
      this.$emit('editUser',id)
    },
    delUser(id){
      if(confirm(`are your sure you want to delete id ${id}?`) == true){
        this.$emit('delUser',id)
      }
    },
    goChangePage(url){
      this.$emit("goChangePage",url)
    }
  }
}
</script>
