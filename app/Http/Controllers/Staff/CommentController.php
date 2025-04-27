<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Http\Requests\CommentRequest;
use App\Http\Resources\CommentResource;
use App\Models\Comment;
use App\Models\Staff;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

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
        $data = $request->all();

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
    public function destroy($id)
    {
        if (Comment::find($id)->delete()) {
            return response()->json([
                'status'    =>  true,
                'message'   =>  'Success delete!'
            ]);
        } else {
            return response()->json([
                'status'    =>  false,
                'message'   =>  'Error'
            ]);
        }
    }
    public function Clientdelete($id)
    {
        $userId = Auth()->id();
        $comment = Comment::find($id);
        if (!$comment) {
            return response()->json(['message' => 'Comment not found'], 404);
        }
        if ($comment->id_user !== $userId) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $comment->delete();

        return response()->json(['message' => 'Comment deleted successfully']);
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
