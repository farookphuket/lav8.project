<template>
    <div>
        <div class="section-title">
            <h2>My Karaoke</h2>
        </div>
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
                    v-on:keyup="searchSong"
                    type="text"
                    ref="search"
                />
                </b-input-group>
            </div>
        </form>
        <div class="container-fluid" v-if="song != 0">
            <div class="row">
                <div v-for="li in song" class="col-lg-4 pt-2">
                    <div class="card">
                        <a href="" @click.prevent="getSong(li.id)">
                            <img
                                class="responsive card-img-top"
                                :src="li.cover"
                                :alt="li.name"
                            />
                        </a>
                        <div class="card-body">
                            <span>
                                <b-icon icon="info-circle"></b-icon> 
                                {{ smartTitle(li.name,9) }}
                            </span> &middot;
                            <span>
                                <b-icon icon="person"></b-icon>
                                {{ li.user.name }}
                            </span>
                              
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
        smartTitle(str,len){
            return (str.length > len)?str.substring(0,len)+'...':str
        },
    },
};
</script>
