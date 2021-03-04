<template>
<div>
   <table class="table table-striped pt-4">
        <thead>
            <th>title / record</th>
            <th>Artist</th>
            <th>Album</th>
            <th>Date</th>
            <th>Manage</th>
        </thead>
        <tbody>
            <tr v-for="li in songList">
                <td>
                    <div>
                        {{li.name}}
                    </div>
                    <div>
                        {{li.user.name}}
                    </div>

                </td>
                <td>{{li.artist.name}}</td>
                <td>{{li.album.name}}</td>
                <td style="width:35%">
                    <div>
                        {{moment(li.created_at)}} &middot; 
                        {{moment(li.created_at).fromNow()}}
                    </div>
                    <div>
                        {{moment(li.updated_at)}} &middot; 
                        {{moment(li.updated_at).fromNow()}}
                    </div>
                </td>
                <td style="width:10%">
                    <div class="btn-group">
                        <button class="btn btn-outline-warning btn-sm">edit</button>
                        <button class="btn btn-outline-danger btn-sm">x</button>
                    </div>
                </td>
            </tr>
        </tbody>
   </table>
</div>
</template>

<script>
var moment = require('moment')
export default{
    name:"SongList",
    props:["songList"],
    data(){
        return{
            moment:moment
        }
    }
}
</script>
