<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Support\Facades\DB;

class Search extends Model
{
    use HasFactory;

    protected $fillable = [
        "target_title","method","target_id",
        "keywords"
    ];

    protected static $search_table = "searches";



    /* ========================================================================
     * makeSearch method will make searck index to the target id
     *
     * */
    public static function makeSearch($target_id,$method){
        $title = ""; // this can be target_title and keywords 

        $get = ""; // will fetch data from table

        switch($method):

            case"posts":
                $get = Post::find($target_id);
                $title = $get->post_title;
            break;
            case"songs":
                $get = Song::find($target_id);
                $title = $get->song_name; 
            break;
            default:

            break;
        endswitch;

        // check wheather this target_id and method has already exited
            $get_search = Search::where("target_id",$target_id)
                            ->where("method",$method)
                            ->get();

        // only if this target_id has never been add then will create one
        if(count($get_search) == 0):

            // preparing search data to insert
            $se_data = [
                "target_title" => xx_clean($title),
                "keywords" => xx_clean($title),
                "target_id" => $target_id,
                "method" => $method,
                "created_at" => now(),
                "updated_at" => now()
            ];

            // make a new row 
            Search::create($se_data);


            // get the last 
            $last = Search::latest()->first();

            // make backup to file 
            static::backupSearch($last->id,"insert"); 
        endif;
        

    }

    /* ========================================================================
     * backup search table 7 Aug 2021
     *
     * START
     * ========================================================================
     * */
    public static function backupSearch($search_id,$cmd=false){

        // table 
        $table = static::$search_table;

        // file to write to 
        $file = base_path("DB/search_list.sqlite");

        // command to write to file 
        $command = "";

        // get backup data to write 
        $se = Search::find($search_id);


        // use switch statement to specified the command
        switch($cmd):
            case"insert":

                $command .= "\n
/* ============================================================================
 * backup INSERT Search id '{$se->id}' on ".date("Y-m-d H:i:s")."
 *
 * START
 * ============================================================================
 * */
INSERT INTO `{$table}`(`target_title`,`method`,`target_id`,`keywords`,
`created_at`,`updated_at`) VALUES(
    '{$se->target_title}',
    '{$se->method}',
    '{$se->target_id}',
    '{$se->keywords}',
    '{$se->created_at}',
    '{$se->updated_at}');
/* ============================================================================
 * backup INSERT Search id '{$se->id}' on ".date("Y-m-d H:i:s")."
 *
 * END
 * ============================================================================
 * */
";
            break;
            case"edit":

                $command .= "\n
/* ============================================================================
 * backup UPDATE Search id '{$se->id}' on ".date("Y-m-d H:i:s")."
 *
 * START
 * ============================================================================
 * */
UPDATE `{$table}` SET target_title='{$se->target_title}',
keywords='{$se->keywords}',
updated_at='{$se->updated_at}' WHERE id='{$search_id}';

/* ============================================================================
 * backup UPDATE Search id '{$se->id}' on ".date("Y-m-d H:i:s")."
 *
 * END
 * ============================================================================
 * */
";
            break;
            default:

                $command .= "\n
/* ============================================================================
 * backup DELETE Search id '{$se->id}' on ".date("Y-m-d H:i:s")."
 *
 * START
 * ============================================================================
 * */

/* DELETE FROM `{$table}` WHERE id='{$search_id}'; */

/* ============================================================================
 * backup DELETE Search id '{$se->id}' on ".date("Y-m-d H:i:s")."
 *
 * END
 * ============================================================================
 * */
";
            break;
        endswitch;

        // write command to file 
        write2text($file,$command);

    }

    /* ========================================================================
     * backup search table 7 Aug 2021
     *
     * END
     * ========================================================================
     * */
}
