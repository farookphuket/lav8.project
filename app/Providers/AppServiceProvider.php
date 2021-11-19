<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Config;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
        Config::set(["DEFAULT_VAR" => [
            "my_skype" => "https://join.skype.com/invite/vuxfIjs54MPS",
            "my_linkin" => "https://www.linkedin.com/in/farook-fuu-time-480a9a47/",
            "my_twitter" => "",
            "my_facebook" => "",
            "my_instagram" => "",
            "my_contact_phone" => "+66 95 9543920 and +66 81 3974489",
            "my_contact_email" => "admin@farookphuket.com"
        ]]);
    }
}
