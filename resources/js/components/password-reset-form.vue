<template>

    <!-- form will sent post request to 'password.reset' -->
    <div class="container">
        <p>
            dear friend please enter your new password before the time out 
            <b>please note</b> that this page will be expire soon .
        </p>
        <form>
            <div class="form-group">
                <label for="passwd" class="sr-only">New password</label>
                <input type="password" name="passwd" ref="passwd" class="form-control" placeholder="Enter your new password">
            </div>
            <p v-html="show" style="margin:1.5em;">{{show}}</p>
            <input @click.prevent="sendClick()" name="send" id="send" class="btn btn-block btn-info send-btn mb-4" type="submit" value="Reset My Password now DUDE">

            <a href="/"  style="color:white;font-weight:bold;" class="btn btn-primary btn-block  mb-4">
                Back Home
            </a>
        </form>
    </div>

</template>




<script>
export default{

    name:"PassReset",
    props: ['email'],
    email : '',
    uniqueId: '',
    timeout: '',
    
    data(){
        return{

            show: '',
            form: {
                passwd: ''
            },
            ip: [],
            timeout: [],
            uniqueId: [],

        }
    },

    mounted(){
        this.init()
    },

    methods: {
        sendClick(){
            //console.log(window.timeout);
            let url2 = '/update';
            axios.post(url2,{
                passwd: this.$refs.passwd.value,
                email: window.email,
            }).then(response=>{
                    this.show = response.data.msg;
                    setTimeout(()=>{
                        location.href='/login';
                    },5500);
                    },error=>{
                        console.log(error.response.data.message)
                        this.show = `<span class="badge badge-danger">
                        Error  ${error.response.data.message}!
                        </span>`

                    });
        },
        getMyInfo(){
            axios.get('/getmyresetinfo')
                .then(response => {
                    this.ip = response.data.ip;

                    });

        },
        init(){
            this.uniqueId = window.resettoken;
            this.timeout = window.timeout;

            if(this.timeout <= 0){
                alert("Sorry but your link has been expired!");
                window.location.href="/";
            }else{
                this.getMyInfo();
                this.getReloadPage();
            }
        },
        getReloadPage(){

            let myTime = setInterval(()=>{
                //location.reload();
            },35000);
            
            if(this.timeout <=1){
               clearInterval(myTime);
                myTime = 0;
                alert(`Your time for reset password is out now\n
                this page will be expire sonn`);
            }
        }



    }

}


</script>
