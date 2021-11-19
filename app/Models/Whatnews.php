<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Support\Facades\DB;

class Whatnews extends Model
{
    use HasFactory;

    protected $fillable = ['whatnews_title','whatnews_body','is_public','user_id'];

    protected static $wn_table = "whatnews";

    public function user(){
        return $this->belongsTo(User::class);
    }

    /* ========================================================================
     * backup Whatnews 
     * Date 31 Jul 2021
     * START
     * =======================================================================
     * */
    public static function backupWhatnew($wn_id,$cmd=false){
        $table = static::$wn_table;

        // file to write the command 
        $file = base_path("DB/whatnews_default.sqlite");

        // get the row
        $wn = Whatnews::find($wn_id);

        // command to write 
        $command = "";

        // using switch statement to specified the command
        switch($cmd):

            case"insert":
                $command .= "\n
/* ===========================================================================
 * backup INSERT script on ".date("Y-m-d H:i:s")."
 * ===========================================================================
 * */
INSERT INTO `{$table}`(`user_id`,`whatnews_title`,`whatnews_body`,`is_public`,
`created_at`,`updated_at`) VALUES(
    '{$wn->user_id}',
    '{$wn->whatnews_title}',
    '{$wn->whatnews_body}',
    '{$wn->is_public}',
    '{$wn->created_at}',
    '{$wn->updated_at}');
";
            break;
case"edit":

            $command .= "\n
/* ===========================================================================
 * backup UPDATE item '{$wn->id}' on ".date("Y-m-d H:i:s")."
 * START
 * ===========================================================================
 * */
UPDATE `{$table}` SET whatnews_title='{$wn->whatnews_title}',
whatnews_body='{$wn->whatnews_body}' ,
is_public='{$wn->is_public}',
updated_at='{$wn->updated_at}' WHERE id='{$wn->id}';

/* ===========================================================================
 * backup UPDATE script on ".date("Y-m-d H:i:s")."
 * END
 * ===========================================================================
 * */
";
    break;
default:

            $command .= "\n
/* ===========================================================================
 * backup DELETE script on ".date("Y-m-d H:i:s")."
 * ===========================================================================
 * */
/* DELETE FROM `{$table}` WHERE id='{$wn->id}'; */
";
    break;
            endswitch;

        // write command to file for backup 
        write2text($file,$command);
    }

    /* ========================================================================
     * backup Whatnews 
     * Date 31 Jul 2021
     * END
     * ========================================================================
     * */

}
