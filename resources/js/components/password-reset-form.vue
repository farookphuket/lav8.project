<template>
    <!-- form will sent post request to 'password.reset' -->
    <div class="container">
        <p v-html="msg">
            {{msg}}
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
            <p  class="pt-4 mb-4">{{ res_status }}</p>
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
           //         console.log(res.data)
                    let re = res.data
                    this.msg = re.msg
                    this.timeleft = re.timeleft
                })
        },
    },
};
</script>
