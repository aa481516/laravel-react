<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(){
        $arrCat = [];
        $arrSubCat = [];

        $list = Category::where(['status' => 'active','parent'=>null])->get();
        foreach ($list as $category) {
            foreach ($category->subCategories() as $sub){
                array_push($arrSubCat, $sub);
            }
            $obj = $category;
            $obj->sub = $arrSubCat;
            array_push($arrCat, $obj);
            $arrSubCat = [];
        }
        return response()->json(['list'=>$arrCat]);
    }

    public function update(Request $request){
        Category::where(['id' => $request->id])
            ->update(['name'=>$request->name]);
        return $this->index();
    }

    public function delete(Request $request){
        Category::where(['id' => $request->id])->update(['status'=>'passive']);
        return $this->index();
    }

    public function create(Request $request){
        $obj = new Category();
        $obj->name = $request->name;
        $obj->parent = $request->parent?$request->parent:null;
        $obj->status = 'active';

        if(!$obj->save()){
            return response()->json(['response'=>"failed"]);
        }
        return $this->index();
    }

}