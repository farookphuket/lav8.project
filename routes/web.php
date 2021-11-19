<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Member\HomeController;
use App\Http\Controllers\WhatnewsController;
use App\Http\Controllers\PasswordResetController;
use App\Http\Controllers\PostsController as PubPost;
use App\Http\Controllers\VisitorsController as PubVisit;
use App\Http\Controllers\SongController as pSong;
use App\Http\Controllers\ArtistController as pArtist;
use App\Http\Controllers\AlbumController as pAlbum;
use App\Http\Controllers\VideoController as pVideo;
use App\Http\Controllers\PhotosController as pPhotos;
use App\Http\Controllers\RegisterController as pRegist;
use App\Http\Controllers\SearchController as pSearch;

// added 29 June 2021
use App\Http\Controllers\CommentsController as pComment;


/* MEMBER */
use App\Http\Controllers\Member\WhatnewsController as WMN;
use App\Http\Controllers\Member\PostsController as MemberPost;
use App\Http\Controllers\Member\CommentsController as MCMT;
use App\Http\Controllers\Member\TemplatesController as TPM;
use App\Http\Controllers\Member\SongController as SM;
use App\Http\Controllers\Member\VideoController as VM;
use App\Http\Controllers\Member\PhotosController as mPhoto;


/* Admmin */
use App\Http\Controllers\Admin\WhatnewsController as WPAdmin;
use App\Http\Controllers\Admin\HomeController as HAdmin;
use App\Http\Controllers\Admin\UserController as UAdmin;
use App\Http\Controllers\Admin\PostsController as POSTAdmin;
use App\Http\Controllers\Admin\TemplatesController as TemAdmin;
use App\Http\Controllers\Admin\TagsController as TagsAdmin;
use App\Http\Controllers\Admin\CommentsController as ACMT;
use App\Http\Controllers\Admin\RepliesController as ADRP;
use App\Http\Controllers\Admin\VisitorsController as ADVT;
use App\Http\Controllers\Admin\SongController as aSong;
use App\Http\Controllers\Admin\VideoController as aVideo;
use App\Http\Controllers\Admin\PhotosController as aPhotos;
use App\Http\Controllers\Admin\AboutController as aAbout;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


/* ======================== Public Route ======================================
 * START
 * */

Route::get('/',[WhatnewsController::class,'index']);
Route::resource('/posts',PubPost::class);
Route::get('/posts/{post:slug}',[PubPost::class,'show'])->name('posts.show');
Route::get('/searchpost',[PubPost::class,'search'])
        ->name('search');
Route::get('/getpost',[PubPost::class,"getPostList"])->name("getpost");

Route::get("/about",[PubPost::class,'about'])->name('posts.about');
Route::get("/donate-me",[PubPost::class,'donate'])->name('posts.donate');

/* ============= public comment  29 June 2021 ======================*/
Route::resource("/comment",pComment::class);
Route::get("/getPostComments",[pComment::class,"getPostComments"])
    ->name("comments.getPostComments");
/* ============= public comment  29 June 2021 ======================*/

/* =============== Register 28 June 2021====================*/
Route::resource("/register",pRegist::class);
Route::post("/sentUserConfirm",[pRegist::class,"sentUserConfirm"])
    ->name("register.sentUserConfirm");
Route::get("/userHasConfirmed/{token}",[pRegist::class,"userHasConfirmed"])
    ->name("register.userHasConfirmed");
/* =============== Register 28 June 2021====================*/

/* =============== Search 1 July 2021 =======================================*/
Route::resource("/search",pSearch::class);
Route::post("/getSearchResult",[pSearch::class,"getSearchResult"])
    ->name("search.getSearchResult");

/* =============== Search 1 July 2021 =======================================*/

Route::resource('/album',pAlbum::class);
Route::get('/getalbum',[pAlbum::class,'getalbum'])
    ->name('getalbum');

/* ========================= Artist Resource ==================================
 *
 * */
Route::resource('/artist',pArtist::class);
Route::get('/artistsearch',[pArtist::class,'search'])
    ->name('artistsearch');
Route::get('/getartist',[pArtist::class,'getartist'])
    ->name('getartist');
/* ============================================================================*/
Route::resource('/video',pVideo::class);
Route::get('/getVideos',[pVideo::class,"getVideos"])->name("getVideos");
Route::get('/searchVideo',[pVideo::class,"search"])->name("searchVideo");

/* ============================ public song ===================================
 *
 * last edit 24 Oct 2021 
 * START
 * */
Route::resource("/song",pSong::class);
Route::get("/getsong",[pSong::class,'getsong'])->name("getsong");
Route::get("/readCount/{id}",[pSong::class,'readCount'])->name("readCount");
Route::get("/searchSong",[pSong::class,'search'])->name('searchSong');

/* ============================ public song ===================================
 *
 * last edit 24 Oct 2021 
 * END
 * */


Route::resource("/photo",pPhotos::class);
Route::get("/getPhotos",[pPhotos::class,"getPhotos"])->name("getPhotos");
Route::get("/search",[pPhotos::class,"search"])->name("search");

/* call by Vue START*/
Route::resource('/visitors',PubVisit::class);
Route::resource('/passwordreset',PasswordResetController::class);
Route::get('/passreset/{timeout}',[PasswordResetController::class,
    'passreset'])->name('passreset');

Route::get('/getmyresetinfo',[PasswordResetController::class,
    'getmyresetinfo'])->name('getmyresetinfo');
Route::post('/hello',[PasswordResetController::class,'hello'])->name('hello');
Route::post('/update',[PasswordResetController::class,'update'])
    ->name('update');



/* ======================== Public Route ======================================
 * END
 * */




Route::prefix('member')->name('member.')->middleware('auth')
                                        ->group(function(){
    Route::resource('/home',HomeController::class);
    Route::post('/updateUserProfile',[HomeController::class,
        'updateUserProfile'])->name('updateUserProfile');


    Route::get('/getPosts',[MemberPost::class,'getPosts'])
        ->name('posts.getPosts');
    Route::get('/getPostsByTagId',[MemberPost::class,'getPostsByTagId'])
        ->name('posts.getPostsByTagId');
    Route::get('/getPostsInTagId/{id}',[MemberPost::class,'getPostsInTagId'])
        ->name('posts.getPostsInTagId');
    Route::resource('/posts',MemberPost::class);
    Route::get('/posts/{post:slug}',[MemberPost::class,'show'])
        ->name('posts.show');

    // will be update for user to be easy to contact admin
    Route::get('/about',[MemberPost::class,"about"])->name('posts.about');

    Route::get('/getPostComment',[MCMT::class,'getPostComment'])
        ->name('comments.getPostComment');

    Route::resource("/templates",TPM::class);

    Route::resource("/comments",MCMT::class);
    Route::post('/replyComment',[MCMT::class,"replyComment"])
        ->name("comments.replyComment");

    Route::get('/wnFullRead/{whatnews}',[WMN::class,'wnFullRead'])
        ->name('whatnews.wnFullRead');
    Route::resource('/whatnews',WMN::class);
    Route::get('/whatnews/{whatnews}/edit',[WMN::class,'edit'])
        ->name('whatnews.edit');
    Route::delete('/whatnews/{whatnews}',[WMN::class,'destroy'])
        ->name('whatnews.destroy');




    Route::get('/profile',[HomeController::class,'profile'])
        ->name('profile');


    /* ======================= Member Song ====================================
     *
     * last edit 24 Oct 2021 
     * START
     * */
    Route::resource("/song",SM::class);
    Route::get("/getsong",[SM::class,"getsong"])
            ->name("getsong");
    /* ======================= Member Song ====================================
     *
     * last edit 24 Oct 2021 
     * END
     * */


    Route::resource("/video",VM::class);
    Route::get("/getVideos",[VM::class,"getVideos"])->name("getVideos");

    Route::resource("/photo",mPhoto::class);
    Route::get("/getPhotos",[mPhoto::class,"getPhotos"])->name("getPhotos");

});









/* Admin */
Route::prefix('admin')->name('admin.')->middleware('can:is_admin')
                                      ->group(function(){
    

    Route::resource('/whatnews',WPAdmin::class);

    Route::resource('/visitors',ADVT::class);
    Route::get('/resetVisitor',[ADVT::class,'resetVisitor'])
        ->name('visitors.resetVisitor');
    Route::get('/getVisitorList',[ADVT::class,'getVisitorList'])
        ->name('visitors.getVisitorList');

    Route::resource('/home',HAdmin::class);
    Route::get('/profile',[HAdmin::class,'profile'])->name('profile');
    Route::post('/updateadminprofile',[HAdmin::class,'updateadminprofile'])
        ->name('updateadminprofile');

    
    Route::get("/getUserList",[UAdmin::class,"getUserList"])
        ->name("user.getUserList");
    Route::resource("/user",UAdmin::class);

    Route::get('/getPostCommentAll',[ACMT::class,"getPostCommentAll"])
        ->name("comments.getPostCommentAll");
    Route::post("/sentReply",[ACMT::class,'sentReply'])
        ->name("comments.sentReply");
    Route::resource("/comments",ACMT::class);

    Route::resource("/replies",ADRP::class);

    Route::get('/getPosts',[POSTAdmin::class,'getPosts'])
        ->name('post.getPosts');

    // get comment 5 Aug 2021
    Route::get('/getCommentPost/{post_id}',[POSTAdmin::class,"getCommentPost"])
        ->name("getCommentPost");

    Route::get('/getPostsInTag/{tag}',[POSTAdmin::class,'getPostsInTag'])
        ->name('post.getPostsInTag');
    Route::get('/getPostsByTag',[POSTAdmin::class,'getPostsByTag'])
        ->name('post.getPostsByTag');
    Route::resource('/post',POSTAdmin::class);
    Route::get('/post/{post:slug}',[POSTAdmin::class,'show'])
        ->name('post.show');

    Route::resource('/templates',TemAdmin::class);
    Route::get("/viewTemplate/{template}",[TemAdmin::class,"viewTemplate"])
        ->name("templates.viewTemplate");
    Route::get('/getTemplates',[TemAdmin::class,'getTemplates'])
        ->name('templates.getTemplates');


    Route::get('/getTags',[TagsAdmin::class,'getTags'])->name('tags.getTags');
    Route::resource('/tags',TagsAdmin::class);
    Route::get('/tags/{tag}',[TagsAdmin::class,'show'])->name('tags.show');
    Route::get("/about",[POSTAdmin::class,"about"])->name("post.about");


    Route::resource("/song",aSong::class);
    Route::get('/getSongList',[aSong::class,"getSongList"])
        ->name("getSongList");

    /* will be comment out */
    Route::post("/makeAlbum",[aSong::class,"makeAlbum"])->name("makeAlbum");
    Route::put("/makeAlbum/{album}",[aSong::class,"makeAlbum"])->name("makeAlbum");

    Route::post("/makeArtist",[aSong::class,"makeArtist"])->name("makeArtist");
    Route::put("/makeArtist/{artist}",[aSong::class,"makeArtist"])->name("makeArtist");
    Route::get("/getArtistList",[aSong::class,"getArtistList"])
        ->name("getArtistList");

    Route::get("/getAlbumList",[aSong::class,"getAlbumList"])
        ->name("getAlbumList");


    Route::resource("/video",aVideo::class);
    Route::get("/getVideos",[aVideo::class,"getVideos"])->name("getVideos");

    Route::resource("/photo",aPhotos::class);
    Route::get("/getPhotos",[aPhotos::class,"getPhotos"])->name("getPhotos");

    Route::resource('/about',aAbout::class);

});
