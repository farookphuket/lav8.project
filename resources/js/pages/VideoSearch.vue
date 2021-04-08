<template>
    <div>
        <div class="row">
            <div class="container pt-4">
                <div class="section-title">
                    <h2>Video</h2>
                </div>
                <form action="">
                    <div class="form-group">
                        <input
                            v-model="search"
                            class="form-control"
                            placeholder="Search video..."
                            type="text"
                            v-on:keyup="searchVideo"
                        />
                    </div>
                </form>
            </div>
            <!-- end of div.col-lg-12 form -->
            <div
                class="col-lg-3 pt-4 mb-4"
                v-show="search"
                v-for="vi in videos"
            >
                <div class="card">
                    <div class="video-container" v-html="vi.embed">
                        {{ vi.embed }}
                    </div>
                    <div class="card-body">
                        <p class="pt-2 mb-4">
                            <a href="" @click.prevent="openVideo(vi.id)">
                                {{ smartTitle(vi.title, 13) }}
                            </a>
                        </p>
                        &middot;
                        <span class="badge badge-info">{{ vi.user.name }}</span>
                        &middot;
                        <span class="badge badge-info">
                            {{ moment(vi.created_at).fromNow() }}</span
                        >
                    </div>
                </div>
            </div>
        </div>
        <!-- end of div.row -->
    </div>
    <!-- end of main div -->
</template>

<script>
var moment = require("moment");
export default {
    name: "VideoSearch",
    data() {
        return {
            search: "",
            videos: [],
            moment: moment,
        };
    },
    mounted() {},
    methods: {
        searchVideo() {
            let url = `/searchVideo?search=${this.search}`;
            axios.get(url).then((res) => {
                this.videos = res.data.videos;
            });
        },
        openVideo(id) {
            this.$emit("openVideo", id);
        },
        smartTitle(str, len) {
            return str.length > len ? str.substring(0, len) + "..." : str;
        },
    },
};
</script>
