<template>
    <div>
          <form class="form-inline" action="">
            <div class="form-group">

              <input v-model="uemail" class="form-control" type="email" 
              ref="uemail" placeholder="Enter email">
            </div>
            <div class="form-group">
              <input class="form-control" type="password" 
              v-model="upass" placeholder="Enter password">
            </div>
            <div class="form-group">
              <button class="btn btn-warning" @click.prevent="getLogin">Login</button>

              <button class="btn btn-info" 
                @click.prevent="signUp">register</button>
            </div>
          </form>
          <b-modal title="server said: "
            ref="onOk" centered @ok="closeBox" ok-only>
            <div v-html="res_status">
              {{res_status}}
            </div>
          </b-modal>
    </div>
</template>


<script>
export default{
    name:"LoginForm",
    data(){
        return{
            uemail:'',
            upass:'',
            res_status:'',
            error:0,
            url:''
        }
    },
    methods:{
        getLogin(){
            let data = {
                email:this.uemail,
                password:this.upass
            }
            let url = `/login`
            axios.post(url,data)
                .then(res=>{
                  //console.log(res)
                  if(res.data.user.is_admin == 1){
                    this.url = '/admin/home'
                  }else{
                    this.url = '/member/home'
                  }
                  this.res_status = `<span class="badge badge-success">
                    Welcome ${res.data.user.name}</span>`
                },err=>{
                  this.res_status = `<span class="bade badge-danger">
                    ${err.response.data.message}</span>`
                    this.error = 1
                })
          this.$refs["onOk"].show()
        },
      closeBox(){
        if(this.error != 0){
          location.reload()
        }else{
          location.href = this.url
        }

      },
      signUp(){
        let url = '/register'
        location.href=url
      }
    }
}
</script>
