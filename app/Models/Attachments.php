<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attachments extends Model
{
    protected $table = 'attachments';

    protected $fillable = ['name','type','product_id','attachment','thumb'];
}
