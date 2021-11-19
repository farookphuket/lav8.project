<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Support\Facades\DB;

class Visitor extends Model
{
    use HasFactory;

   protected $fillable = [
      'client_ip',
      'client_browser',
      'client_os',
      'last_visited_date',
      'visited_year',
      'visited_month',
      'post_id'
    ];

    protected static $visitor_table = "visitors";


    /* ========================================================================
     * CountVisitor method will make a new count of visitor by ip per day  
     * 06-Aug-2021
     *
     * START
     * ========================================================================
     * */


    public static function CountVisitor()
    {
        // return the array
        $r_data = "";

        // visitor table 
        $table = static::$visitor_table;

        // find the count 
        $is_has_count = Visitor::where("client_ip",getUserIp())
                                ->whereDate("last_visited_date","=",date("Y-m-d"))
                                ->whereDate("created_at","=",date("Y-m-d"))
                                ->get();
        // only if no row fond then create new count
        if(count($is_has_count) == 0):
            
            // preparing data to insert
            $v_data = [
                "client_ip" => getUserIp(),
                "client_os" => getUserOs(),
                "client_browser" => getUserBrowser(),
                "visited_month" => date("m"),
                "visited_year" => date("Y"),
                "last_visited_date" => date("Y-m-d"),
                "created_at" => now(),
                "updated_at" => now()
            ];

            // create new count
            Visitor::create($v_data);

            // get all of the row inclue the new row winth specific ip
            $new_visitor = Visitor::latest()
                                    ->first();
            // make backup to file 
            static::backupVisitor($new_visitor->id,"edit"); 

        endif; 

    }
    
    /* ========================================================================
     * END
     * ========================================================================
     * */

    /* ========================================================================
     * backupVisitor method will write the sql command into the file for 
     * the new reset
     * 06-Aug-2021
     * START
     * ========================================================================
     * */
    public static function backupVisitor($v_id,$cmd=false){
        
        $table = static::$visitor_table;
        // file to write the command to
        $file = base_path("DB/visitors_file.sqlite");

        // get the data row 
        $vi = Visitor::find($v_id);

        // the command to write 
        $command = "";

        // using switch statement to specified command 
        switch($cmd):

        case"edit":
            $command .= "\n
/* ============================================================================
 * backup visitor ip '{$vi->client_ip}' to file on ".date("Y-m-d H:i:s")."
 * ============================================================================
 * */
INSERT INTO `{$table}`(`client_ip`,`client_os`,`client_browser`,`visited_month`,
`visited_year`,`last_visited_date`,`created_at`,`updated_at`) VALUES(
    '{$vi->client_ip}',
    '{$vi->client_os}',
    '{$vi->client_browser}',
    '{$vi->visited_month}',
    '{$vi->visited_year}',
    '{$vi->last_visited_date}',
    '{$vi->created_at}',
    '{$vi->updated_at}');
";
            break;
            default:

            $command .= "\n
/* ============================================================================
 * backup visitor ip '{$vi->client_ip}' to file on ".date("Y-m-d H:i:s")."
 * ============================================================================
 * */
/* DELETE FROM `{$table}` WHERE id='{$v_id}'; */
";
            break;
        endswitch;

        // write the command to file
        write2text($file,$command);

    }

    /* ========================================================================
     * backupVisitor method will write the sql command into the file for 
     * the new reset
     * 06-Aug-2021
     * END
     * ========================================================================
     * */


}
