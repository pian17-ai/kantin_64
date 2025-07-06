<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BrandController extends Controller
{
    public function index() {
        $brands = Brand::orderBy('created_at', 'DESC')->get();
        return response()->json([
            'status' => 200,
            'data' => $brands
        ]);
    }

    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required'
        ]);

        if($validator->fails()) {
            return response()->json([
                'status' => 400,
                'message' => $validator->error()
            ], 400);
        }

        $brands = new Brand();
        $brands->name = $request->name;
        $brands->status = $request->status;
        $brands->save();

        return response()->json([
            'status' => 200,
            'messages' => "Brand added successfully",
            'data' => $brands
        ], 200);
    }

    public function show($id) {
        $brands = Brand::find($id);

        if($brands == null) {
            return response()->json([
                'status' => 404,
                'message' => "Brand not found",
                'data' => []
            ], 404);
        }

        return response()->json([
            'status' => 200,
            'data' => $brands
        ], 200);
    }

    public function update($id, Request $request) {
        $brand = Brand::find($id);

        if($brand == null) {
            return response()->json([
                'status' => 404,
                'message' => "Brand not found"
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required'
        ]);

        if($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->error()
            ], 400);
        }

        $brand->name = $request->name;
        $brand->status = $request->status;
        $brand->save();

        return response()->json([
            'status' => 200,
            'message' => "Category updated successfully",
            'data' => $brand
        ], 200);
    }

    public function destroy($id) {
        $brand = Brand::find($id);

        if($brand == null) {
            return response()->json([
                'status' => 404,
                'message' => "Brand not found",
                'data' => []
            ], 404);
        }

        $brand->delete();

        return response()->json([
            'status' => 200,
            'message' => "Brand deleted successfully"
        ], 200);
    }
}
