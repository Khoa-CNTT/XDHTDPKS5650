<?php

namespace App\Http\Controllers;
use App\Http\Requests\Staff\RentalDatailRequest;
use App\Models\RentalDetail;
use App\Models\Staff;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class RentalDetailController extends Controller
{
    public function store(RentalDatailRequest $request){
        $today      = Carbon::today();
        $lastDay    = Carbon::now()->endOfMonth();
        while($today <= $lastDay) {
            RentalDetail::firstOrCreate(
                [
                    'id_room'       =>  $request->id_room,
                    'date'          =>  $today,
                ],
                [
                    'id_room'   =>  $request->id_room,
                    'status'    =>  1,
                    'date'      =>  $today,
                    'note'      =>  $request -> note,
                ]
            );
            $today->addDay();
        }
        return response()->json([
            'status'    =>  true,
            'message'   =>  'Crete success!',
        ]);
    }
}
