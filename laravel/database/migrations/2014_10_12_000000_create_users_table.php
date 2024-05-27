<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedBigInteger('city_id');
            $table->string('email')->unique();
            $table->string('address');
            $table->string('telephone');
            $table->unsignedBigInteger('status');
            $table->string('password');
            $table->foreign('city_id')->references('id')->on('cities');
            $table->timestamps();
        });

        DB::table('users')->insert([
            ['id'=>1, 'name'=>'Javier Hildebrando Reyes Neira', 'city_id'=>1,'email'=>'jav-rn@hotmail.com' ,'address'=>'Calle 123',  'telephone'=>'3057331755','status'=>1, 'password'=>Hash::make('password'), 'created_at'=> Carbon::now()->toDateTimeString(), 'updated_at' =>  Carbon::now()->toDateTimeString()],
            ['id'=>2, 'name'=>'Pedro', 'city_id'=>1,'email'=>'jav-rn@hotmail1.com' ,'address'=>'Calle 123',  'telephone'=>'3057331755','status'=>1, 'password'=>Hash::make('password'), 'created_at'=> Carbon::now()->toDateTimeString(), 'updated_at' =>  Carbon::now()->toDateTimeString()],
            ['id'=>3, 'name'=>'Miguel', 'city_id'=>1,'email'=>'jav-rn@hotmail2.com' ,'address'=>'Calle 123',  'telephone'=>'3057331755','status'=>1, 'password'=>Hash::make('password'), 'created_at'=> Carbon::now()->toDateTimeString(), 'updated_at' =>  Carbon::now()->toDateTimeString()],
            ['id'=>4, 'name'=>'Javier Hildebrando Reyes Neira', 'city_id'=>2,'email'=>'jav-rn@hotmail4.com' ,'address'=>'Calle 123',  'telephone'=>'3057331755','status'=>1, 'password'=>Hash::make('password'), 'created_at'=> Carbon::now()->toDateTimeString(), 'updated_at' =>  Carbon::now()->toDateTimeString()],
            ['id'=>5, 'name'=>'Javier Hildebrando Reyes Neira', 'city_id'=>2,'email'=>'jav-rn@hotmail3.com' ,'address'=>'Calle 123',  'telephone'=>'3057331755','status'=>1, 'password'=>Hash::make('password'), 'created_at'=> Carbon::now()->toDateTimeString(), 'updated_at' =>  Carbon::now()->toDateTimeString()],
            ['id'=>6, 'name'=>'Javier Hildebrando Reyes Neira', 'city_id'=>1,'email'=>'jav-rn@hotmail5.com' ,'address'=>'Calle 123',  'telephone'=>'3057331755','status'=>1, 'password'=>Hash::make('password'), 'created_at'=> Carbon::now()->toDateTimeString(), 'updated_at' =>  Carbon::now()->toDateTimeString()],
            ['id'=>7, 'name'=>'Javier Hildebrando Reyes Neira', 'city_id'=>5,'email'=>'jav-rn@hotmail6.com' ,'address'=>'Calle 123',  'telephone'=>'3057331755','status'=>1, 'password'=>Hash::make('password'), 'created_at'=> Carbon::now()->toDateTimeString(), 'updated_at' =>  Carbon::now()->toDateTimeString()],
            ['id'=>8, 'name'=>'Javier Hildebrando Reyes Neira', 'city_id'=>2,'email'=>'jav-rn@hotmail7.com' ,'address'=>'Calle 123',  'telephone'=>'3057331755','status'=>1, 'password'=>Hash::make('password'), 'created_at'=> Carbon::now()->toDateTimeString(), 'updated_at' =>  Carbon::now()->toDateTimeString()],
            ['id'=>9, 'name'=>'Javier Hildebrando Reyes Neira', 'city_id'=>5,'email'=>'jav-rn@hotmail8.com' ,'address'=>'Calle 123',  'telephone'=>'3057331755','status'=>1, 'password'=>Hash::make('password'), 'created_at'=> Carbon::now()->toDateTimeString(), 'updated_at' =>  Carbon::now()->toDateTimeString()],
            ['id'=>10, 'name'=>'Javier Hildebrando Reyes Neira', 'city_id'=>1,'email'=>'jav-rn@hotmail9.com' ,'address'=>'Calle 123',  'telephone'=>'3057331755','status'=>1, 'password'=>Hash::make('password'), 'created_at'=> Carbon::now()->toDateTimeString(), 'updated_at' =>  Carbon::now()->toDateTimeString()],
            ['id'=>11, 'name'=>'Javier Hildebrando Reyes Neira', 'city_id'=>5,'email'=>'jav-rn@hotmail10.com' ,'address'=>'Calle 123',  'telephone'=>'3057331755','status'=>1, 'password'=>Hash::make('password'), 'created_at'=> Carbon::now()->toDateTimeString(), 'updated_at' =>  Carbon::now()->toDateTimeString()]
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
