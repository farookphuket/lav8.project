<template>
    <div>
        <div class="section-title">
            <h2>My Karaoke</h2>
        </div>
        <div class="mt-2 mb-2">

            <form action="">
                <div class="form-group">
                    <b-input-group>
                        <b-input-group-prepend is-text>
                            <b-icon icon="search"></b-icon>
                        </b-input-group-prepend>
                    <input
                        v-model="search"
                        class="form-control"
                        placeholder="Search my karaoke..."
                        @keyup.prevent="searchSong"
                        type="text"
                        ref="search"
                    />
                    </b-input-group>
                </div>
            </form>
        </div>
        <div class="container-fluid" v-if="song != 0">
            <div class="row">
                <div v-for="li in song" class="col-lg-4 pt-2">
                    <div class="card">
                        <a href="" @click.prevent="getSong(li.id)">
                            <img
                                class="responsive card-img-top d-block mx-auto"
                                style="max-height:220px;max-width:180px;"
                                :src="li.song_cover"
                                :alt="li.song_name"
                            />
                        </a>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-striped table-bordered">
                                    <tr>
                                        <th>Song Title</th>
                                        <td>
                                            <a href="" :title="li.song_name">
                                                {{ sTitle.smartTitle(li.song_name,9) }}
                                            </a>

                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Post by</th>
                                        <td>
                                            <b-icon icon="person"></b-icon>
                                            {{ li.user.name }}
                                        </td>
                                    </tr>
                                </table>
                            </div>
                              
                            <span class="badge badge-info">
                                <b-icon icon="clock-history"></b-icon>
                                {{ moment(li.posted_at).fromNow() }}
                            </span>
                            <span class="badge badge-info">
                                <b-icon icon="headphones"></b-icon>
                                {{ li.read_count }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <p class="mb-4 pt-4">&nbsp;</p>
    </div>
</template>

<script>
var moment = require("moment");
export default {
    name: "SongSearch",
    data() {
        return {
            search: "",
            song: [],
            moment: moment,
            sTitle:new CustomText(),
        };
    },
    methods: {
        searchSong() {
            let keySearch = this.$refs.search.value;
            if (keySearch.length > 2) {
                let url = `/searchSong?search=${this.search}`;
                axios.get(url).then((res) => {
                 //   console.log(res.data)
                    this.song = res.data.song;
                });
            } else {
                this.clearForm();
            }
        },
        getSong(id) {
            let url = `/song/${id}`;
            axios.get(url).then((res) => {
             //   console.log(res.data)
                window.open(res.data.url, "_blank");
                setTimeout(() => {
                    this.$emit("getSongList");
                }, 2000);
            });
        },
        clearForm() {
            this.song = 0;
        },

    },
};
</script>
