<template>
  <div class="container-fluid">
    <div class="container">
      <form >
        <div class="form-group">
          <label for="">name</label>
          <input v-model="user_name" placeholder="Enter name"
            ref="user_name"
          class="form-control" type="text">
        </div>

        <div class="form-group">
          <label for="">Email</label>
          <input v-model="user_email" placeholder="Enter email"
          class="form-control" type="text">
        </div>

        <div>

          <div class="clearfix">
            <div class="float-left" 
              v-show="user_roles">
              <span class="badge badge-info"
                v-for="li in user_roles">
                {{li.role_name}}
              </span>
            </div>

            <div class="float-right">
              <span v-for="ro in roles">
                <label for="" class="role_list">
                  <input v-model="user_select_role" 
                         :value="ro.id"
                         
                  type="checkbox">
                  {{ro.role_name}}
                </label>
              </span>

              <button class="btn btn-outline-primary btn-sm"
                @click.prevent="saveUser(editId)">Save</button>
            </div>
          </div>

        </div>
      </form>
    </div>

    <b-modal 
      ref="onOk"
      title="response message"
      @ok="modClose"
      ok-only>
      <div v-html="res_status">{{res_status}}</div>
    </b-modal>
    <user-list 
      :users="users" 
      @goChangePage="getUsers($event)"
      @delUser="delUser($event)"
      @editUser="editUser($event)"></user-list>
  </div>



</template>

<style scoped>

.role_list{
  padding:5px;
  background-color:#007bff;
}
label.role_list{
  color:white;
  padding:7px;
  margin:2px;
}

</style>

<script>
import UserList from './UserList.vue'
export default{
  name:"ManageUser",
  components:{
    UserList
  },
  data(){
    return{
      users:[],
      roles:[],
      user_name:'',
      user_email:'',
      user_roles:[],
      user_select_role:[],
      editId:0,
      res_status:'',
      error:0
    }
  },
  mounted(){
    this.getUsers()
  },
  methods:{
    getUsers(page){
      let url = ``

      if(page){
        url = page
        this.$cookies.set("user_old_page",url)
      }
      url = this.$cookies.get("user_old_page")
      if(!url){
        url = `/admin/getUserList`
      }
      axios.get(url)
        .then(res=>{
          this.users = res.data.users
          this.roles = res.data.roles
          //console.log(this.users)
          
        })
    },
    editUser(id){
      let url = `/admin/user/${id}/edit`
      axios.get(url)
        .then(res=>{
          res.data.user.forEach((val)=>{
            //console.log(val)
            this.user_name = val.name
            this.user_email = val.email
            this.user_roles = val.roles
            this.editId = val.id
            this.$refs.user_name.focus()
            window.scrollTo(0,0)
          });
        });
    },
    saveUser(id){
      let url = '';
      let data = {
        name:this.user_name,
        email:this.user_email,
        roles:this.user_select_role
      }
      if(id){
        url = `/admin/user/${id}`
        axios.put(url,data)
          .then(res=>{
            this.res_status = res.data.msg
          })
          .catch(err=>{
            this.error = 1
            this.res_status = `<span class="alert alert-danger">
              There is some error</span>`
          })
      }else{
        url = `/admin/user`
        axios.post(url,data)
          .then(res=>{
            this.res_status = res.data.msg

          })
          .catch(err=>{
            this.res_status = `<span class="alert alert-danger">
              There is some error</span>`
          })

      }

        this.$refs["onOk"].show()
    },
    delUser(id){
      let url = `/admin/user/${id}`
      axios.delete(url)
        .then(res=>{
          this.res_status = res.data.msg
          this.error = 0;
        })
        .catch(err=>{
          this.res_status = `<span class="alert alert-danger">
            Error : operation fail! </span>`;
          console.log(err)
        })
        this.$refs["onOk"].show()
    },
    modClose(){
      if(this.error == 0){
        this.getUsers()
        this.clearForm()
      }
    },
    clearForm(){
      this.user_email = '';
      this.res_status = '';
      this.user_name = '';
      this.editId = '';
      this.user_select_role = []
      this.user_roles = []
    },
    
  }

}

</script>
