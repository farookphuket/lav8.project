<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Artist extends Model
{
    use HasFactory;
    protected $fillable = ["artist_name","artist_cover","artist_bio"];

    protected static $artist_table = "artists";

    public function song(){
        return $this->belongsToMany(Song::class);
    }


    /* ============================== backupArtist ============================
     * on 23 Oct 2021 START
     * */
    public static function backupArtist($artist_id,$cmd=false){
        // table 
        $table = static::$artist_table;

        // file 
        $file = base_path("DB/Artist_list.sqlite");

        // command 
        $command = "";

        // data 
        $al = Artist::find($artist_id);

        // switch 
        switch($cmd):
        case"insert":
            $command = "
/* =============================== Insert command =============================
 * on ".date("Y-m-d H:i:s")." insert artist id '{$al->id}' to '{$table}'
 * */
INSERT INTO `{$table}`(`artist_name`,`artist_cover`,`artist_bio`,`created_at`,
`updated_at`) VALUES(
    '{$al->artist_name}',
    '{$al->artist_cover}',
    '{$al->artist_bio}',
    '{$al->created_at}',
    '{$al->updated_at}');
";
        break;
        default:
        $command = "
/* ============================== Delete default ==============================
 * delete artist id '{$al->id}' on ".date("Y-m-d H:i:s")."
 *
 * */
/* DELETE FROM `{$table}` WHERE id='{$artist_id}'; */
";
        break;
        endswitch;

        write2text($file,$command);
    }



    /* ============================== backupArtist ============================
     * on 23 Oct 2021 End
     * */
}
