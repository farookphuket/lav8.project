<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-12" v-if="videos.data == 0">
                <div class="alert alert-warning">
                    <h1 class="text-center">
                        There is no data now
                    </h1>
                </div>
            </div>
            <div class="col-md-4 pt-2" v-for="vi in videos.data" v-else>
                <div>
                    
                        <div class="video-container" v-html="vi.embed">
                            {{ vi.embed }}
                        </div>
                        <p class="pt-2 mb-2">
                            <a href="" @click.prevent="showVideo(vi.id)">
                                <b-icon icon="film"></b-icon> 
                                <a href="" :title="vi.title">
                                    {{ smartTitle(vi.title, 9) }}
                                </a>

                            </a>
                            -
                            <span class="badge badge-info">
                                <b-icon icon="clock-history"></b-icon> 
                                {{ moment(vi.created_at).fromNow() }}
                            </span>
                        </p>
                </div>
                <!-- end of div.card -->
            </div>
            <!-- end of div.col-md-4 -->
            <div class="col-lg-12 pt-2">&nbsp;</div>
            <!-- get the space between pagination and the content -->
            <div class="container" style="margin-top:2em;">
                <!-- Pagination div start-->
                <div class="nav-scroller py-1 mb-2">
                    <nav class="nav d-flex justify-content-center">
                        <ul class="pagination flex-wrap">
                            <li class="page-item disabled">
                                <div class="page-link">
                                    showing from
                                    <span>
                                        {{ videos.from }}
                                    </span>
                                    to
                                    <span>
                                        {{ videos.to }}
                                    </span>
                                    of
                                    <span>
                                        {{ videos.total }}
                                    </span>

                                </div>
                            </li>

                            <li class="page-item" v-for="li in videos.links">
                                <a class="page-link p-2"
                                    href=""
                                    @click.prevent="$emit('getVideos', li.url)"
                                    v-if="li.active != true && li.url != null"
                                    v-html="li.label"
                                >
                                    {{ li.label }}
                                </a>
                                <span class="page-link" v-html="li.label" v-else>
                                    {{ li.label }}
                                </span>
                            </li>

                            <li class="page-item active">
                                <span class="page-link">
                                    <b-icon icon="book-half"></b-icon>
                                    {{ videos.current_page }}
                                </span>
                            </li>
                        </ul>
                    </nav>
                </div>
                <!-- end of div.nav-scroller pagination -->
            </div>
        </div>
        <!-- end of div.row -->

        <b-modal :title="title" ref="showVideoModal" size="xl" hide-footer>
            <h2 class="text-center">
                {{ title }}
            </h2>
            <div class="container">
                <div class="video-container" v-html="embed">
                    {{ embed }}
                </div>
                <p>&nbsp;</p>

                <div class="form-group">
                    <textarea
                        class="form-control"
                        ref="showEmbed"
                        @click.prevent="selectText"
                        >{{ embed }}</textarea
                    >
                </div>
                <button
                    class="btn btn-outline-danger btn-block"
                    @click.prevent="closeBox"
                >
                    close
                </button>
            </div>
        </b-modal>
    </div>
    <!-- end of div.container -->
</template>

<script>
var moment = require("moment");

export default {
    name: "VideoList",
    props: ["videos"],
    data() {
        return {
            moment: moment,
            title: "",
            embed: "",
        };
    },
    methods: {
        showVideo(id) {
            this.videos.data.forEach((val) => {
                if (val.id == id) {
                    this.title = val.title;
                    this.embed = val.embed;
                }
                this.$refs["showVideoModal"].show();
            });
        },
        selectText() {
            this.$refs.showEmbed.select();
        },
        smartTitle(str, len) {
            return str.length > len ? str.substring(0, len) + "..." : str;
        },
        closeBox() {
            this.$refs["showVideoModal"].hide();
        },
    },
};
</script>
