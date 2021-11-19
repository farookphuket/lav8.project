<template>
    <div class="container">
        <!-- ===== form div START ===== -->
        <div class="col-lg-12  mb-4">
            <form>
                <b-input-group>
                    <input
                        v-model="tag"
                        class="form-control"
                        type="text"
                        placeholder="create new tag"
                        @keydown.esc.prevent="onCancel"
                        ref="tag"
                        v-on:keyup="tagPreview"
                        @keypress.enter.prevent="tagSave(saveId)"
                    />
                    <b-input-group-prepend is-text v-show="showPreview">
                        <a href="" @click.prevent="clearFormData">
                            <b-icon icon="trash" variant="danger"></b-icon>
                        </a>
                    </b-input-group-prepend>
                </b-input-group>
            </form>
        </div>
        <!-- ===== form div End ===== -->
        <!-- ===== need some space START ======= -->
        <div class="col-lg-12 pt-2 mb-2">&nbsp;</div>
        <!-- ===== need some space START ======= -->
        <div class="card card-body pt-2" v-show="showPreview == true">
            <div class="row">
                <div class="col-md-4">
                    <h3 class="text-center">
                        <b-icon icon="tags"></b-icon>
                        {{ tag }}
                    </h3>
                </div>
                <div class="col-md-4">
                    <span class="badge badge-danger" v-if="showLength < 2">
                        {{ showLength }}
                    </span>
                    <span
                        class="badge badge-warning"
                        v-else-if="showLength <= 3"
                    >
                        {{ showLength }}
                    </span>
                    <span class="badge badge-success" v-if="showLength >= 4">
                        {{ showLength }}
                    </span>
                </div>
                <div class="col-md-4">
                    <div class="badge badge-info" v-if="showLength > 3">
                        <span v-if="res_status" v-html="res_status">
                            {{ res_status }}
                        </span>
                        <span v-else>
                            hit enter to save
                        </span>
                    </div>
                    <div class="badge badge-warning" v-else>
                        too short!
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "TagForm",
    props: ["editId"],
    data() {
        return {
            tag: "",
            saveId: 0,
            error: 0,
            showPreview: false,
            showLength: 0,
            res_status: "",
        };
    },
    watch: {
        editId: function(x) {
            this.getEditData(x);
        },
    },
    methods: {
        getEditData(id) {
            this.tagPreview();
            if (!id) {
                return;
            }
            let url = `/admin/tags/${id}`;
            axios.get(url).then(
                (res) => {
                    let fData = res.data.tag;
                    this.tag = fData.tag_name;
                    this.showLength = this.tag.length;
                    this.$refs.tag.focus();
                    this.saveId = fData.id;
                    this.showPreview = true;
                },
                (err) => {
                    this.error = 1;
                }
            );
        },
        tagPreview() {
            this.showLength = 0;
            this.showPreview = false;
            this.showLength = this.$refs.tag.value.length;
            if (this.showLength >= 1) {
                this.showPreview = true;
            }
        },
        tagSave(id) {
            let url = "";
            let data = { tag: this.tag };
            if (id) {
                url = `/admin/tags/${id}`;
                axios.put(url, data).then(
                    (res) => {
                        this.error = 0;
                        this.res_status = res.data.msg;
                    },
                    (err) => {
                        this.error = 1;
                        this.res_status = `<span class="badge badge-danger">
                            ${err.response.data.message}</span>`;
                    }
                );
            } else {
                url = `/admin/tags`;
                axios.post(url, data).then(
                    (res) => {
                        this.error = 0;
                        this.res_status = res.data.msg;
                    },
                    (err) => {
                        this.error = 1;
                        this.res_status = `<span class="badge badge-danger">
                            ${err.response.data.message}</span>`;
                    }
                );
            }
            setTimeout(() => {
                this.clearFormData();
            }, 2500);
        },
        clearFormData() {
            if (this.error != 1) {
                this.saveId = 0;
                this.tag = "";
                this.res_status = "";
                this.showPreview = false;
            } else {
                return;
            }
            setTimeout(() => {
                this.$emit("getTags");
            }, 2500);
        },
        onCancel() {
            this.error = 0;
            this.clearFormData();
        },
    },
};
</script>
