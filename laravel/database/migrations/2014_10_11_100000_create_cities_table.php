<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class CreateCitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cities', function (Blueprint $table) {
            $table->id();
            $table->string('description');
            $table->unsignedBigInteger('status');
            $table->timestamps();
        });

        DB::table('cities')->insert([
            ['id'=>1, 'description'=>'Cali','status'=>1, 'created_at'=>Carbon::now()->toDateTimeString( ),'updated_at' =>  Carbon::now()->toDateTimeString()],
            ['id'=>2, 'description'=>'Cúcuta','status'=>1, 'created_at'=>Carbon::now()->toDateTimeString( ),'updated_at' =>  Carbon::now()->toDateTimeString()],
            ['id'=>3, 'description'=>'Bucaramanga','status'=>1, 'created_at'=>Carbon::now()->toDateTimeString( ),'updated_at' =>  Carbon::now()->toDateTimeString()],
            ['id'=>4, 'description'=>'Cartagena','status'=>1, 'created_at'=>Carbon::now()->toDateTimeString( ),'updated_at' =>  Carbon::now()->toDateTimeString()],
            ['id'=>5, 'description'=>'Medellín','status'=>1, 'created_at'=>Carbon::now()->toDateTimeString( ),'updated_at' =>  Carbon::now()->toDateTimeString()],
            ['id'=>6, 'description'=>'Santa Marta','status'=>1, 'created_at'=>Carbon::now()->toDateTimeString( ),'updated_at' =>  Carbon::now()->toDateTimeString()],
        ]);

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cities');
    }
}
