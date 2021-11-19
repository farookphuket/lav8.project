<template>
    <div class="container-fluid">
        <div class="clearfix">
            <div class="float-right">
                <p style="color:green;" class="mb-4">last update 29 Oct 2021</p>
                <div class="btn-group">
                    <button
                        @click="showWhatnewsForm = true"
                        class="btn btn-outline-primary btn-sm"
                        v-if="showWhatnewsForm == false"
                    >
                    <b-icon icon="plus"></b-icon>
                        Post
                    </button>
                    <button
                        @click="showWhatnewsForm = false"
                        class="btn btn-outline-danger btn-sm"
                        v-else
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
        <p class="pt-4 mb-4">&nbsp;</p>
        <whatnews-form
            :editId="editId"
            :whatnews="wnlist"
            :template="template"
            @box="box($event)"
            @getWhatnewsList="getWhatnewsList($event)" 
                v-show="showWhatnewsForm"
        ></whatnews-form>

        <whatnews-list
            @goToPage="getWhatnewsList($event)"
            @goEdit="goEdit($event)"
            @goDel="goDel($event)"
            @goRead="goRead($event)"
            :wnlist="wnlist"
        ></whatnews-list>

        <b-modal ref="onOk" title="Server Said : " ok-only 
        @ok="closeBox">
            <div v-html="res_status">
                {{ res_status }}
            </div>
        </b-modal>
    </div>
</template>

<script>
import WhatnewsForm from "./WhatnewsForm.vue";
import WhatnewsList from "./WhatnewsList.vue";
export default {
    props: ["template","ownerId"],
    name: "Adminwm",
    components: {
        WhatnewsList,
        WhatnewsForm,
    },
    data() {
        return {
            wnlist: [],
            editId: "",
            res_status: "",
            showWhatnewsForm: false,
        };
    },
    mounted() {
        this.getWhatnewsList();
    },
    methods: {
        getWhatnewsList(page) {
            this.editId = 0
            this.showWhatnewsForm = false
            let url = "";
            if (page) {
                url = page;
                this.$cookies.set("awn_old_page", url);
            }
            url = this.$cookies.get("awn_old_page");
            if (!url) {
                url = `/admin/whatnews`;
            }

            axios.get(url).then((res) => {
                this.wnlist = res.data.whatnews;
            });
        },
        goRead(id) {
            let url = `/admin/whatnews/${id}`;
            location.href = url;
        },
        goEdit(id) {
            this.editId = id;
            this.showWhatnewsForm = true
        },
        goDel(id) {
            let url = `/admin/whatnews/${id}`;
            axios.delete(url).then((res) => {
                this.res_status = res.data.msg;
            });

            //this.$refs["onOk"].show();
            this.box(this.res_status)
            setTimeout(() => {
                this.getWhatnewsList();
            }, 2500);
        },
        box(msg){
            this.res_status = msg 
            this.$refs["onOk"].show()
        },
        closeBox(){
            this.res_status = ''
            this.$refs["onOk"].hide()
        },
    },
};
</script>
