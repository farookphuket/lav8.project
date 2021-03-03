<template>
<div>
   <table class="table table-striped pt-4">
        <thead>
            <th>title</th>
        </thead>
        <tbody>
            <tr v-for="li in songList">
                <td>{{li.name}}</td>
                <td>Artist</td>
            </tr>
        </tbody>
   </table>
</div>
</template>

<script>
export default{
    name:"SongList",
    props:["songList"]
}
</script>
