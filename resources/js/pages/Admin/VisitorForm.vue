<template>
    <div>
        <div class="clearfix">
            <div class="float-right">
                <button class="btn btn-danger"
                        @click.prevent="$emit('resetVisitor')">Delete All</button>
            </div>
        </div>
    </div>
</template>



<script>
export default{
    name:"VisitorForm"
}
</script>
