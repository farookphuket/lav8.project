<?php

namespace App\Providers;

use App\Actions\Fortify\CreateNewUser;
use App\Actions\Fortify\ResetUserPassword;
use App\Actions\Fortify\UpdateUserPassword;
use App\Actions\Fortify\UpdateUserProfileInformation;
use Illuminate\Support\ServiceProvider;
use Laravel\Fortify\Fortify;


use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;
use App\Http\Responses\LoginResponse;

class FortifyServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
        $this->registerResponseBindings();
    }

    protected function registerResponseBindings(){
        $this->app->singleton(LoginResponseContract::class,
            LoginResponse::class);
        //$this->app->singleton()
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        /*
        Fortify::createUsersUsing(CreateNewUser::class);
         */
        Fortify::updateUserProfileInformationUsing(UpdateUserProfileInformation::class);
        Fortify::updateUserPasswordsUsing(UpdateUserPassword::class);
        Fortify::resetUserPasswordsUsing(ResetUserPassword::class);
        Fortify::loginView(function(){
            return view('auth.login');
        });

        Fortify::requestPasswordResetLinkView(function(){
            return view('auth.forgot_pass');
        });

        /*
        Fortify::registerView(function(){
            return view('auth.register');
        });
         */
    }
}
