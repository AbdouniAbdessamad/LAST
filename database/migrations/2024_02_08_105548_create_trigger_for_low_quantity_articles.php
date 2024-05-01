<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
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
        DB::unprepared('

        CREATE TRIGGER after_insert_article
        AFTER INSERT ON articles
        FOR EACH ROW
        BEGIN
            DECLARE existing_quantity INT;
            SELECT quantity INTO existing_quantity FROM low_quantities WHERE name = NEW.name AND ref = NEW.ref LIMIT 1;  
            IF existing_quantity IS NULL THEN
                INSERT INTO low_quantities (ref, name, quantity,status)
                VALUES (NEW.ref, NEW.name, NEW.quantity,NEW.status);
            ELSE
                IF NEW.status = \'entree\' THEN
                    UPDATE low_quantities
                    SET quantity = quantity + NEW.quantity
                    WHERE name = NEW.name AND ref = NEW.ref;
                ELSEIF NEW.status = \'sortie\' THEN
                    UPDATE low_quantities
                    SET quantity = quantity - NEW.quantity
                    WHERE name = NEW.name AND ref = NEW.ref;
                END IF;
            END IF;
        END;
        CREATE TRIGGER before_insert_prevent_sortie
        BEFORE INSERT ON articles
        FOR EACH ROW
        BEGIN
        IF NEW.quantity IS NULL AND NEW.status = \'sortie\' THEN
            SIGNAL SQLSTATE "45000" SET MESSAGE_TEXT = "Impossible , la quantité est nulle est le status est sortie !";
            END IF;
END;



        
        ');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::unprepared('DROP TRIGGER IF EXISTS update_low_quantity_articles');
    }
};
