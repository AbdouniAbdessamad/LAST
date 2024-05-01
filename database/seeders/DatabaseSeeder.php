<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Category;
use App\Models\Supplier;
use App\Models\Article;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        // Seed categories
        Category::factory()->count(5)->create();

        // Seed suppliers
        Supplier::factory()->count(10)->create();

        // Seed articles
        Article::factory()->count(20)->create();
    }
}
