# lav8.project

>   Dear friends this repo is completely none sense to any body!
>   I just created this for my learning experience code
>   and I don't know if this code is really useful to any one
>   or even it is make sense at all to you to copy this and use

##  used Laravel 8 for the core code!
>   started on 20 Oct 2020 from knowing nothing about laravel 8.





### ================ how to get it 

> to make this code run on your system there will be some config 

1. create new directory (for example I wll copy the code to 
~/Desktop/my_project) so I will run command  
`mkdir -p ~/Desktop/my_project && cd ~/Desktop/my_project` 

2. clone this code to copy this repo run 
`git clone https://github.com/farookphuket/lav8.project.git .` 
3. copy the file .env.example `cp .env.example .env` then edit the .env file 
looking for the line below :

```


# ======== if you use Manjaro,Arch,Arco,Endeavouros
# DB_DATABASE=/srv/http/lav8.x1/DB/DB_SAMPLE.sqlite

# ======= if you use Ubuntu,Debain
# DB_DATABASE=/var/www/html/lav8.x1/DB/DB_SAMPLE.sqlite

# edit to your info in my case my_project is on my Desktop folder
# ======== if you use Manjaro,Arch,Arco,Endeavouros
DB_DATABASE=/Desktop/my_project/DB/DB_SAMPLE.sqlite



```

4. run command `composer update` to get the vendor folder in your project 

5. run `npm install && npm run watch` if this command not success it will show 
what Error is mostly is about to update npm so you can run 
`npm install npm@version` as the `@version` is will be the version number 
that will show in your error code. fix it the run `npm install && npm run watch` 
this code will be run now.

6. run `php artisan serve` then click on the url that show in your terminal




--- 

## ========= 26 Sep 2021 My Bank Account for money tranfer


[my_kasikorn_bank_acc]:https://i.ibb.co/j4Rt9Rp/Kbank-Code-for-money-transfer.jpg

> ***Money transfer method***
> to transfer money from your country(if you're not in Thailand) to my bank 
account 



- My Bank Address : 
> SAM-KONG BRANCH 264/2 Yaovaraj Road T. Talad-Yai A. Muang 
Phuket Thailand 83000


- Bank Swift Code : KASITHBK

- Bank Account Name : CHETSADAPHON

- Bank Account Number : 489-2-057112


![my kasikorn bank account ][my_kasikorn_bank_acc]



--- 
## last update 20 Jul 2021  

> enabled write to file on 20 July 2021

> created backup data for new reset make thing more easy for setup 
> thing will be automatic backup to file.
> please note this can be a harmful in the production mode so please 
> make sure that you do not have any of the sensitive information in any of 
> your back up file just to prevent from a security hole in your system.

> make a backup for video,song,post,template,photo[read count],comment,tag,
> search

---

##  Last update 18 May 2021

> added to baanlungpa.com 18 May 2021
> fixed the "forgot password"










[![](http://img.youtube.com/vi/td77N8oauEw/0.jpg)](http://www.youtube.com/watch?v=td77N8oauEw "")





# how can I download and setup

> please click on the youtube link to see it in detail

[![](http://img.youtube.com/vi/41chFktm7MU/0.jpg)](http://www.youtube.com/watch?v=41chFktm7MU "")






# How can I use this


>   please watch this video it will tell you better than read from here



[![](http://img.youtube.com/vi/tKqdzrZFlRI/0.jpg)](http://www.youtube.com/watch?v=tKqdzrZFlRI "")



#   is my laravel project work on SHARE HOSTING?

>   Yes! but I will not recommand this!
>   maybe I am a way too stupid for this,
>   but the easier way that I can do to make this work is just gone around
>   this way (before you upload your project to the share host make sure that
>   1.you have a copy project folder 2.you have run "npm run prod"
>   so this way we don't have to care about the "node_module"
>   folder we have nothing to do with it)


##  at the share host side

1.  for example I have my web root that I can access on the share host to
the folder www which allow me to create folder in here now I create new
folder call "lav8Sys" and I copy the file and folder from my project folder
EXCEPT "public" and "node_mpdule" to the folder "lav8Sys" that I have created


2.  now copy everything inside of "public" folder to my web root(no
need public folder) I mean to my "public_html" folder



3.  now edit the file "index.php" change the 2 lines as show below




```

    from :
    require __DIR__.'/../vendor/autoload.php';

    TO:
    require __DIR__.'/../lav8Sys/vendor/autoload.php';



    Form :
    $app = require_once __DIR__.'/../bootstrap/app.php';

    TO:
    ::$app = require_once __DIR__.'/../lav8Sys/bootstrap/app.php';

```




4.  edit the .env file to the database file or info




```

    FROM:
    DB_DATABASE=/srv/http/lav8.lap/DB/DB_SAMPLE.sqlite

    TO: (it must be the full path you can find absolute path from your FTP
    or simply create the php file with this content "<?php echo __DIR__; ?>")
    this will be your absolute path

    ::DB_DATABASE=/var/www/lav8Sys/DB/DB_SAMPLE.sqlite

```





>   that all I have to do and it is working very well as I expect
>   so to you just give it a try and good luck!





# My word as I am stupid programmer copy other people code

>   as I start this project from knowing nothing at all about laravel
>   until now I know just a very small piece of laravel and now I make
>   the simple project using laravel&vue as the backend and I am now
>   at this point the point that I am stuck within my messy ugly code
>   I don't know how or if I can improving myself at all
>   today (18 Jan 2021) I just try to clean up the code a little bit
>   so maybe it will render faster



---









#   How to use?

1.  open your terminal program type
" git clone https://github.com/farookphuket/lav8.project.git "



2.  cd into the project directory "cd lav8.project" you have to create the
config file by command `cp .env.example .env`



3.  edit file ".env"

-   "DB_CONNECTION=sqlite" (if you use mysql so just leave this line un-touch
and provide you database credencials into this file).
-   paste the absolute file path to your 'database.sqlite' file for example
in my case I use manjaro and I name my project folder "lav8.project "
living in "/srv/http " so my absolute path will be
"DB_DATABASE=/srv/http/lav8.project/DB/DB_SAMPLE.sqlite"

[edit_env]:https://i.ibb.co/KqzfZKy/edit-env.png

![edit env file][edit_env]




-   make sure that you are in "lav8.project" (or what if you have rename it
to something else it should be your project root folder ) now run
"composer install " or " composer update " (in my case I run "composer update")
wait until the process has done now run "npm install " the command
"composer update" will create folder "vendor" and the command "npm install"
will create folder " node_modules " in your project root directory


-   now run command "php artisan key:generate " you should get the success
message

-   if you try to browse your web project now will be some permission denied
so you have to run "sudo chmod 777 -R /path-to-your-project" in my case I have
my project in the path "/srv/http/la8.lap" so the command I run will be
"sudo chmod 777 -R /srv/http/lav8.lap"




-   in your project folder if you run the command `php artisan migrate:status`
it should not be any error report shown and the table list will show.


-   if it is an error that means there are some library missing on your system
please go research on google then you can go the next step if the error not
been fix you may not go the next step.

[migrate_status]:https://i.ibb.co/80rHhXW/php-serve.png

![migrate status][migrate_status]




#   to view Database Structure and data

>   to see the database structure with GUI like `phpmyadmin`
>   you can have a look at `DBeaver` from `https://dbeaver.io/`
>   this is a very good program specially for `.sqlite` database.

<br />

[dbeaver]:https://i.ibb.co/NTsBk0L/DBeaver7.png
![DBeaver7 is great][dbeaver]




#   setup fresh without sample data from me

-   to setup fresh you can simply run `php artisan migrate:refresh `



#   setup fresh with sample data from me

-   to add the example data you can run ` php artisan db:seed `
after run the command `php artisan migrate:refresh` then you will get the
example data (which is by now is still very little bit of them).








#   to get a lot of data to working with


>   in the root of the project (for example I name my project for "project1")
>   so if I want a lot of sample data of post from faker I can run
>   the command in terminal like this:




    `cd -path-to-my-project/project1`

    `php artisan tinker`

    `use App\Models\{User,Post};`

    `User::factory()->has(Post::factory()->count(20))->count(20)->create();`



>   so the command above will create 20 users and each user will create 20 posts.










#   Why I got some error? farook, is your code is really working?

>   **Dude** , if there are the problem with this code
>   the first thing I want you to do is watch my video that I provided
>   on youtube as you can see at the link below in the `Still not clear` section

>   if there still some problem that you cannot really fix to make thing run
>   in the way that you'd expect I want you to know that we are on the
>   different machine setup environment I don't know what did you put in
>   your system to make thing run

>   my os I use `Manjaro,Ubuntu,Pop os,Debian,MX Linux,Linux Mint,Arch Linux`
>   up until nowaday (3 Dec 2020) I am using only `Manjaro` as my main os

>   so I am completely do not know how this going to look like in window or mac
>   so if you are on the different os than I am that will be something for
>   you to check




<br />




##  is your php.ini look like this?

-   this is my php.ini on Ubuntu 20.04

-   now this year(16 Dec 2020) I am completely wipe Ubuntu from all of
my computer

-   and using Manjaro+i3wm.

-   what is your php version type `php --version`


<br />

[php_extension_1]:https://i.ibb.co/TTgvrVF/php-extension.png

![my php.ini][php_extension_1]


<br />



4.  generate the app key by type `php artisan key:generate`



<br />


5.  that's all now you can run `php artisan serve` and your project
app should be appear.



[home_page]:https://i.ibb.co/yh8Pgxz/homepage-28-October-2020-01-01-03.png

[admin_page]:https://i.ibb.co/3zfMt9C/admin-page28-October-2020-01-02-02.png






---


<br />



# still not clear? go youtube

[![](http://img.youtube.com/vi/KhQ0BqMdC0Y/0.jpg)](http://www.youtube.com/watch?v=KhQ0BqMdC0Y "")





---

<br />



#   ถ้าท่านพูดภาษาไทยและพอจะเข้าใจผมพูด




[![](http://img.youtube.com/vi/uabq5tC7AVo/0.jpg)](http://www.youtube.com/watch?v=uabq5tC7AVo "")



<br />




## home page


![home page ][home_page]



[login_page]:https://i.ibb.co/82wBbcG/login-page.png

##  Login page


![login page][login_page]





[register_page]:https://i.ibb.co/LtmNq45/register-page.png

##  Register page


![register page ][register_page]




## Admin page added 28 Oct 2020

![admin page on 28 oct 2020][admin_page]







---








#   What I've done? or What I have learn today?



>   Date 17 Jan 2021 I have made completely `Whatnews` on member module
>   things is going very very well I have no refresh on doing such a thing
>   like C-R-U-D(Create,Read,Update,Delete) and including Pagination(Well, it
>   a very stupid lookin style I have here) but one thing I notice that now
>   is my code hilighting is NOT working when come to view in the Vue pull data
>   and it is seem to be like I have to donwload and install another plugin
>   call `vue-Prism-hilighting` something well I will give it a try some time



>   today in the morning (20-Dec-2020) I just try to figure out
>   "How can I use time ago in Vue like I can with Carbon in blade"
>   now from youtube I found from `https://www.youtube.com/watch?v=kXMv44r-vBQ`
>   it is way way very easy to me so I choose one now.

>   the next thing that I have to find is "how can I set the edit and delete link
>   base on the Auth user" let say if the user does not own the item so he won't
>   be able to edit or delete that item.


---


# Date 10 Apr 2021 (fixed pagination not responsive)

> by default the pagination will not be responsive so I just dig a little
> search and I found it here `https://github.com/twbs/bootstrap/issues/23504`
> so my code will be :


```

=== your content list ===

=== pagination path ===
<div class="nav-scroller  py-1 mb-2">
    <nav class="nav d-flex justify-content-center">
        <ul class="pagination flex-wrap">
            <li class="page-item disabled">
                <div class="page-link">
                    showing from <span>{{var_from}}</span>
                    to <span>{{val_to}}</span> of
                    <span>{{var_total}}</span>
                </div>
            </li>
            <li class="page-item">
                <a class="page-link" href="">
                    page-number from loop
                </a>
            </li>
            <li class="page-item active">
                <span class="page-link">
                    {{var_current_page}}
                </span>
            </li>
        </ul>
    </nav>

</div>

```


> will render this

[new_pagination]:https://i.ibb.co/RbHz44v/2021-04-10-pagination-fixed.png

!["new pagination 11 Apr 2021"][new_pagination]



> OK! my problem today has solved.







# Date 27 Mar 2021


> Photo feature is that I can copy the embed code from another website that I
> put or share my picture so sometime I want to re-use that picture


> sometime the title is too long so you may need to cut it


```
// javascript from https://www.codegrepper.com/code-examples/javascript/javascript+truncate+string+with+dots
function smartTitle(str,len){
 return (str.length > len)? str.substring(0,len)+"...":str;
};

// to use
title = smartTitle(title,9);

```

## result may look like this

[photo_27-mar-2021]:https://i.ibb.co/qgdPN4p/2021-03-27-photo-with-short-title.png

![photo feature with short title][photo_27-mar-2021]






# Date 22 Mar 2021

> Create "Video" and change the login form from the menu bar





# Date 16 Mar 2021

> last update finish Song on Member and added my karaoke list to 140 songs
> @เกาะจำ กระบี่



# Date 9 Mar 2021

> Added search for song using vue





# Date 7 Mar 2021

> I just copy the link of my Karaoke from `wesingapp.com` to keep in my list
> so it will be more easy for me to check later
> The component I have create call "song"


> Icon I've copy the from https://bootstrap-vue.org/docs/icons
> to use the icon `<b-icon icon="headphones"></b-icon>`




# Date 5 Mar 2021

> show song list with the cover rows
> public side also use vue







# Date 3 Mar 2021

> Song is the song list from wesing.com just to keep the song title for easy
> to find which song has been sang I love to sing a song if I can do it without
> any body else around (ร้องเอง ฟังเอง นักเลงเหี้ยๆ )



#   date 14 Feb 2021

>   Still! I cannot use v-select or v-multiselect I don't know what
>   I did wrong but I've learn a little more of "how to use vue" in
>   every day so try to improve my skill












---

#   Date 9 Feb 2021 upgrade to php 8.0

>   yes! I know that the php 8 is already take place since last year(2020) but to me I just have ability to use it today just now and this can be something new for me so just a little bit of worries for instant after the update has done I just restart and found out that a ha "apache is not load!" so I just take a look of the error code it is because the config cannot find php 7 as it is already been replace with php 8 so to make it back again I have to edit the httpd.conf file by run this command `sudo vim /etc/httpd/conf/httpd.conf` and edit the include php file just like the code below



```
    LoadModule php_module modules/libphp.so
	AddHandler php-script .php
	Include conf/extra/php_module.conf



```

> so now thing is back to work as it's use to be and that's it all update for today.



---

#   Date 8 Feb 2021 make Thai slug

>   I've try to find "how can I make a Thai slug for post using javascript"
>   so today I just copy the code from
>   `https://gist.github.com/silkyland/004e9c74ed9ed8b76d613bc2e4e48f52 `
>   to make this work in the way I want it's seem to be good so far(but not
>   safe maybe in the long term so I have to find the way to encode it)
>   well at least for now

```
        //this.title  is the input text
        makeSlug(){
            let make_slug = this.title.replace(/\s+/g,"-")
            .replace(/[^\u0E00-\u0E7F\w\-]+/g,'')
            .replace(/\-\-+/g,'-')
            .replace(/^-+/,'')
            .toLowerCase()
           return this.slug = make_slug
        },



```


[output_thai-slug]:https://i.ibb.co/CVjyBVm/2021-02-08-thai-slug.png

![output from thai slug][output_thai-slug]










#   Date 6 Feb 2021 remove node_modules vendor folder

>   Dear friends the node_modules and vendor folder now will be remove from
>   the code base here as you can generate it on your local develop enviroment
>   to get the "node_modules" back run "npm install" and to get the "vendor"
>   folder run "composer update" or "composer install" (one of them will be
>   work) I have test on bote "laptop and Desktop" or even in the virtual
>   machine it's will be work very well



#   date 28 Jan 2021 sample database will now pull from file


1.  I just update the seeder file for easy to make a sample data to re-use
after run "php artisan migrate:fresh" and "php artisan db:seed" now it
should pull data from ".sqlite" file instead of run from the seeder file




---

#   Date 24 Jan 2021 Many to Many relationship.


1.  update "user profile","admin profile","user","about","post","tags"
now using vue so you can do CRUD operation and pagination without page reload
the pagination using "vue-cookies" to set the url it will remember
the last set cookie page even when you have leave page to another page
unlike the normal ajax page I use do create

>   I still cannot access to props from the methods try too many from the internet
>   still no luck for that so my component is very messy I hate it
>   my code was so bad code



> the many to many relationship both has to be defind the models
> `belongsToMany(ClassName::class)` otherwise it will retrun an Error
> undefined field or methods I've got this from `https://laracasts.com/discuss/channels/eloquent/retrieve-data-from-many-to-many-relationship`



[many_to_many]:https://i.ibb.co/4R2L2bM/2021-01-24-many-to-many.png

![many to many relationship][many_to_many]












---

-   date 22 Jan 2021

>   what I have learn today is if I want to check if empty object in blade is
>   `if(!$objectName->isEmpty)` this will check if there is an object from
>   the `$objectName` if true then run another code

>   What I did today :

1.  update post module on admin side now even know that it is NOT a single page
application(No not for now there are too far for me)

2.  create the about page to be more dynamic so if there is no about slug
will be use the default | if you want to edit the default message go to
"resources/views/Pub/about.blade.php"




---

-   Date 19 Jan 2021

1.  test the project file on the share hosting working well like what I've expect
so success now DUDE!



---

-   Date 17 Jan 2021
1.  Update the "Whatnews" on member to using Vue
so now Add,edit,update,delete,view,pagination will be load
without reload the page





---

-   Date 15 Jan 2021
1.  update `user Posts` to using vue as a frontend but still do not
fully understand the `components` concept of vue not just yet!
so what I've done so far is pagination post delete without page reload
that's sound to be success to me for now.






---

-   Date 11 Jan 2021

1.  I spend more than 4 hours today just try to figure out how can I join 2 table
for the vue data it is very hard when you don't know something but now I get it






[join_2_table]:https://i.ibb.co/0YBdFLt/laravel-join-2-tables-2021-01-11.png

![join 2 tables laravel][join_2_table]




#   12 Jan 2021
>   make 4 tables join for my first time in Post admin
>   to sent data to Post.vue



[join_4_tables]:https://i.ibb.co/vPgJGzv/join-4-table-2021-01-12.png

![join 4 tables][join_4_tables]




---

-   Date 10 Jan 2021

1.  Using Vue with the Tag module in Admin successfully!
now is completely the same lavel with my belove jQuery and Codeigniter
like I use to but the next problem is "share hosting" so laravel project
is still in the folder in my computer still not using it yet!
any way today(10 Jan 2021) I spend the whole day just for the simple
tags operation fuck it! but it is now working bro!!





---


-   Date 7 Jan 2021

1.  fail on tried to use jodit-vue inside of bootstrap-vue modal is shown
but the jodit pop-up is under the modal






---

<br />



-   Date 3 Jan 2021

1.  Update Whatnews Module on Admin using Vue.
2.  Synce with the desktop computer @Sakaew.





<br />

---

-   Date 28 Dec 2020 in Roi-Et

1.  the member "Whatnews" now using Vue for the management
but there is still a bug in the `pagination` path of `null` if the user click
on the link that has the value of "null" this will cause an Error of redirect to
404 page not found so far I still cannot fix this.



2.  The checkbox will be set with the value 1 or 0 instead of `true` or `false`
to create the checkbox in the template will be
`<input class="form-control" type="checkbox" v-bind:value="is_public"
v-bind:true-value="1">` I set the class of input element to `form-control`
this will take the class form bootstrap.



<br />


---

-   Date 22 Dec 2020

1.  install node package `browser-sync` by ran the command
`sudo npm install -g browser-sync` this will fixing the browser cache problem
from the browser cache in case when we edit the .js file on using vue
to do this go to the project root's directory run `browser-sync start`
if there is any change you made in the .vue or .js file you have to run
`npm run dev` or `npm run watch` to update the change.

2.  the easy way is you better clear browser cache after edit file if the there is
still not load a new edit from `app.js` then run `npm run watch`



3.  the `User profile ,Admin profile` now using Vue to edit the user profile
>   last update 22 Dec 2020





---

-   Date 21 Dec 2020

1.  Updated user  profile by using Vue
will go further more on using Vue.









<br />

---

-   date 20 Dec 2020

1.  Added `password reset` feature now the user can reset their password
in case password lost there the reset-password page will be shown only
when the use has click the link from their e-mail that currently register
with the app in a perios of time(said 7 minute) the reset-password page's
link will be completely expire after the limited of time there for it is
still having some house keeper to do such as showing error on the user rule fail
but so far I am still having a very limit abillity doing thing with Vue
so to say so it may not that perfect or it is not even close(to the word perfect)
but I will keep on going to keep the eyes on it until the thing is going well
in the way it suppose to be.








---





-   date 18 Dec 2020

1.  Tried to config to make a reset-password to be able to send mail success
by config my `.env` file this way

<br />


[email_config]:https://i.ibb.co/1bDjV6N/laravel-email.png
![email config laravel][email_config]


<br />

---


### Visitor module doesn't work! why

>   the visitor module is the web hit counter that using vue
>   so after I ran `npm run prod` from my desktop computer the url for the counter script call
>   is will set to what I've been set from my local computer that my project folder is `lav8.lap`
>   so if the url change the code will not running properly to fix this you have to delete
>   the folder node_modules by run `rm -rf node_modules` or just manaully delete it
>   now your have to edit the file `/resources/js/components/visitors.vue` find the `url1="lav8.lap/visitors"`
>   change it to yours project folder name like this `let url1="your-project-folder/visitors"`
>   then run `npm install && npm run dev` now the visitor module should work!









<br />




---

-   date 17 Dec 2020

1.  Start making the forgot-password page using vue I am just very new for this
so the first try was super terrible I spend more than 4 hours just learn to make
the load page to the main view.









---

-   Date 11 Dec 2020 test the project on live server

>   I test run this project on the live server which I setup by myself
>   in the virtualbox program(well, I don't have any server machine just yet)
>   the problem I found is `visitor` module is not working so to fix that
>   edit the file `resources/js/components/visitors.vue` change line `url1`
>   to your url then run `npm run prod` from your root project folder upload
>   the project to server if it still not working try to clear browser cache
>   it should be fixed.


>   test on Ubuntu Server 20.04 everything working good.





---

-   date 8 Dec 2020 at 00:20 a.m.

1.  I just realized that to me `Jodit` is better than `summernote`
so jodit will replace summernote editor but if to you `summernote`
is suit you need you can simply change it to your liking by uncomment one to another

<br />

[un-comment-to-enable]:https://i.ibb.co/KxxFf50/un-comment-to-enable-summernote.png
![uncomment to enable summernote][un-comment-to-enable]


<br />

---

-   date 3 Dec 2020

1.  Added `PostSeeder` so when you run ` php artisan db:seed ` the sample post
will be add to the database.


2.  fixed "summernote" modal issue by initialize using ` dialogsInBody:true ` for example

```
>>  initialize summernote I use Jquery

    $('.selector-element').summernote({
        height:550,
        placeholder:'your place holder here make sure in the html element you don\'t have tag "placeholder"',
        dialogsInBody : true

    });


```




# summernote modal issue found 3 Dec 2020

[summernote_modal_issue]:https://i.ibb.co/wBGLdTc/summernote-modal-issue.png

![the modal issue][summernote_modal_issue]






<br />


#   summernote modal issue fixed

[summernote_issue_fix]:https://i.ibb.co/PGdRz0r/summernote-modal-float.png

![the issue is fixed][summernote_issue_fix]



<br />


---
-   Date 29 Nov 2020
1.  visitor using vue is completely fine




---



-   Date 26 Nov 2020

1.  Add vue component for "Visitor" class




---

-   Date 15-Nov-2020

1.  edit,update Post,Tag
2.  bug fix "if the title is not english then the slug will be the id of the post"





---

-   Date 11 Nov 2020

1.  Added "Tag CRUD" on admin.
2.  Added "xx_clean"
3.  Added "hljs","prism" for code hilighted





---

-   Date 2 Nov 2020

1.  Success "CRUD" on "Many to Many" relation ship now member can
"create ,edit,update,delete post" and can assign tag for the post

2.  "Many to Many " relationship using on create using "attach",
on update using "sync" ,on delete using "detach" is the king!
Vola!!


---




-   Date 1 Nov 2020

1.  Added "Posts CRUD" to "member" added flash message

2.  by adding `$instance->appends(Request::all())->links()` will solved
the pagination problem if the `query string` is more than just a `page`
so next we have to find out how to make a query this.

```
    >   file name PostsController

    use App\Models\Post;
    use App\Models\User;
    use App\Models\Tag;

    public function index(){

        $tags = Tag::all(); // get all the tag

        // get the post that set to public
        $posts = Post::where('is_public',true)
                        ->orderBy('created_at','desc')
                        ->paginate(10);

        if(request('tag')):

            $posts = Tag::where('name',request('tag'))
                        ->posts()
                        ->where('is_public',1)
                        ->paginate(10);
        endif;

    //  return view in Pub folder
    return view('Pub.Posts.index')->with([
        'tags' => $tags,
        'posts' => $posts
    ]);


    }


```




---

-   Date 30 Oct 2020

1.  on delete "user" will delete all things from the delete user
for instance post,whatnews,photos so there will be no orphans item in database



2.  bug fixed "when admin edit the user post
will change from the user_id owner to admin"



3.  Admin "CRUD" on "users" table or admin can manage user so to speak.


4.  Start using "DBeaver" for managing the database it is working great with SQLite




---

-   Date 28 Oct 2020

1.  Added admin page "sidebar" theme from `https://bootstrapious.com/p/bootstrap-sidebar`




---



-   Date 27 Oct 2020
1.  this morning(6:10 a.m.) try to find "how to redirect user after login if use is admin"
    or "how to login with a multiple roles" so to say the giving light has come from
    `https://laracasts.com/discuss/channels/laravel/version-8-redirects` so now
    "login multiple roles" is work!


---

-   date 26 Oct 2020

1.  "Whatnews" filter `script` from the content
2.  "menu nav" is now hilight
3.  "Summernote" is included.



---

-   date 25 Oct 2020

1.  The navbar hilighted work as expect `Request::segment(number) ` forinstance


```
        <a href="about" class="nav-link {{Request::getRequestUri === 'about'?'bg-success':''}}">
        about
        </a>
        #this should work if the url is match but if the url comming in the fomat like "profile/1"
        #this method won't work
        #so to fix that we need to exact the uri by the uri segment for example
        <a href="{{route('profile',$profile_id)}}" class="nav-link {{Request::segment(2)=== 'profile'?'bg-success':''}}">profile</a>


```



---

-   date 24 Oct 2020

1.  Update code Added "whatnews" in member.

2.  synce with desktop.

---

-   date 22 Oct 2020

1.  Added "cleanblog" template the file in use is now 30,000 file with in 250 MB
oh my lord WTF is that beest?

2.  `git throwing error` while trying to pull because I use `--ff-only` flag
so git has complian to get around with this I just ran `git pull --no-ff origin <origin name>`
this seem to fix the error very well "Vola!!"

---

-   date 21 Oct 2020
1.  added "member zone" as a resource

---
-   date 20 Oct 2020
1.  create new project follow https://www.youtube.com/watch?v=R8DHJs1qi2o&list=PLxFwlLOncxFIbxi2gQCN3SR5e3-WB-4T2&index=3

2.  my first push for this repo is just today




---



##  sexy girl is prefered

> sorry Guy! I am required for only a sexy girl!!
> just like them

[sexy_girl_1]:https://i.pinimg.com/originals/ef/66/a0/ef66a0234f624b84d1848620361a586c.jpg
![sexy girl is required][sexy_girl_1]


[sexy_girl_2]:https://www.ubuy.com.bh/productimg/?image=aHR0cHM6Ly9pLmViYXlpbWcuY29tL2ltYWdlcy9nL2hRQUFBT1N3T2lSZWp6bTgvcy1sNTAwLmpwZw.jpg
![sexy girl is required][sexy_girl_2]



[sexy_girl_3]:https://im.rediff.com/getahead/2015/dec/14miss-universe04.jpg
![sexy girl is required][sexy_girl_3]



[sexy_girl_4]:https://pbs.twimg.com/media/EbEipeIXYAEhQjd.jpg
![sexy girl is required][sexy_girl_4]
