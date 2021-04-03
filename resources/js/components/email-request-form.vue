<template>
    <!-- form will sent post request to 'password.reset' -->
    <form>
        <div class="form-group">
            <label for="email" class="sr-only">Email</label>
            <input
                type="email"
                ref="email"
                v-model="email"
                class="form-control"
                placeholder="Email address"

            />
        </div>
        <p  v-html="res_status">{{ res_status }}</p>
        <input
            @click.prevent="sentResetLink"
            class="btn btn-block btn-outline-info send-btn mb-4"
            type="submit"
            value="sent email"
        />

        <a
            href="/"
            style="color:blue;font-weight:bold;"
            class="btn btn-outline-primary btn-block  mb-4"
        >
            Back Home
        </a>
    </form>
</template>

<script>
export default {
    name: "EmailReq",
    data() {
        return {
            res_status: "",
            email:'',
        };
    },
    mounted() {
        this.res_status = `<span class="badge badge-info">Waiting...</span>`;
    },
    methods: {
        sentResetLink() {
            if(!this.$refs.email.value){
                this.$refs.email.focus()
            }
            let url = `/hello`
            let formData = {email:this.email}
            axios.post(url,formData)
                .then(res=>{
                    this.res_status = res.data.msg
                },err=>{
                    this.res_status = `<span class="badge badge-danger">
                        ${err.response.data.message}</span>`
                })
            setTimeout(()=>{
                this.clearForm()
            },5000)
        },
        clearForm(){
            this.res_status = ''
            this.email = ''
        },
    },
};
</script>
