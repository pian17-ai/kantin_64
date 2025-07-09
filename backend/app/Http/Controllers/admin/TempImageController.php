<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class TempImageController extends Controller
{
    // This method will store the temporary image
    public function store(Request $request)
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,jpg,png,gif|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'message' => $validator->errors()
            ], 400);
        }

        // store the image
        $tempImage = new TempImage();
        $tempImage->name = 'dummy name';
        $tempImage->save();

        $image = $request->file('image');
        $imageName = time() . '.' . $request->image->extension();
        $image->move(public_path('uploads/temp'), $imageName);

        $tempImage->name = $imageName;
        $tempImage->save();

        // save image thumbnail
        $manager = new ImageManager(Driver::class);
        $img = $manager->read(public_path('upload/temp' . $imageName));
        $img->coverDown(1200, 720);
        $image->save(public_path('uploads/temp/thumb/'.$imageName));


        return response()->json([
            'status' => 200,
            'message' => 'Image has been uploaded successfully',
            'data' => $tempImage
        ], 200);
    }
}
