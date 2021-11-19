<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Support\Facades\DB;

class Song extends Model
{
    use HasFactory;
    protected $fillable = ["user_id","song_name",
        "song_cover","posted_at","song_url"];

    protected static $song_table = "songs";

    protected static $artist_link_table = "artist_song";
    protected static $album_link_table = "album_song";

    protected static $song_read_table = "read_song";


    public function user(){
        return $this->belongsTo(User::class);
    }
    public function artist(){
        return $this->belongsToMany(Artist::class);
    }

    public function album(){
        return $this->belongsToMany(Album::class);
    }

    

    /* ========================================================================
     * readCount method 6 Aug 2021
     * START
     * ========================================================================
     * */
    public static function readCount($song_id){
        // table 
        $table = static::$song_read_table;

        // get the specific item id
        $so = DB::table($table)
                    ->where("ip",getUserIp())
                    ->where("song_id",$song_id)
                    ->whereDate("created_at","=",date("Y-m-d"))
                    ->whereDate("readed_at","=",date("Y-m-d"))
                    ->get();

        if(count($so) == 0):

            // preparing data to insert 
            $s_data = [
                "song_id" => $song_id,
                "readed_at" => date("Y-m-d"),
                "os" => getUserOs(),
                "browser" => getUserBrowser(),
                "ip" => getUserIp(),
                "created_at" => now(),
                "updated_at" => now()
            ];

            // create new row 
            DB::table($table)->insert($s_data);

            // get count by the specific id 
            $sum_read_count = count(DB::table($table)
                                        ->where("song_id",$song_id)
                                        ->get());
            // update the song table of this id 
            Song::where("id",$song_id)
                ->update([
                    "read_count" => $sum_read_count
                ]); 

            // make backup to file 
            static::backupSongReadCount($song_id,"edit");

        endif;

        // 
    }

    /* ========================================================================
     * readCount method 6 Aug 2021
     * END
     * ========================================================================
     * */

    /* ========================================================================
     * backup song read count to file 
     * on 6 Aug 2021
     *
     * START
     * ========================================================================
     * */
    public static function backupSongReadCount($song_id,$cmd=false){
        
        // table song read 
        $table = static::$song_read_table ;

        // file to write the command 
        $file = base_path("DB/song_read_count.sqlite");

        // command to write 
        $command = "";

        // get data to backup 
        $so = DB::table($table)->where("song_id",$song_id)->first();

        // use switch case to specified the command
        switch($cmd):
            case"edit":
            $command .= "\n
/* ============================================================================
 * backup song read count song id '{$song_id}'
 * on ".date("Y-m-d H:i:s")."
 * ============================================================================
 * */
INSERT INTO `{$table}`(`song_id`,`readed_at`,`os`,`browser`,`ip`,`created_at`,
`updated_at`) VALUES(
    '{$so->song_id}',
    '{$so->readed_at}',
    '{$so->os}',
    '{$so->browser}',
    '{$so->ip}',
    '{$so->created_at}',
    '{$so->updated_at}');
";
                break;
            default:

            $command .= "\n
/* ============================================================================
 * backup song DELETE read count song id '{$song_id}'
 * on ".date("Y-m-d H:i:s")."
 * ============================================================================
 * */
/* DELETE FROM `{$table}` WHERE song_id='{$song_id}'; */
";
                break;
        endswitch;


        write2text($file,$command);
    }

    /* ========================================================================
     * backup song read count to file 
     * on 6 Aug 2021
     *
     * END
     * ========================================================================
     * */

    /* ========================================================================
     * backupSong the method will make a backup item from table 'songs'
     * to file  on 8 Aug 2021
     * START
     * */
    public static function backupSong($song_id,$cmd=false){
        // table 
        $table = static::$song_table;

        // file 
        $file = base_path("DB/Song_list.sqlite");

        // item to backup 
        $song = Song::find($song_id);

        // command 
        $command = "";

        // use switch 
        switch($cmd):

            case"insert":

                $command .= "\n
/* ============================================================================
 * backup INSERT item '{$song->id}' on ".date("Y-m-d H:i:s")."
 * START
 * ============================================================================
 * */
INSERT INTO `{$table}`(`user_id`,`song_name`,`song_cover`,`song_url`,
`posted_at`,`created_at`,`updated_at`) VALUES(

    '{$song->user_id}',
    '{$song->song_name}',
    '{$song->song_cover}',
    '{$song->song_url}',
    '{$song->posted_at}',
    '{$song->created_at}',
    '{$song->updated_at}');


/* ============================================================================
 * backup INSERT item '{$song->id}' on ".date("Y-m-d H:i:s")."
 * END
 * ============================================================================
 * */
";
                
                static::backupArtistLink($song->id,"insert");
                static::backupAlbumLink($song->id,"insert");
            break;
            case"edit":
                $command .= "\n
/* ============================================================================
 * backup UPDATE item '{$song->id}' on ".date("Y-m-d H:i:s")."
 * START
 * ============================================================================
 * */
UPDATE `{$table}` SET 
  song_name='{$song->song_name}',
  song_cover='{$song->song_cover}',
  song_url='{$song->song_url}',
    updated_at='{$song->updated_at}' 
    WHERE id='{$song_id}';

/* ============================================================================
 * backup UPDATE item '{$song->id}' on ".date("Y-m-d H:i:s")."
 * END
 * ============================================================================
 * */
";
                // will not make a backup for album,artist link on update 
                // due to prevent from Error
            break;
            default:
                $command .= "\n
/* ============================================================================
 * the command will be not execute by the sql script just to prevent from an error
 * backup DELETE item '{$song->id}' on ".date("Y-m-d H:i:s")."
 * START
 * ============================================================================
 * */

/* DELETE FROM `{$table}` WHERE id='{$song->id}'; */

/* ============================================================================
 * backup DELETE item '{$song->id}' on ".date("Y-m-d H:i:s")."
 * END
 * ============================================================================
 * */
";
            break;
        endswitch;

        write2text($file,$command);
    }

    /* ========================================================================
     * backupSong the method will make a backup item from table 'songs'
     * to file  on 8 Aug 2021
     * END
     * */

    public static function backupArtistLink($song_id,$cmd=false){
        // table
        $table = static::$artist_link_table;

        // data 
        $so = DB::table($table)
            ->where("song_id",$song_id)
            ->first();

        // command 
        $command = "";

        // file 
        $file = base_path("DB/song_artist_link.sqlite");

        //switch 
        switch($cmd):
        case"insert":
            $command = "
/* ============================== INSERT ======================================
 * song id {$so->song_id} link to artist id {$so->artist_id} on 
 * ".date("Y-m-d H:i:s")."
 * ============================================================================
 * */
INSERT INTO `{$table}`(`song_id`,`artist_id`,`created_at`,`updated_at`) 
VALUES(
    '{$so->song_id}',
    '{$so->artist_id}',
    '{$so->created_at}',
    '{$so->updated_at}');
";
        break;

        default:
        $command = "
/* ================================= Delete command default ===================
 * ".date("Y-m-d H:i:s")." delete command song_id {$so->song_id} 
 * unlink artist id {$so->artist_id}
 * */
/* DELETE FROM `$table` WHERE song_id='{$so->song_id}'; */
";
        break;
        endswitch;

        write2text($file,$command);
    }
    
    public static function backupAlbumLink($song_id,$cmd=false){
        // table 
        $table = static::$album_link_table;

        // data 
        $so = DB::table($table)
                ->where("song_id",$song_id)
                ->first();
        // command 
        $command = "";

        // file to write 
        $file = base_path("DB/song_album_link.sqlite");

        //switch case 
        switch($cmd):
        case"insert":
            $command = "
/* =================================== Insert Command =========================
 * to link song id {$so->song_id} with album id {$so->album_id} on 
 * ".date("Y-m-d H:i:s")."
 * */
INSERT INTO `{$table}`(`album_id`,`song_id`,`created_at`,`updated_at`) 
VALUES(
    '{$so->album_id}',
    '{$so->song_id}',
    '{$so->created_at}',
    '{$so->updated_at}');
";
        break;
        default:
            $command = "
        /* ================================== Delete Command ==========================
         * Delete command will not execute just to prevent from error on migrate.
         * */
        /* DELETE FROM `{$table}` WHERE song_id='{$song_id}'; */
        ";
        break;
        endswitch;
        write2text($file,$command);

    }

}
