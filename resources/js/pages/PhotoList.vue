<template>
    <div>
        <div class="row">
            <div class="col-lg-3" v-for="po in photos.data">
                <div class="card">
                    <a href="" @click.prevent="openPhoto(po.id)">
                        <img class="card-img-top" :src="po.embed" alt="" />
                    </a>
                    <div class="card-body">
                        <span class="badge badge-info">
                            <b-icon icon="check-square"></b-icon> 
                            {{
                            smartTitle(po.title, 9)
                        }}</span>
                        &middot;
                        <span class="badge badge-info"> 
                            <b-icon icon="clock-history"></b-icon> 
                            {{
                            moment(po.created_at).fromNow()
                        }}</span>
                    </div>
                </div>
                <!-- end of div.card -->
            </div>
            <!-- end of div.col-lg-3 photo list -->
            <div class="col-lg-12 pt-4">
                    <ul class="pagination">
                        <li class="page-item">
                            showing from
                            <span>{{ photos.from }}</span> to
                            <span>{{ photos.to }}</span> of
                            <span>{{ photos.total }}</span> &middot;
                        </li>
                        <li class="page-item" v-for="li in photos.links">
                            <a
                                href=""
                                v-html="li.label"
                                v-if="li.active != true && li.url != null"
                                @click.prevent="$emit('getPhotos', li.url)"
                                >{{ li.label }}</a
                            >
                            <span class="active" v-html="li.label" v-else>{{
                                li.label
                            }}</span>
                            &middot;
                        </li>
                        <li class="page-item">
                            <b-icon icon="book-half"></b-icon> 
                            <span>{{ photos.current_page }}</span>
                        </li>
                    </ul>
            </div>
            <!-- end of div.col-lg-12 pagination -->
            <b-modal ref="showPhotoModal" :title="title" size="xl" hide-footer>
                <div class="card">
                    <img class="card-img-top" :src="embed" alt="" />
                    <div class="card-body">
                        <span class="badge badge-info">
                            {{ title }} &middot; {{ ownerName }}</span
                        >
                        &middot;
                        <span>
                            <b-icon icon="calendar2-day"></b-icon>
                            {{ moment(createdDate) }} &middot;
                            {{ moment(createdDate).fromNow() }}</span
                        >
                    </div>
                    <div class="form-group pt-4 mb-4">
                        <textarea
                            ref="copyCode"
                            class="form-control"
                            @click.prevent="selectCode"
                            >{{ embed }}</textarea
                        >
                    </div>
                            
                    <button
                        class="btn btn-outline-primary btn-block"
                        @click.prevent="showOriginal(embed)"
                    >
                        original
                    </button>
                    <button
                        class="btn btn-outline-danger btn-block"
                        @click.prevent="closeBox"
                    >
                        close
                    </button>
                </div>
            </b-modal>
        </div>
        <!-- end of div.row -->
    </div>
    <!-- end of main div -->
</template>

<script>
var moment = require("moment");



export default {
    name: "PhotoList",
    props: ["photos", "openId"],
    data() {
        return {
            moment: moment,
            title: "",
            embed: "",
            createdDate: "",
            ownerName: "",
        };
    },
    mounted() {
        //   this.sTitle = smartTitle(this.title,5)
    },
    methods: {
        openPhoto(id) {
            //console.log(this.photos.data)
            this.photos.data.forEach((val) => {
                if (val.id == id) {
                    this.title = val.title;
                    this.embed = val.embed;
                    this.ownerName = val.user.name;
                    this.createdDate = val.created_at;
                    //console.log(this.title)


                }
                this.$refs["showPhotoModal"].show();
            });
        },
        selectCode() {
            this.$refs.copyCode.select();
        },
        smartTitle(str, len) {
            return str.length > len ? str.substr(0, len) + "..." : str;
        },
        showOriginal(url){
            //open the photo in another tab
            window.open(url,'_blank')
            setTimeout(()=>{
                //close after 2500 milli sec 
                this.closeBox()
            },2500)
        },
        closeBox() {
            this.$refs["showPhotoModal"].hide();
        },
    },
};
</script>
