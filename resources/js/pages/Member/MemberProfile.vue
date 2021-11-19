<template>


  <div class="container">
    <h1>editing {{user_name}}'s profile</h1>
    <div class="clearfix">
      <div class="float-right">
        <p>
        last update
          <span class="badge badge-info">
            {{moment(user.updated_at)}}
          </span>
          <span class="badge badge-info">
            {{moment(user.updated_at).fromNow()}}
          </span>
        </p>
      </div>
    </div>

    <form action="" class="user_info">

      <div class="form-group">
        <label for="">name</label>
        <input v-model="user_name" class="form-control" type="text" name="">
      </div>

      <div class="form-group">
        <label for="">email</label>
        <input v-model="user_email" class="form-control" type="text" name="">
      </div>
      <div class="form-group">
        <label for="">new password</label>
        <p>
          if you DO NOT want to change you password leave this field blank
        </p>
        <input v-model="passwd" class="form-control" 
        type="text" placeholder="your new password">
      </div>
      <div class="form-group">
        <label for="">confirm password</label>
        <input v-model="passconf" 
        class="form-control" type="text" 
        placeholder="your current password">
      </div>

      <div class="clearfix">
        <div class="float-right">
          <button class="btn btn-outline-primary btn-sm"
            @click.prevent="saveInfo(user_id)">
            Update Profile
          </button>
        </div>
      </div>
    </form>

    <div v-html="res_status">{{res_status}}</div>
  </div>
</template>

<style scoped>

.user_info{
  margin-bottom:5em;
}
</style>

<script>
var moment = require('moment')
export default{
  name:"MemberProfile"
  ,props:["user"]
  ,data(){
    return{
      user_name:'',
      user_email:'',
      passconf:'',
      passwd:'',
      user_id:'',
      res_status:'',
      moment:moment
    }
  }
  ,mounted(){
    this.getInfo()
  }
  ,methods:{
    getInfo(){
      //console.log(this.user)
      this.user_email = this.user.email
      this.user_name = this.user.name
      this.user_id = this.user.id

    }
    ,saveInfo(id){
      let url = `/member/updateUserProfile`
      let data = {
        name:this.user_name,
        email:this.user_email,
        passwd:this.passwd,
        passconf:this.passconf
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
            Error! please check your input</span>`
        })

    }


  }//methods
}

</script>
