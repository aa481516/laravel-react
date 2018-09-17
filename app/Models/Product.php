<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table ='products';


    protected $fillable = ['category_id','brand_id','description','ubc','status'];


    public function attachment(){
        return $this->hasMany(Attachments::class, 'product_id', 'id')->get();
    }
}
