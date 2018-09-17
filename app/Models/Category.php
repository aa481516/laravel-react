<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $table = 'categories';

    protected $fillable = ['name','parent','status'];


    public function subCategories()
    {
        return $this->hasMany(Category::class, 'parent','id')
            ->where('status','active')
            ->get();
    }

}
