<template>
    <div class="container">
        <div :class="visitorCount"
            v-show="showVisitorList === true">
            <ul class="visitorCount row">
                <li class="visitorCount-item" >
                    ip   {{ip}} 
                </li>
                <li class="visitorCount-item">Browser {{browser}}</li>
                <li class="visitorCount-item">OS {{os}}</li>
                <li class="visitorCount-item">All visitors {{numAllTime}}</li>
                <li class="visitorCount-item">Today {{numToday}}</li>
                <li class="visitorCount-item">This Month {{numThisMonth}}</li>
                <li class="visitorCount-item">This Year {{numThisYear}}</li>
            </ul>
        </div>
    </div>

</template>


<style scoped>


.visitorCount{
    padding: 0;
      margin: 0;
      list-style: none;
      
      -ms-box-orient: horizontal;
      display: -webkit-box;
      display: -moz-box;
      display: -ms-flexbox;
      display: -moz-flex;
      display: -webkit-flex;
      display: flex;
      flex-direction:column;
    
}
.visitorCount li{
    color:white;
    padding:5px;
}

.row            { 
  -webkit-flex-direction: row; 
  flex-direction: row;
}

.visitorCount-item{
    background: tomato;
    margin: 5px;
    line-height: 30px;
    color: white;
    font-weight: bold;
    font-size: 16px;
    text-align: center;
}



@media only screen and (max-width: 480px){

    .visitorCount{
        margin-top:2em;
    }
    .visitorCount ul,li{
        display:block;
        margin-top:2em;
        color:blue;
        
    }

}
</style>


<script>
export default{
    data(){
        return{
            ip : [],
            browser : [],
            os : [],
            numToday : [],
            numThisMonth : [],
            numThisYear : [],
            numAllTime : []
            ,showVisitorList:false,

        }
    },
    mounted(){
        this.visitorCount()
        this.scrollToBottom();
    },
    methods:{

        visitorCount(){
            //  edit 'laravel8.my' to your website name
            let url1 = '/visitors'
            axios.get(url1)
                    .then(response => {
                        this.ip = response.data.ip;
                        this.browser = response.data.browser;
                        this.os = response.data.os;
                        this.numToday = response.data.numToday;
                        this.numThisMonth = response.data.numThisMonth;
                        this.numThisYear = response.data.numThisYear;
                        this.numAllTime = response.data.numAllTime;
                    });
        },
        scrollToBottom(){
            //from https://renatello.com/check-if-a-user-has-scrolled-to-the-bottom-in-vue-js/
            // 16 Jan 2021
            window.onscroll = () => {
                    let bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight

                    if (bottomOfWindow) {
                     this.showVisitorList = true // replace it with your code
                    }
                  }
        }
    }
}
</script>
