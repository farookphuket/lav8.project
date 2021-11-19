<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Album extends Model
{
    use HasFactory;
    protected $fillable = ["album_name","album_cover"];



    // static var 
    protected static $album_table = "albums";

    public function song(){
        return $this->belongsToMany(Song::class);
    }

    /* ===================== backupAlbum START ================================
     * on date 23 Oct 2021
     * */
    public static function backupAlbum($album_id,$cmd=false){
        // table 
        $table = static::$album_table;

        // file 
        $file = base_path("DB/Album_list.sqlite");

        // command 
        $command = "";

        // data 
        $al = Album::find($album_id);

        // switch case
        switch($cmd):
            case"insert":
                $command = "
/* =========================== Insert Command to table {$table} ===============
 * on ".date("Y-m-d H:i:s")."
 * */
INSERT INTO `{$table}`(`album_name`,`album_cover`,`created_at`,`updated_at`) 
VALUES(
    '{$al->album_name}',
    '{$al->album_cover}',
    '{$al->created_at}',
    '{$al->updated_at}');
";
            break;
            case"edit":
                $command = "
/* =========================== Update command =================================
 * on ".date("Y-m-d H:i:s")."
 * */
UPDATE `$table` SET album_name='{$al->album_name}',
album_cover='{$al->album_cover}',
updated_at='{$al->updated_at}' WHERE id='{$album_id}';
";
            break;
            default:
                $command = "
/* =========================== Delete command default =========================
 * album id {$al->id} has delete on ".date("Y-m-d H:i:s")."
 * */
/* DELETE FROM `$table` WHERE id='$album_id'; */
            ";
            break;
        endswitch;
        // write to file 
        write2text($file,$command);

    }

    /* ===================== backupAlbum END ==================================
     * on date 23 Oct 2021
     * */

}
