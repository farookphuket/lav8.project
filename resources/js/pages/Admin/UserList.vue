<template>

  <div class="container">
    <div class="card card-body user_list" 
      v-for="li in users.data">
      <div class="clearfix">
        <div class="float-right">

          <button class="btn btn-danger close"
            @click.prevent="delUser(li.id)">
            &times;
          </button>

        </div>
      </div>
      <div>
        <p>
        name  {{li.name}} email {{li.email}}
        </p>
        
      </div>
      <span>role</span>
      <ul>
       
        <li
         v-for="ro in li.roles">
          {{ro.role_name}}
        </li>
      </ul>


      <ul>
        <li>
          create

            <span class="badge badge-info">
              {{moment(li.created_at)}}
            </span>
        </li>
        <li>

            &middot;
            <span class="badge badge-info">
              {{moment(li.created_at).fromNow()}}
            </span>
        </li>
        <li>
          update 

            <span class="badge badge-info">
              {{moment(li.updated_at)}}
            </span>
        </li>
        <li>
            &middot;
            <span class="badge badge-info">
              {{moment(li.updated_at).fromNow()}}
            </span>
        </li>
      </ul>
        <div class="clearfix">
          <div class="float-right">
            <button class="btn btn-primary"
              @click.prevent="editUser(li.id)">
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
      moment:moment
    }
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
