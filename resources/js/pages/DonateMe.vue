<template>
    <section id="portfolio" class="portfolio">
        <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <div class="section-title">
                    <h2 class="text-center">
                        $ 1 US DOLLAR ONLY
                    </h2>
                </div>
                <div class="alert alert-danger">
                    <h3 class="text-center">DO NOT PAY!</h3>
                    <p class="mb-2">
                        all of the money that you have paid to any of the way has
                        shown in the list below will be use to maintain and pay
                        to a hosting for this website so do not spent a big
                        amount to this website (if you will I want 1 US DOLLAR from you)
                        or put any of your personal
                        information on this website! as we have nothing to do
                        with your personal info
                    </p>
                </div>
                <p class="text-mute">
                    this page is will be the only page about the money on this
                    website.
                </p>
                <p class="pt-2 mb-4">
                    the below link or picture are the way to support me
                </p>
            </div>
            <div class="col-md-3 mt-2" v-for="pi in pic">
                <div class="text-center pt-2" 
                style="min-height:200px;max-height:300px;"
                >

                    <a href="" @click.prevent="showPic(pi.id)">
                        <img :src="pi.pic" class="responsive d-block mx-auto" 
                            style="width:220px;height:180px;"
                        />
                    </a>

                    <p class="text-center pt-2">
                        <a
                            href=""
                            target="_blank"
                            class="btn btn-outline-primary"
                            @click.prevent="goTo(pi.id)"
                        >
                            {{ pi.name }}
                        </a>
                    </p>
                </div>

            </div>
            <b-modal
                :title="pic_name"
                ref="showPicModal"
                centered
                ok-only
            >
                <div class="container">
                    <div class="card">
                        <img class="card-img-top" :src="pic_img" alt="" />
                        <div class="card-body"></div>
                    </div>
                </div>
            </b-modal>
            <!-- end of div.col-md-3 pic list -->
        </div>
        <!-- end of div.row -->
        </div>
    </section>
</template>

<script>
export default {
    name: "DonateMe",
    data() {
        return {
            pic: [],
            pic_name: "",
            pic_img: "",
            pic_id: 0,
            pic_url: "",
        };
    },
    mounted() {
        this.picData();
    },
    methods: {
        picData() {
            this.pic = [
                {
                    id: 1,
                    name: "paypal",
                    pic: "https://i.ibb.co/sQwHmxg/2021-03-29-paypal.png",
                    url: "https://paypal.me/farookphuket?locale.x=th_TH",
                },

                {
                    id: 2,
                    name: "truemoney",
                    pic:
                        "https://i.ibb.co/7SdYkn8/Screenshot-2021-0329-204110.jpg",
                    url:
                        "https://i.ibb.co/7SdYkn8/Screenshot-2021-0329-204110.jpg",
                },

                {
                    id: 3,
                    name: "scb",
                    pic: "https://i.ibb.co/JQ3JKJ6/scb-qrcode-24-3-2021.jpg",
                    url: "https://i.ibb.co/JQ3JKJ6/scb-qrcode-24-3-2021.jpg",
                },
                {
                    id: 4,
                    name: "kbank",
                    pic: "https://i.ibb.co/LCK020c/k-qrcode-24-3-2021.jpg",
                    url: "https://i.ibb.co/LCK020c/k-qrcode-24-3-2021.jpg",
                },
                {
                    id: 5,
                    name: "Krung Thai Next",
                    pic:
                        "https://i.ibb.co/dkgFr6T/Screenshot-2021-0329-212207.jpg",
                    url:
                        "https://i.ibb.co/dkgFr6T/Screenshot-2021-0329-212207.jpg",
                },
            ];
        },
        showPic(id) {
            this.pic.forEach((val) => {
                if (val.id == id) {
                    this.pic_name = val.name;
                    this.pic_img = val.pic;
                    this.pic_id = val.id;
                    this.pic_url = val.url;

                    this.$refs["showPicModal"].show();
                }
            });
        },
        goTo(id) {
            this.pic.forEach((val) => {
                if (val.id == id) {
                    window.open(val.url, "_blank");
                }
            });
        },
    },
};
</script>
