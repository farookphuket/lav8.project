<template>

  <div class="container">
    <h1 class="text-center">Editing {{user.name}}'s profile</h1>
    <div class="clearfix">
      <div class="float-right">
        <p>
        Last update 
        <span class="badge badge-info">
          {{moment(user.updated_at)}}
        </span>
        
        <span class="badge badge-info">
         &middot; {{moment(user.updated_at).fromNow()}}
        </span>
        </p>
      </div>
    </div>
    <form class="user_info">
      <div class="form-group">
        <label for="">Name</label>
        <input v-model="user_name" 
        class="form-control" type="text">
      </div>
      <div class="form-group">
        <label for="">Email</label>
        <input v-model="user_email" 
        class="form-control" type="email">
      </div>
      <div class="form-group">
        <label for="">New Password</label>
        <p>
        <b>Leave</b>
        this field blank if you don't want to change your password
        </p>
        <input v-model="passwd" 
        class="form-control" type="password"
        placeholder="your new password">
      </div>
      <div class="form-group">
        <label for="">Confirm</label>
        <input v-model="passconf" 
        class="form-control" type="text"
        placeholder="please enter your current password">
      </div>
      <div class="clearfix">
        <div class="float-left">
          <span v-html="res_status">
            {{res_status}}
          </span>
        </div>
        <div class="float-right">
          <button class="btn btn-primary"
            @click.prevent="updateInfo(user.id)">
            Update
          </button>
        </div>
      </div>
    </form>
  </div>
</template>



<script>
var moment = require('moment')
export default{
  name:"AdminProfile"
  ,props:["user"]
  ,data(){
    return{
      moment:moment,
      user_name:'',
      user_id:'',
      user_email:'',
      passwd:'',
      passconf:'',
      res_status:''
    }
  }
  ,mounted(){
    this.getInfo()
  }
  ,methods:{
    updateInfo(id){
      let url = `/admin/updateadminprofile`
      let data = {
        name:this.user_name,
        email:this.user_email,
        passwd:this.passwd,
        passconf:this.passconf,

      }

      axios.post(url,data)
        .then(res=>{
          this.res_status = res.data.msg
          setTimeout(()=>{
            location.reload()
          },2500)
        })
        .catch(err=>{
          this.res_status = `<span class="badge badge-danger">
            Error! check your input</span>`
        })
    }
    ,getInfo(){
      this.user_name = this.user.name
      this.user_email = this.user.email
    }
  }
}//end of export

</script>
