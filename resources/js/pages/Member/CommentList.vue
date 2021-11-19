<template>
  <div  style="margin-top:4em;">

          <ul class="list-group">
              <li class="list-group-item" style="margin-top:2em;" 
                  v-for="co in comments.data">
                  <div class="row">
                    <div class="col-md-10">
                        <h3 class="text-center">{{co.comment_title}}</h3>
                        <div v-html="co.comment_body">
                            {{co.comment_body}}
                        </div>

                    </div>
                    <div class="col-md-2">
                        <ul class="list-group">
                            <li class="list-group-item">
                                <span class="float-right">
                                    <b-icon icon="calendar2-day"></b-icon>
                                    <a href="" :title="moment(co.created_at)">
                                        {{moment(co.created_at).fromNow()}}
                                    </a>
                                </span>
                            </li>
                            <li class="list-group-item">
                                <span>
                                    <b-icon icon="person"></b-icon>
                                    <a href="" :title="co.email">
                                        {{co.name}}
                                    </a>
                                </span>
                            </li>
                            <li class="list-group-item" v-if="co.user_id == owner_id">
                                    <button class="btn btn-outline-danger" 
                                        @click.prevent="$emit('del',co.id)">
                                        <b-icon icon="trash"></b-icon>
                                    </button>
                            </li>
                        </ul>

                    </div>

                  </div>

              </li>
          </ul>
        <!-- =============== pagination ============ -->
       <div style="margin-top:2em;">

                <div class="nav-scroller py-1 mb-2 mt-4" v-show="showPagination">
                    <nav class="nav d-flex justify-content-center">
                        <ul class="pagination flex-wrap">
                            <li class="page-item disabled">
                                <div class="page-link">
                                    showing from {{comments.from}}
                                    to <span>{{comments.to}}</span> of
                                    <span>{{comments.total}}</span>
                                </div>
                            </li>
                            <li class="page-item" v-for="li in comments.links">
                                <a class="page-link p-2" href="" v-html="li.label"
                                    v-if="!li.active && li.url != null"
                                    @click.prevent="$emit('getPostComment',li.url)">
                                    {{li.label}}
                                </a>
                                <span class="page-link active"
                                    v-html="li.label" v-else>
                                    {{li.label}}
                                </span>
                            </li>
                            <li class="page-item active">
                                <span class="page-link ">
                                    <b-icon icon="book-half"></b-icon>
                                    {{comments.current_page}}
                                </span>
                            </li>
                        </ul>
                    </nav>
                </div>

       </div>
        <!-- =============== pagination ============ -->

  </div>
</template>
<script>
var moment = require("moment")
export default{
    name:"CommentList",
    props:["comments","owner_id","showPagination"],
    data(){
        return{
            moment:moment,
        }
    },
}
</script>
