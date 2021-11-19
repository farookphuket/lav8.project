<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Support\Facades\DB;

class Comment extends Model
{

    protected $fillable = [
        "user_id","ip",
        "comment_title",
        "comment_body","reply_count",
        "replied_at"
    ];
    use HasFactory;

    protected static $comment_table = "comments";

    protected static $comment_post_table = "comment_post";


    public function user(){
        return $this->belongsTo(User::class);
    }

    
    public function posts(){
        return $this->belongsToMany(Post::class)->with("user");
    }
     

    /*
    public function reply(){
        return $this->hasMany(Reply::class)->with("user");
    }
     */

    /* ========================================================================
     * Backup Comment 
     * 4 Aug 2021
     * START
     * ========================================================================
     * */
    public static function backupComment($comment_id,$cmd=false)
    {
        // table comment
        $table = static::$comment_table;

        // get the comment 
        $cmt = Comment::find($comment_id);

        // file to write command 
        $file = base_path("DB/comment_list.sqlite");

        // command to write to file 
        $command = "";

        switch($cmd):

            case"insert":
                $command .= "\n 
/* ============================================================================
* backup INSERT comment on ".date("Y-m-d H:i:s")."
*
* START
* =============================================================================
* */
INSERT INTO `{$table}`(`user_id`,`ip`,`comment_title`,`comment_body`,
`created_at`,`updated_at`) VALUES(
    '{$cmt->user_id}',
    '{$cmt->ip}',
    '{$cmt->comment_title}',
    '{$cmt->comment_body}',
    '{$cmt->created_at}',
    '{$cmt->updated_at}');

/* ============================================================================
* backup INSERT comment on ".date("Y-m-d H:i:s")."
*
* END
* =============================================================================
* */

";                        
            break;
            case"edit":
                $command .= "\n
/* ============================================================================
 * backup UPDATE comment on ".date("Y-m-d H:i:s")."
 * START
 * ============================================================================
 * */                    
UPDATE `{$table}` SET comment_title='{$cmt->comment_title}',
comment_body='{$cmt->comment_body}',
updated_at='{$cmt->updated_at}' WHERE id='{$comment_id}';
";
            break;
            default:
                $command .= "\n
/* ============================================================================
 * backup DELETE comment on ".date("Y-m-d H:i:s")."
 * this command will be commenting as it is cannot execute on refresh db 
 * 
 * ============================================================================
 * */
/* DELETE FROM `{$table}` WHERE id='{$comment_id}'; */
";
            break;
        endswitch;

        // write to file
        write2text($file,$command);
    }
    



    public static function backupPostCommentLink($post_id,$cmd=false)
    {
        // table comment
        $table = static::$comment_post_table;

        // get the comment 
        $cmt = DB::table($table)
                    ->where("post_id",$post_id)
                    ->latest()
                    ->first();

        // file to write command 
        $file = base_path("DB/comment_post.sqlite");

        // command to write to file 
        $command = "";

        switch($cmd):

            case"edit":
                $command .= "\n
/* ============================================================================
 * backup comment link to post on ".date("Y-m-d H:i:s")." 
 * ============================================================================
 * */
INSERT INTO `{$table}`(`user_id`,`comment_id`,`post_id`,`created_at`,
`updated_at`) VALUES(
    '{$cmt->user_id}','{$cmt->comment_id}','{$cmt->post_id}',
    '{$cmt->created_at}',
    '{$cmt->updated_at}');
";
            break;
            default:
                $command .= "\n
/* ============================================================================
 * backup DELETE link comment id '{$cmt->comment_id}' to 
 * post id '{$cmt->post_id}' on ".date("Y-m-d H:i:s")."
 * ============================================================================
 * */
/* DELETE FROM `{$table}` WHERE comment_id='{$post_id}'; */
";
            break;
        endswitch;

        write2text($file,$command);
    }


    /* ========================================================================
     * Backup Comment 
     * 4 Aug 2021
     * END
     * ========================================================================
     * */
}
