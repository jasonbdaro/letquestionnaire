<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    //
    protected $fillable = ['s_id', 'q', 'a', 'b', 'c', 'd', 'c_a', 'm_a'];

    protected $dates = ['created_at', 'updated_at'];
}
