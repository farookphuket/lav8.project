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
    <div class="pa">
      <ul class="pagination">
        <li class="page-item">
          showing fron 
          <span>
          {{users.from}}
          </span>
          to 
          <span>
            {{users.to}}
          </span>

          of 
          <span>{{users.total}}</span>
        </li>
        <li class="page-item"
          v-for="li in users.links">
          <a href="#" class="li.active?active:''"
            v-if="li.active != true && li.url != null"
            @click.prevent="goChangePage(li.url)"
            v-html="li.label">
            {{li.label}}
          </a>
          <span class="active" v-else
            v-html="li.label">
            {{li.label}}
          </span>

        </li>
        <li class="page-item">
          <span>{{users.current_page}}</span>
        </li>
      </ul>
    </div>
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
