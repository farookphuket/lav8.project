<?php

namespace Database\Factories;

use App\Models\Visitor;
use Illuminate\Database\Eloquent\Factories\Factory;

class VisitorFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Visitor::class;

    protected $month = "";
    protected $year = "";
    protected $date = "";

    protected $getOs = array("Window","Linux","Mac","Mobile");

    protected $rndOs = "";
    protected $getBrowser = array("Firefox","Edge","Google Chrome","Chromium",
        "Brave","Safari","Vivaldi");
    protected $rndBrowser = '';
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $this->date = date('Y-m-d');
        $this->month = date('m');
        $this->year = date('Y');

        $this->rndOs = array_rand($this->getOs);
        $this->rndBrowser = array_rand($this->getBrowser);
        return [
            'client_ip' => $this->faker->ipv4(),
            'client_os' => $this->getOs[$this->rndOs],
            'client_browser' => $this->getBrowser[$this->rndBrowser],
            'visited_month' => $this->month,
            'visited_year' => $this->year,
            'last_visited_date' => $this->date
        ];
    }
}
