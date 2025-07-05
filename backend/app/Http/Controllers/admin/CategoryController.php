<?php

namespace App\Http\Controllers\admin;

use App\Models\Category;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    // this method will return all categories
    public function index() {
        $categories = Category::orderBy('created_at','DESC')->get();
        return response()->json([
            'status' => 200,
            'data' => $categories
        ]);
    }

    // this methos will store a categories in db
    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required'
        ]);

        if($validator->fails()) {
            return response()->json([
                'status' => 400,
                'message' => $validator->errors()
            ], 400);
        }

        $category = new Category();
        $category->name = $request->name;
        $category->status = $request->status;
        $category->save();

        return response()->json([
            'status' => 200,
            'message' => 'Category added succcesfully',
            'data' => $category
        ], 200);
    }

    // this method will return a single categories
    public function show() {

    }

    // this method will destroy a single categories
    public function destroy() {

    }
}
