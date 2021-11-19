<template>
    <!-- form will sent post request to 'password.reset' -->
    <div class="container">
        <p v-html="msg">
        {{email}} {{msg}}
        </p>
        <form>
            <div class="form-group">
                <label for="passwd" class="sr-only">New password</label>
                <input 
                    type="password"
                    v-model="passwd"
                    ref="passwd"
                    class="form-control"
                    placeholder="Enter your new password"
                />

            </div>
            <p class="pt-4 mb-2">&nbsp;</p>
            <input
                @click.prevent="resetMyPassword"
                class="btn btn-block btn-outline-info send-btn mb-4"
                type="submit"
                :disabled="disabled"
                value="Reset My Password"
            />

            <a
                href="/"
                style="color:blue;font-weight:bold;"
                class="btn btn-outline-primary btn-block  mb-4"
            >
                Back Home
            </a>
        </form>
        <b-modal title="server Said :" ref="onOk" @ok="gohome" centered 
            ok-only>
            <div class="container" v-html="res_status">
                {{res_status}}
            </div>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: "PasswordReset",
    props:["resettoken"],
    data() {
        return {
            res_status: "",
            passwd: "",
            email:'',
            timeleft:20,
            theTime:0,
            msg:'',
            disabled:false
        }
    },
    mounted() {
        this.getLastStatus()
        this.theTime = setInterval(()=>{
            this.getLastStatus();

            if(this.timeleft <= 0){
                clearInterval(this.theTime)
                this.disabled = true
            }

        },39500)
    },
    methods: {
        getLastStatus() {
            let url = `/passwordreset/${this.resettoken}`
            axios.get(url)
                .then(res=>{
 //                   console.log(res.data)
                    let re = res.data

                    this.msg = re.msg
                    this.email = re.email
                    this.timeleft = re.timeleft
                })
        },
        resetMyPassword(){
            let url = `/update`
            let data = {
                email:this.email,
                passwd:this.passwd
            }
            axios.post(url,data)
                .then(res=>{
//                    console.log(res.data)
                    this.res_status = res.data.msg
                    this.$refs["onOk"].show()
                })
        },
        gohome(){
            location.href='/'
        },
    },
};
</script>
