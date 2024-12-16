<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Api\LoginRequest;
use App\Http\Requests\Admin\StaffRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use App\Models\Staff;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public $successStatus = 200;
    public function index()
    {
        $data = Auth::user();
        return response()->json([$data]);
    }
    public function create()
    {
        //
    }
    public function store(Request $request)
    {
        //
    }
    public function show(string $id)
    {
        //
    }
    public function edit(string $id)
    {
        //
    }
    public function update(Request $request, string $id)
    {
        //
    }
    public function destroy(string $id)
    {
        if(Staff::where('id',$id)->delete()){
            return response()->json(["Delete Staff success."]);
        }else{
            return response()->json(["Delete Staff error."]);
        }
    }
    public function logout(){
        auth()->user()->tokens()->delete();
        // $request->user()->currentAccessToken()->delete();
        // $user->tokens()->where(`id`,$tokenId)->delete();
        return response()->json(
            [
                'message'=>'success'
            ],
            200
        );
    }
    protected function doLogin($attempt)
    {
        if (Auth::guard('web')->attempt($attempt)) {
            return true;
        } else {
            return false;
        }
    }
    protected function doLogin2($attempt)
    {
        if (Auth::guard('staff')->attempt($attempt)) {
            return true;
        } else {
            return false;
        }
    }
    public function loginAdmin(LoginRequest $request)
    {
        $login = [
            'email' => $request->email,
            'password' => $request->password,
            'level' => 1
        ];
        if ($this->doLogin($login)) {
            $user = Auth::user();
            $token = $user->createToken('authToken')->plainTextToken;
            return response()->json([
                    'success' => 'success',
                    'token' => $token,
                    'type_token' => 'Bearer',
                    'Auth' => Auth::user()
                ],
                $this->successStatus
            );
        } else {
            return response()->json([
                    'response' => 'error',
                    'errors' => ['errors' => 'invalid email or password'],
                ],
            $this->successStatus);
        }
    }
    public function updateAdmin(UpdateUserRequest $request)
    {
        $data = auth()->user()->currentAccessToken();
        $userId = $data->tokenable_id;
        $user = User::findOrFail($userId);

        $data = $request->all();
        //$file = $request->avatar;

        // if(!empty($file)){
        //     $data['avatar'] = $file->getClientOriginalName();
        // }
        if($data['password']!='password'){
            $data['password'] = bcrypt($data['password']);
        }else{
            $data['password'] = $user->password;
        }
        if($user->update($data)){
            // if(!empty($file)){
            //     $file->move('upload/user/avatar',$file->getClientOriginalName());
            // }
            return response()->json(["Update profile success."]);
        }else{
            return response()->json(["Update profile error."]);
        }
    }
    public function loginStaff(LoginRequest $request)
    {
        $login = [
            'email' => $request->email,
            'password' => $request->password,
        ];

        if ($this->doLogin2($login)) {
            $staff = Auth::guard('staff')->user();

            // Kiểm tra level nếu cần
            if ($staff->level == 3) {
                $token = $staff->createToken('authToken')->plainTextToken;
                return response()->json([
                    'success' => 'success',
                    'token' => $token,
                    'type_token' => 'Bearer',
                    'Auth' => $staff,
                ], 200);
            } else {
                return response()->json([
                    'response' => 'error',
                    'errors' => ['errors' => 'Unauthorized access level'],
                ], 403); // Forbidden
            }
        } else {
            return response()->json([
                    'response' => 'error',
                    'errors' => ['errors' => 'Invalid email or password'],
                ], 401);
        }
    }
    public function staffCreate(StaffRequest $request)
    {
        $data = $request->all();
        if(Staff::create($data)){
            return response()->json(["Create Staff success."]);
        }else{
            return response()->json(["Create Staff error."]);
        }
    }
    public function staffList(){
        $data = Staff::all();
        return response()->json([$data]);
    }
}
