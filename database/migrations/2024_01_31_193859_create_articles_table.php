    <?php

    use Illuminate\Database\Migrations\Migration;
    use Illuminate\Database\Schema\Blueprint;
    use Illuminate\Support\Facades\Schema;

    return new class extends Migration
    {
        /**
         * Run the migrations.
         *
         * @return void
         */
        public function up()
        {

            Schema::disableForeignKeyConstraints();

            Schema::create('articles', function (Blueprint $table) {
                $table->id();
                $table->date("date");
                $table->string("bon_commande")->nullable();
                $table->string("supplier_id")->nullable()->constrained();
                $table->string("ref");
                $table->string("name");
                $table->integer("quantity");
                $table->string("status")->nullable();
                $table->foreignId("category")->nullable()->constrained('categories');
                $table->foreignId("last_editor")->constrained('users'); // Specify the referenced table
                $table->timestamps();
            });

            Schema::enableForeignKeyConstraints();
        }

        public function down()
        {
            Schema::dropIfExists('articles');
        }
    };
