<?php

namespace App\Http\Controllers;

use App\Models\Attachments;
use App\Models\Product;
use Couchbase\UserSettings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use \Imagick;


class ProductController extends Controller
{
    public function index(Request $request, $id)
    {
        $list = Product::where(['status' => 'active'])->where(['category_id' => $id])->get();
        $attach = [];
        $products = [];
        foreach ($list as $product) {
            foreach ($product->attachment() as $attachment) {
                array_push($attach, $attachment);
            }
            $obj = $product;
            $obj->attachment = $attach;
            array_push($products, $obj);
            $attach = [];
        }

        return response()->json(['list' => $products]);
    }

    public function update(Request $request)
    {
        Product::where(['id' => $request->id])
            ->update([
                'name' => $request->name,
                'brand' => $request->brand,
                'description' => $request->description
            ]);

        return response()->json(['response' => "success"]);
    }

    public function delete(Request $request)
    {
        Product::where(['id' => $request->id])
            ->update(['status' => 'passive']);

        return $this->index($request, $request->category);
    }

    public function create(Request $request)
    {
        DB::transaction(function () use ($request) {

            $product = new Product();
            $product->name = $request->name;
            $product->description = $request->description;
            $product->brand = $request->brand;
            $product->category_id = $request->category;
            $product->ubc = uniqid();
            $product->status = 'active';
            $product->save();

            foreach($request->file as $value){

                $contentName = $this->upload64($value);
                $thumb = $this->thumb($contentName);

                $attachment = new Attachments();
                $attachment->product_id = $product->id;
                $attachment->type = "img";
                $attachment->name = "img";
                $attachment->attachment = $contentName;
                $attachment->thumb = $thumb;
                $attachment->save();
            }

        });

        return $this->index($request, $request->category);
    }

    public function upload64($data = null, $path = "uploads/original/")
    {
        $name = uniqid();
        $type = explode('/', substr($data, 0, strpos($data, ';')))[1];
        $img = str_replace('data:image/' . $type . ';base64,', '', $data);
        $img = str_replace(' ', '+', $img);
        $data = base64_decode($img);
        file_put_contents($path . $name . "." . $type, $data);
        return $path . $name . "." . $type;
    }

    function thumb($img, $path="uploads/thumb/")
    {
        $name = uniqid();
        if (is_file($img)) {
            $imgType = explode('.',$img)[1];

            $image = new Imagick($img);
            $image->resizeImage(100, 100, Imagick::FILTER_BOX, 0);

            $newImg = $path.$name.".".$imgType;
            file_put_contents($newImg, $image->getImageBlob());
            return $newImg;
        }
    }
}
