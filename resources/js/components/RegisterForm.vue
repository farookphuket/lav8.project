<template>
    <div>
        <div class="card-body">
            <p class="login-card-description">Register a new account</p>
            <form action="#" @submit.prevent="save" 
                @keydown="rForm.errors.clear($event.target.name)">
                <div class="form-group">
                    <label for="name" class="sr-only">Name</label>
                    <input v-model="rForm.name" type="text" class="form-control" 
                    name="name"  required autocomplete="name" autofocus 
                    ref="name"
                    placeholder="Name">

                <span class="alert alert-danger " 
                      style="margin-top:1.5em;"
                    v-text="rForm.errors.get('name')"
                    v-if="rForm.errors.get('name')"
                ></span>
                </div>

                
                <div class="form-group">
                    <label for="email" class="sr-only">Email</label>
                    <input v-model="rForm.email" type="email" class="form-control" 
                    name="email"  required autocomplete="email"  
                    placeholder="Email address">
                    
                <span class="alert alert-danger " 
                      style="margin-top:1.5em;"
                    v-text="rForm.errors.get('email')"
                    v-if="rForm.errors.get('email')"
                ></span>
                   
                </div>
                <div class="form-group mb-4">
                    <label for="password" class="sr-only">Password</label>
                    <input v-model="rForm.password" type="password" class="form-control" name="password" required autocomplete="new-password" placeholder="Password">

                <span class="alert alert-danger " 
                      style="margin-top:1.5em;"
                    v-text="rForm.errors.get('password')"
                    v-if="rForm.errors.get('password')"
                ></span>
                </div>
                <div class="form-group mb-4">
                    <label for="password" class="sr-only">Password</label>
                    <input v-model="rForm.password_confirmation" type="password" class="form-control" name="password_confirmation" required autocomplete="new-password" placeholder="Confirm password">

                <span class="alert alert-danger " 
                      style="margin-top:1.5em;"
                    v-text="rForm.errors.get('password_confirmation')"
                    v-if="rForm.errors.get('password_confirmation')"
                ></span>
                </div>
                <div class="form-group mb-4">
                    <div v-html="res_status">{{res_status}}</div>
                </div>
                <input name="register" id="register" class="btn btn-block login-btn mb-4" type="submit" value="Register">
                <a href="/" style="color:white;font-weight:bold;" class="btn btn-primary btn-block  mb-4">
                    Back Home
                </a>
            </form>
            <a href="/forgot-password" class="forgot-password-link">Forgot password?</a>
            <p class="login-card-footer-text">Lost password? 
                <a href="/forgot-password" 
                    class="text-reset">Reset Password</a></p>
            <nav class="login-card-footer-nav">
                <a href="#!">Terms of use.</a>
                <a href="#!">Privacy policy</a>
            </nav>
        </div>
    </div>
</template>

<script>
export default{
    name:"RegisterForm",
    data(){
        return{
            res_status:'',
            rForm:new Form({
                name:'',
                email:'',
                password:'',
                password_confirmation:''
            }),
        }
    },
    methods:{
        save(){
            let url = `/register`
            this.rForm.submit("post",url)
                .then((res)=>{
                    this.res_status = res.msg
                })
                .catch((err)=>{
                    let ob = Object.values(err)
                    this.res_status = `<span class="alert alert-danger">
                        ${ob.join()}</span>`
                })
            setTimeout(()=>{
                this.res_status = ''
            },3200)
        },

    }
}
</script>
