<?php

namespace App\Http\Controllers;

use App\Models\Place;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\PersonalAccessToken;

class PlaceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Place::select('id','title','description','image','userId')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $formFields=$request->validate([
            'title'=>'required',
            'description'=>'required',
            'image'=>'required',
        ]);
        $imageName=Str::random().'.'.$request->file('image')->getClientOriginalExtension();
        $path=Storage::disk('public')->putFileAs('Places/image',$request->image,$imageName);
        $formFields['image']=$path;

        $user =  auth()->user();

        if(!$user){
            return response()->json([
            'message'=>'Unable to post the place!'
            ]);
        }

        $formFields['userId']=$user->id;
        Place::create($formFields);

        return response()->json([
            'message'=>'place created successfully',
            'formFields'=>$formFields
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Place  $place
     * @return \Illuminate\Http\Response
     */
    public function show(Place $place)
    {
        return \response()->json([
            'place'=>$place
        ]);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Place  $place
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Place $place)
    {
        $formFields=$request->validate([
            'title'=>'required',
            'description'=>'required',
            'image'=>'nullable',
        ]);
        if($request->hasFile('image')){
            $imageName=Str::random().'.'.$request->file('image')->getClientOriginalExtension();
            $path=Storage::disk('public')->putFileAs('Places/image',$request->image,$imageName);
            $formFields['image']=$path;

            Storage::delete($place->image);
        }
        $formFields['userId']=auth()->user()->id;
        $place->update($formFields);

        return response()->json([
            'message'=>'place updated successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Place  $place
     * @return \Illuminate\Http\Response
     */
    public function destroy(Place $place)
    {
        Storage::delete($place->image);
        $place->delete();

        return response()->json([
            'message'=>'place deleted successfully'
        ]);
    }
}
