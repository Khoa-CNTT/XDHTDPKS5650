<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Http\Requests\CommentRequest;
use App\Http\Resources\CommentResource;
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
        $comments = Comment::with(['children.children.children', 'user'])
            ->where('id_parent', null)
            ->latest()
            ->get();

        return CommentResource::collection($comments);
    }
    public function store(CommentRequest $request)
    {
        $data = $request->validated();

        // Nếu không có id_parent, set mặc định là null
        if (empty($data['id_parent'])) {
            $data['id_parent'] = null;
        }

        $data['id_user'] = Auth()->id(); // Lấy id_user từ Auth

        $comment = Comment::create($data);

        return response()->json([
            'status' => true,
            'message' => 'Successfully comment!',
            'data' => $comment,
        ], 201);
    }




    public function update(CommentRequest $request)
    {
        $data   = $request->all();

        if (Comment::find($request->id)->update($data)) {
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


    public function logout()
    {
        auth()->user()->tokens()->delete();
        return response()->json(
            [
                'message' => 'success'
            ],
            200
        );
    }
}
