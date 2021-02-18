<template>
    <span class="nav-link">
          <!-- Login form modal -->

            <form class="form-inline my-2 my-lg-0" action="">

              
                <input v-model="uemail"  type="email" 
                                         class="col-md-4"
                ref="uemail" placeholder="Enter email">

                <input  type="password" class="col-md-4" 
                v-model="upass" placeholder="Enter password">


                <button class="btn btn-outline-warning btn-sm" @click.prevent="getLogin">Login</button>

                <button class="btn btn-outline-info btn-sm" 
                  @click.prevent="signUp">register</button>
          </form>

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
