<?php

namespace App\Http\Controllers;


use App\Models\User;
use App\Models\Place;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Cookie;

class UserController extends Controller
{
    public function index()
    {
        $places=[];
        $userNames=User::select('id','name')->get();
        $i=0;
            foreach($userNames as $user){
                $places[$i]=[
                    'id'=>$user['id'],
                    'name'=>$user['name'],
                    'places'=>Place::where('userId',$user['id'])->count()
                ];
                $i++;
            }
        return response()->json([
            'places'=>$places
        ]);
        
    }

    public function store(Request $request)
    {
        $userForm=$request->validate([
            'name'=>'required',
            'email'=>'required|email',
            'password'=>'required'
        ]);
        if (!$userForm ) {
            return response()->json([
                'error' => ['Something went wrong.'],
            ]);
        }
        $userForm['password']=\bcrypt($userForm['password']);
        User::create($userForm);
        return response()->json([
            'message'=>'User created successfully'
        ]);
    }

    public function getPlaces(Request $request)
    {
        return Place::where('userId',$request->id)->get();
    }

    

    public function login(Request $request)
    {
        $validator = $request->validate( [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);
 
        $user = User::where('email', $request->email)->first();
 
        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response()->json([
                'error' => ['The provided credentials are incorrect.'],
            ]);
        }
       
        $token=$user->createToken('token'.$user->id)->plainTextToken;
        $cookie=cookie('jwt',$token,60);
        return response()->json([
            'token'=>$token,
            'userId'=>$user->id
        ])->withCookie($cookie);
    }

    public function logout(Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'User successfully signed out']);
    }
}
