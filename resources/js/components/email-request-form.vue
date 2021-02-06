<template>

    <!-- form will sent post request to 'password.reset' -->
    <form>
        <div class="form-group">
            <label for="email" class="sr-only">Email</label>
            <input type="email" name="email" ref="email"  class="form-control" placeholder="Email address">
        </div>
        <p v-html='show'></p>
        <input @click.prevent="getClick()" name="send" id="send" class="btn btn-block btn-info send-btn mb-4" type="submit" value="sent My request desre">

        <a href="/"  style="color:white;font-weight:bold;" class="btn btn-primary btn-block  mb-4">
            Back Home
        </a>
    </form>

</template>




<script>
export default{
    name:"EmailReq",
    data(){
        return{
            show: '',
            form:   {
                email : ''
            }
        }
    },
    methods: {
        getClick(){

            let url1 = '/hello';
            axios.post(url1,{
                email : this.$refs.email.value
            })
                .then(response => {
                    this.show = response.data.msg;
              //      setTimeout(()=>{
              //          window.location.reload();
              //      },3500);

                });
        }
    }
}


</script>
