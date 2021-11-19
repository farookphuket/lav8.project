<template>
    <span >
          <!-- Login form modal -->
            <button class="get-started-btn" 
            @click.prevent="showLoginForm">
                Login
            </button>
            <b-modal title="Login Form" ref="loginFormModal"
            size="xl" centered hide-footer>

            <form >

                <div class="form-group">

                    <input v-model="uemail"  
                    type="email" class="form-control" 
                    ref="uemail" placeholder="Enter email">
                </div>

                <div class="form-group">
                    <input  type="password" class="form-control" 
                    v-model="upass" placeholder="Enter password">
                </div>


                <button class="btn btn-outline-warning btn-block" 
                @click.prevent="getLogin">Login</button>

                <button class="btn btn-outline-info btn-block" 
                  @click.prevent="signUp">register</button>

                <button class="btn btn-outline-danger btn-block" 
                  @click.prevent="forgotpass">Forgot Password</button>
          </form>
            </b-modal>

          <!-- end of login form modal -->

          <b-modal title="server said: "
            ref="onOk" centered @ok="closeBox" ok-only>
            <div v-html="res_status">
              {{res_status}}
            </div>
          </b-modal>
    </span>
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
            url:'',
            found_user:false,
            isShow:false

        }
    },
    methods:{
                showLoginForm(){
                    this.$refs["loginFormModal"].show()
                },
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
                    setTimeout(()=>{
                        location.href=this.url
                    },1500)
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
      },
      forgotpass(){
        let url = "/forgot-password"
        location.href=url
      },
    }
}
</script>
