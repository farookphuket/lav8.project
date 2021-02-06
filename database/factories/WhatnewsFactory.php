<?php

namespace Database\Factories;

use App\Models\Whatnews;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class WhatnewsFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Whatnews::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            "user_id" => User::factory(),
            "whatnews_title" => $this->faker->sentence,
            "whatnews_body" => $this->faker->paragraph,
            "is_public" => false
        ];
    }

    public function is_public(){
        return $this->state([
            'is_public' => true
        ]);
    }
}
