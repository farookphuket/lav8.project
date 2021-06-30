<template>
    <div>

        <form>
            <div class="form-group">
                <label for="email" class="sr-only">Email</label>
                <input type="email" v-model="uemail" id="email" 
                class="form-control" placeholder="Email address">
            </div>
            <div class="form-group mb-4">
                <label for="password" class="sr-only">Password</label>
                <input type="password" 
                v-model="upass" id="password" 
                class="form-control" placeholder="***********">
            </div>
            <input name="login" @click.prevent="getLogin" 
            class="btn btn-block login-btn mb-4" type="submit" value="Login">

            <a href="/" style="color:white;font-weight:bold;" 
            class="btn btn-primary btn-block  mb-4">
                Back Home
            </a>
        </form>
        <a href="/forgot-password" 
        class="forgot-password-link">Forgot password?</a>
        <p class="login-card-footer-text">Don't have an account? 
        <a href="/register" class="text-reset">Register here</a></p>
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
    name:"LoginPage",
    data(){
        return{
            uemail:'',
            upass:'',
            res_status:'',
            error:0,
            url:'',
            found_user:false

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
