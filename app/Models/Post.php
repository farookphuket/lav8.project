<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;


class Post extends Model
{
    use HasFactory;

    protected static $read_count_table = "post_read";
    
    protected $fillable = [
        'is_public','post_title',
        'post_excerpt','post_body',
        'user_id','slug'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function tags(){
        return $this->belongsToMany(Tag::class)->withTimestamps();
    }
    public function comments(){
        return $this->belongsToMany(Comment::class)->with("user");
    }

    /* ========================================================================
     * make count for this specific id of this post id 
     * the cout will do count from the user ip one ip per count per day
     *
     * Count Read Post 06 Aug 2021
     *
     * START 
     * ========================================================================
     * */

    public static function CountReadPostTime($post_id){

        // the read count table 
        $table = static::$read_count_table;

        // get the count 
        $is_has_count = DB::table($table)
                            ->where("post_id",$post_id)
                            ->whereDate("created_at","=",date("Y-m-d"))
                            ->where("ip",getUserIp())
                            ->get();
        // check wheather this ip has click on this link today
        if(count($is_has_count) == 0):
            // preparing the data
            // if no row found will create one 
            $c_data = [
                "post_id" => $post_id,
                "os" => getUserOs(),
                "ip" => getUserIp(),
                "device" => getUserDevice(),
                "browser" => getUserBrowser(),
                "created_at" => now(),
                "updated_at" => now()
            ];

            // create new count data
            DB::table($table)->insert($c_data);

            // get the specific post id including the last row
            $sum_read_count = count(DB::table($table)
                                        ->where("post_id",$post_id)
                                        ->get());
            // update the post table with count info
            Post::where("id",$post_id)
                ->update([
                    "last_read_ip" => getUserIp(),
                    "last_read_date" => date("Y-m-d"),
                    "read_count" => $sum_read_count
                ]);

            // backup this count to file
            static::backupReadCountLink($post_id,"edit");

        endif;
    }

    /* ========================================================================
     *  Post read count END
     * ========================================================================
     * */

    /* ========================================================================
     * backup read count 06 Aug 2021
     *
     * START
     * ========================================================================
     * */
    public static function backupReadCountLink($post_id,$cmd=false)
    {

        // read count table
        $table = static::$read_count_table;

        // file to write backup script
        $file = base_path("DB/post_read_count.sqlite");

        // command to write 
        $command = "";

        // get the specific post id link 
        $r_count = DB::table($table)
                        ->where("post_id",$post_id)
                        ->latest()
                        ->first();

        // use switch statement to specified the command
        switch($cmd):

            case"edit":
                $command .= "\n
/* ============================================================================
 * backup READ COUNT for post id '{$post_id}' 
 * on ".date("Y-m-d H:i:s")."
 * ============================================================================
 * */
INSERT INTO `{$table}`(`post_id`,`os`,`ip`,`device`,`browser`,`created_at`,
`updated_at`) VALUES(
    '{$r_count->post_id}',
    '{$r_count->os}',
    '{$r_count->ip}',
    '{$r_count->device}',
    '{$r_count->browser}',
    '{$r_count->created_at}',
    '{$r_count->updated_at}');
";
                break;
                default:

                $command .= "\n
/* ============================================================================
 * backup DELET READ COUNT for post id '{$post_id}' 
 * on ".date("Y-m-d H:i:s")."
 * ============================================================================
 * */
/* DELETE FROM `{$table}` WHERE post_id='{$post_id}'; */
";
                break;
        endswitch;

        // write to backup file
        write2text($file,$command);
    }
    

    /* ========================================================================
     * backup read count 06 Aug 2021
     *
     * END
     * ========================================================================
     * */
}
