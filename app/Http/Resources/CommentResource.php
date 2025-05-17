<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id'         => $this->id,
            'text'       => $this->text,
            'parent'     => $this->id_parent,
            'user'       => $this->user->name ?? null,
            'created_at' => $this->created_at->diffForHumans(),
            'replies'    => CommentResource::collection($this->whenLoaded('children')),
        ];
    }
}
