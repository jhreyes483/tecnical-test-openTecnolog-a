<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->double('price');
            $table->unsignedBigInteger('status');
            $table->unsignedBigInteger('user_creator');
            $table->unsignedBigInteger('user_last_update');
            $table->integer('stock');
            $table->softDeletes();
            $table->foreign('user_creator')->references('id')->on('users');
            $table->foreign('user_last_update')->references('id')->on('users');
            $table->timestamps();
        });

        DB::table('products')->insert([
            ['id'=>1,'name'=>'televisor','price'=>20000, 'status'=>1, 'stock'=>200,  'user_creator'=>1, 'user_last_update'=>1, 'created_at'=>Carbon::now(), 'updated_at'=>Carbon::now()],
            ['id'=>2,'name'=>'radio','price'=>10000, 'status'=>1, 'stock'=>200, 'user_creator'=>1, 'user_last_update'=>1, 'created_at'=>Carbon::now(), 'updated_at'=>Carbon::now()],
            ['id'=>3,'name'=>'mueble','price'=>15000, 'status'=>1,'stock'=>200,  'user_creator'=>1, 'user_last_update'=>1, 'created_at'=>Carbon::now(), 'updated_at'=>Carbon::now()]
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
