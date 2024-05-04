<?php

namespace Database\Factories;

use App\Models\Article;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Supplier;
use App\Models\Category;
use App\Models\User;
class ArticleFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Article::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'date' => $this->faker->date(),
            'bon_commande' => $this->faker->optional()->word(),
            'supplier_id' => function () {
                return optional(Supplier::inRandomOrder()->first())->id;
            },
            'ref' => $this->faker->word(),
            'name' => $this->faker->word(),
            'quantity' => $this->faker->randomNumber(),
            'status' => $this->faker->randomElement(['entree', 'sortie']),

            'category_id' => function () {
                return optional(Category::inRandomOrder()->first())->id;
            },
            'last_editor_id' => function () {
                return User::inRandomOrder()->first()->id;
            },
            'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'updated_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
        ];
    }
}
