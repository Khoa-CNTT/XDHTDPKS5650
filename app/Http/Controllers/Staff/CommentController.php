<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Http\Requests\CommentRequest;
use App\Models\Comment;
use App\Models\Staff;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Comment::all();
        return response()->json([
            'rate'  =>  $data
        ]);
    }
    public function store(CommentRequest $request)
    {
        $data       = request()->all();
        if(Comment::create([
                'user_id' => auth()->id(),
                'text' => $request->text,
                'id_parent' => $request->id_parent,
            ])
        ) return response()->json(["Create product success."]);
        else{
            return response()->json(["Create product error."]);
        }
    }

    public function update(CommentRequest $request)
    {
        $data   = $request->all();

        if(Comment::find($request->id)->update($data))
        {
            return response()->json([
                'status'    =>  true,
                'message'   =>  'Update success!'
            ]);
        } else {
            return response()->json([
                'status'    =>  false,
                'message'   =>  'Error'
            ]);
        }
    }
    public function delete($id)
    {
        try {
            $data = Comment::find($id);
            // Kiểm tra comment có tồn tại không
            if (!$data) {
                return response()->json([
                    'message' => 'Comment not found!'
                ], 404);
            }
            // Lấy user hiện tại
            $user = auth()->user();
            // Kiểm tra nếu user là admin/staff hoặc chủ comment
            $isAuthorized = Staff::where('user_id', $user->id)
                                ->whereIn('level', [3, 4])
                                ->exists();
            if ($user->id != $data->user_id && !$isAuthorized) {
                return response()->json([
                    'message' => 'You do not have permission to delete this comment'
                ], 403);
            }
            // Tiến hành xóa comment
            if ($data->delete()) {
                return response()->json([
                    'status'  => true,
                    'message' => 'Comment deleted successfully'
                ]);
            }
            return response()->json([
                'message' => 'Delete error!'
            ], 500);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong!',
                'error'   => $e->getMessage()
            ], 500);
        }
    }


    public function logout(){
        auth()->user()->tokens()->delete();
        return response()->json(
            [
                'message'=>'success'
            ],
            200
        );
    }
}
