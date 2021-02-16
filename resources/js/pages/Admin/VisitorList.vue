<template>
    <div>

        <table class="table table-striped">
            <thead>
                <th>ip</th>
                <th>Browser</th>
                <th>os</th>
                <th>
                    day
                </th>
                <th>month</th>
                <th>year</th>
                <th>Manage</th>
            </thead>
            <tbody>
                <tr>
                    <td colspan=7>
                        <div class="clearfix">
                            <div class="float-left">

                                Has <span class="badge badge-info">
                                    {{visitors.total}}
                                </span> 
                                 
                                <span v-show="checkForDelete != 0">
                                    &middot;
                                    item to be remove {{checkForDelete.length}}
                                </span>
                                 <span class="badge badge-danger" 
                                       v-if="checkForDelete != 0">
                                     {{checkForDelete}}</span>  

                                 <span v-show="checkForDelete != 0">
                                    &middot;
                                     {{oldLeft}} 
                                     after the operation</span> 
                            </div>
                            
                            <div class="float-right">
                                <button class="btn btn-danger" 
                                        v-if="checkForDelete != 0"
                                   @click.prevent="$emit('delSelect',checkForDelete)" 
                                   >delete select</button>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr v-for="li in visitors.data" >
                    <td>{{li.client_ip}} </td>
                    <td>{{li.client_browser}}</td>
                    <td>{{li.client_os}}</td>
                    <td>{{li.last_visited_date}}</td>
                    <td>{{li.visited_month}}</td>
                    <td>{{li.visited_year}}</td>
                    <td>
                        <div class="clearfix">
                            <div class="float-right">
                                <label for="">
                                    <input id="" class="form-control" 
                                   v-model="checkForDelete"  
                                   v-on:change="getTotal()"
                                   :true-value="1"
                                   :value="li.id" type="checkbox" name="">
                                    Mark for delete
                                </label>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colspan=7>
                        <div class="clearfix">
                            <div class="float-left">
                                Has <span class="badge badge-info">
                                    {{visitors.total}}
                                </span>  
                                <span v-show="checkForDelete != 0">
                                    &middot;
                                    item to be remove {{checkForDelete.length}}
                                </span>
                                 <span class="badge badge-danger" 
                                       v-if="checkForDelete != 0">{{checkForDelete}}</span>  
                                 <span v-show="checkForDelete != 0">
                                    &middot;
                                     {{oldLeft}} 
                                   left  after the operation</span> 
                            </div>
                            <div class="float-right">
                                <button class="btn btn-danger" 
                                v-if="checkForDelete != 0"
                                @click.prevent="$emit('delSelect',checkForDelete)"
                                >delete select</button>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>

        </table>
        <div class="pa">
            <ul class="pagination">
                <li class="page-item">
                    showing from  
                    <span>{{visitors.from}} </span> 
                    to <span>{{visitors.to}} </span> 
                    of <span>{{visitors.total}}</span> &middot;
                </li>
                <li class="page-item" v-for="li in visitors.links">  
                    <a href="" v-if="li.active != true && li.url != null"
                        @click.prevent="$emit('getVisitors',li.url)" v-html="li.label">
                        {{li.label}} 
                    </a>
                    <span class="active" v-else v-html="li.label">
                        {{li.label}} 
                    </span>

                </li>
                <li class="page-item">
                   &middot; <span class="active">
                        {{visitors.current_page}}
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default{
    name:"VisitorList",
    props:["visitors"],
    data(){
        return{
            checkForDelete:[],
            totalLeft:0,
            oldLeft:0

        }
    },
    watch:{
        "visitors":function(x){
            this.getFresh()
            this.totalLeft = x.total
        },

    },
    mounted(){
        //this.getFresh()
    },
    methods:{
        getFresh(){
            this.checkForDelete = []
        },
        getTotal(){
            this.oldLeft = 0
            let plus = ''
            let minus = ''
            if(this.checkForDelete.length == +1){
                minus = this.totalLeft-this.checkForDelete.length
                this.oldLeft = minus
            }else{
                plus = this.totalLeft
                this.oldLeft = plus-this.checkForDelete.length
            }
            return this.oldLeft
        }
    }
}
</script>
