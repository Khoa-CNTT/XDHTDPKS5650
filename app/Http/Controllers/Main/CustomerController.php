<?php

namespace App\Http\Controllers\Main;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ProductRequest;
use Illuminate\Http\Request;
use App\Http\Requests\Main\CustomRequest;
use Carbon\Carbon;
// use App\Http\Requests\Main\LoginRequest;
use App\Http\Requests\Main\RegisterRequest;
use App\Http\Requests\Api\LoginRequest;
use App\Http\Requests\Main\InvoiceRequest;
use App\Models\User;
use App\Models\Room;
use App\Models\RoomType;
use App\Models\RentalDetail;
use App\Models\Invoices;
use App\Models\Product;
use App\Models\Service;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class CustomerController extends Controller
{
    public $successStatus = 200;
    public function Register(RegisterRequest $request)
    {
        $data = $request->all();
        if (User::create($data)) {
            return response()->json(["Create user success."]);
        } else {
            return response()->json(["Create user error."]);
        }
    }
    protected function doLogin($attempt)
    {
        if (Auth::guard('web')->attempt($attempt)) {
            return true;
        } else {
            return false;
        }
    }
    public function login(LoginRequest $request)
    {
        $login = [
            'email' => $request->email,
            'password' => $request->password,
            'level' => 0
        ];
        if ($this->doLogin($login)) {
            $user = Auth::user();
            $token = $user->createToken('authToken')->plainTextToken;
            return response()->json(
                [
                    'success' => 'success',
                    'token' => $token,
                    'type_token' => 'Bearer',
                    'Auth' => Auth::user()
                ],
                $this->successStatus
            );
        } else {
            return response()->json(
                [
                    'response' => 'error',
                    'errors' => ['errors' => 'invalid email or password'],
                ],
                $this->successStatus
            );
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
    public function profile()
    {
        $user = Auth::user();
        return response()->json(
            [
                'user' => $user
            ],
            200
        );
    }
    public function chooseRoom(Request $request)
    {
        $quantity  = $request->quantity;
        $IssueDate = Carbon::parse($request->IssueDate);
        $DueDate   = Carbon::parse($request->DueDate);
        $adult     = $request->adult;
        $children  = $request->children;

        $roomTypes = RoomType::where('Adult', '>=', $adult)
            ->whereRaw('(Children + (Adult - ?)) >= ?', [$adult, $children])
            ->get();

        if ($roomTypes->isEmpty()) {
            return response()->json(['message' => 'Không tìm thấy loại phòng phù hợp'], 404);
        }

        $availableRooms = [];

        foreach ($roomTypes as $roomType) {
            $activeRooms = Room::where('id_room_categories', $roomType->id)
                ->where('status', 1)
                ->with('roomCategory')
                ->get();

            foreach ($activeRooms as $room) {
                $conflict = false;
                $currentDate = $IssueDate->copy();

                while ($currentDate <= $DueDate) {
                    $isBooked = RentalDetail::where('id_room', $room->id)
                        ->where('date', $currentDate->format('Y-m-d'))
                        ->where('status', 0)
                        ->exists();

                    if ($isBooked) {
                        $conflict = true;
                        break;
                    }
                    $currentDate->addDay();
                }

                if (! $conflict) {
                    $availableRooms[] = $room;
                }
            }
        }

        if (count($availableRooms) < $quantity) {
            return response()->json(['message' => 'Không đủ phòng trống cho yêu cầu'], 400);
        }

        return response()->json($availableRooms);
    }
    public function priceTotal(Request $request)
    {
        $IssueDate = Carbon::parse($request->IssueDate);
        $DueDate   = Carbon::parse($request->DueDate);
        $id_room   = $request->id_room;
        $moreService = $request->more_service;

        $days = max(1, $IssueDate->diffInDays($DueDate));

        $room = Room::where('id', $id_room)
            ->select('id', 'price')
            ->first();

        if (!$room) {
            return response()->json(['message' => 'Phòng không tồn tại'], 404);
        }

        $totalPrice = $room->price * $days;

        $serviceTotal = 0;
        if (!empty($moreService)) {
            if (is_string($moreService)) {
                $moreService = json_decode($moreService, true);
            }

            $services = Service::whereIn('id', $moreService)
                ->select('id', 'price')
                ->get();

            foreach ($services as $service) {
                $serviceTotal += $service->price;
            }
        }

        $VAT =  $totalPrice * 0.08;
        $grandTotal = $totalPrice + $VAT + $serviceTotal;

        return response()->json([
            'total_price' => $grandTotal,
            'room_price' => $totalPrice,
            'vat' => $VAT,
            'service_price' => $serviceTotal,
            'days' => $days,
        ]);
    }
    public function booking(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'required|string|max:15',
            'id_room' => 'required|integer|exists:rooms,id',
            'IssueDate' => 'required|date',
            'DueDate' => 'required|date|after:IssueDate',
        ]);

        $name = $request->name;
        $address = $request->address ?? null;
        $id_user = Auth()->user()->id;
        $id_room = $request->id_room ?? null;
        $id_order = $request->id_order ?? null;
        $IssueDate = Carbon::parse($request->IssueDate);
        $receive = $IssueDate->format('Y/m/d');
        $DueDate = Carbon::parse($request->DueDate);
        $back = $DueDate->format('Y/m/d');
        $email = $request->email;
        $phone = $request->phone;
        $note = $request->note ?? null;
        $paymentMethod = $request->paymentMethod ?? 1;
        $moreService = $request->more_service ?? [];
        $total = $request->total ?? 0;

        DB::beginTransaction();
        try {
            $invoice = Invoices::create([
                'code'          => $this->generateOrderCode(),
                'name'           => $name,
                'issueDate'    => $receive,
                'dueDate'      => $back,
                'address'        => $address,
                'id_user'       => $id_user,
                'id_room'       => $id_room,
                'id_order'       => $id_order,
                'email'         => $email,
                'phone'         => $phone,
                'paymentMethod' => $paymentMethod,
                'note'          => $note,
                'total'         => $total,
                'type'          => 'Room',
                'created_at'    => now(),
                'updated_at'    => now(),
            ]);

            RentalDetail::where('id_room', $id_room)
                ->whereBetween('date', [$receive, $back])
                ->update(['status' => 0]);

            if (is_string($moreService)) {
                $moreService = json_decode($moreService, true);
            }

            if (!empty($moreService)) {
                $invoice->services()->attach($moreService);
            }
            DB::commit();
            return response()->json([
                'message' => 'Đặt phòng thành công',200
            ]);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Đặt phòng thất bại',
                'error' => $e->getMessage(),
            ], 500);
        }
        
    }
    public function order(Request $request)
    {
        $products = $request->input('products', []);

        // Validate đơn hàng có sản phẩm
        if (empty($products)) {
            return response()->json([
                'message' => 'Không có sản phẩm nào trong đơn hàng.'
            ], 422);
        }

        $name           = $request->input('name');
        $note           = $request->input('note');
        $email          = $request->input('email');
        $phone          = $request->input('phone');
        $paymentMethod  = $request->input('paymentMethod', 1);
        $id_order       = $this->generateOrderCode();
        $id_user        = auth()->id();

        $total = 0;
        foreach ($products as $product) {
            $quantity = (int) $product['quantity'] ?? 1;
            $price = (int) $product['price'] ?? 0;
            $total += $price * $quantity;
        }

        $invoice = Invoices::create([
            'code'          => $this->generateOrderCode(),
            'id_user'       => $id_user,
            'id_order'      => $id_order,
            'id_room'       => null,
            'firstName'     => $firstName,
            'lastName'      => $lastName,
            'paymentMethod' => $paymentMethod,
            'note'          => $note,
            'email'         => $email,
            'phone'         => $phone,
            'total'         => $total,
            'type'          => 'Product',
        ]);

        // Nếu bạn có bảng lưu chi tiết sản phẩm (order_items), có thể lưu từng sản phẩm vào đây
        // foreach ($products as $productId => $product) {
        //     OrderItem::create([
        //         'invoice_id'   => $invoice->id,
        //         'product_name' => $product['name'],
        //         'quantity'     => $product['quantity'],
        //         'price'        => $product['price'],
        //         ...
        //     ]);
        // }

        return response()->json([
            'message'     => 'Đặt hàng thành công!',
            'invoice_id'  => $invoice->id,
            'id_order'    => $id_order,
            'total'       => $total,
            'customer'    => $firstName . ' ' . $lastName
        ]);
    }
    public function history(Request $request)
    {
        $userId = auth()->id();
        $invoices = Invoices::where('id_user', $userId)
            ->with('room.roomCategory')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'invoices' => $invoices
        ]);
    }
    function generateOrderCode() {
        $datePart = date('ymd'); // YYMMDD
        $randomPart = strtoupper(substr(bin2hex(random_bytes(5)), 0, 8)); // 8 ký tự chữ & số ngẫu nhiên
        return $datePart . $randomPart;
    }
}
