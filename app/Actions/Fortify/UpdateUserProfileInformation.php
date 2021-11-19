<?php

namespace App\Actions\Fortify;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\UpdatesUserProfileInformation;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Auth;
use App\Models\User;

class UpdateUserProfileInformation implements UpdatesUserProfileInformation
{
    /**
     * Validate and update the given user's profile information.
     *
     * @param  mixed  $user
     * @param  array  $input
     * @return void
     */
    public function update($user, array $input)
    {
        $nPass = $user->password;
        if(isset($input['cur_pass'])):
            $checkPass = Hash::check($input['cur_pass'],$user->password);
            if($checkPass == true):
                $nPass = Hash::make($input['passwd']);
            endif;
        endif;

        

        Validator::make($input, [
            'name' => ['required', 'string', 'max:255'],

            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users')->ignore($user->id),
            ],
        ])->validateWithBag('updateProfileInformation');

        if(Hash::check($input['passconf'],$user->password)):
            $user->forceFill([
                'name' => $input['name'],
                'email' => $input['email'],
                'password' => $nPass
            ])->save();

            //dd($user);

            return redirect()->route('member.profile',$user->name)->with(Session::flash('message','success message'));
        endif;

        /* if ($input['email'] !== $user->email && */
        /*     $user instanceof MustVerifyEmail) { */
        /*     $this->updateVerifiedUser($user, $input); */
        /* } else { */
        /*     $user->forceFill([ */
        /*         'name' => $input['name'], */
        /*         'email' => $input['email'], */
        /*     ])->save(); */
        /* } */


    }

    /**
     * Update the given verified user's profile information.
     *
     * @param  mixed  $user
     * @param  array  $input
     * @return void
     */
    protected function updateVerifiedUser($user, array $input)
    {
        $user->forceFill([
            'name' => $input['name'],
            'email' => $input['email'],
            'email_verified_at' => null,
        ])->save();

        $user->sendEmailVerificationNotification();
    }
}
