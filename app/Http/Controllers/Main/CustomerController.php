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
use App\Models\Order;
use App\Notifications\InvoicePaidNotification;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

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

    public function updateProfile(Request $request)
    {
        $user = auth()->user();

        $fields = ['name', 'password', 'phone', 'address', 'avatar', 'country'];
        $dataToUpdate = collect($request->only($fields))
            ->filter(function ($value) {
                return !is_null($value) && $value !== '';
            })
            ->toArray();

        if (array_key_exists('password', $dataToUpdate)) {
            if (!$request->filled('current_password')) {
                return response()->json(['message' => 'Vui lòng nhập mật khẩu hiện tại để đổi mật khẩu.'], 400);
            }

            if (!Hash::check($request->input('current_password'), $user->password)) {
                return response()->json(['message' => 'Mật khẩu hiện tại không đúng.'], 400);
            }

            $dataToUpdate['password'] = Hash::make($dataToUpdate['password']);
        }

        if ($request->hasFile('avatar')) {
            $file = $request->file('avatar');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('avatars', $filename, 'public');
            $dataToUpdate['avatar'] = $path;
        } elseif ($request->filled('avatar') && is_string($request->input('avatar'))) {
            $dataToUpdate['avatar'] = $request->input('avatar');
        }

        $user->update($dataToUpdate);

        return response()->json([
            'message' => 'Cập nhật thành công',
            'user' => $user
        ]);
    }

    public function chooseRoom(Request $request)
    {
        $quantity  = $request->quantity;
        $IssueDate = $request->IssueDate;
        $DueDate   = $request->DueDate;
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
                $conflict = $this->isRoomBookedInPeriod($room->id, $IssueDate, $DueDate);

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
                'code'          => $this->generateOrderCode('room'),
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
            $this->sendInvoicePaidMail($invoice->id);
            return response()->json([
                'message' => 'Đặt phòng thành công',
                'invoice_id' => $invoice->id,
                'invoice' => $invoice,
            ], 200);
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
        $validated = $request->validate([
            'paymentMethod'    => 'required|in:1,2',
            'products'         => 'required|array|min:1',
        ]);

        $orderCode = $this->generateOrderCode('order');
        $user    = auth()->user();
        $products = $validated['products'];

        DB::beginTransaction();
        try {
            $invoice = Invoices::create([
                'code'          => $orderCode,
                'id_user'       => $user->id,
                'name'          => $user->name,
                'issueDate'     => NULL,
                'dueDate'       => NULL,
                'address'       => NULL,
                'id_room'       => NULL,
                'paymentMethod' => $validated['paymentMethod'],
                'note'          => $request->note ?? null,
                'email'         => $user->email,
                'phone'         => $user->phone,
                'total'         => 0,
                'type'          => 'Product',
            ]);

            $totalAmount = 0;

            foreach ($products as $item) {
                $product = Product::findOrFail($item['id']);
                $quantity = $item['quantity'];
                $lineTotal = $product->price * $quantity;

                Order::create([
                    'invoice_id' => $invoice->id,
                    'product_id' => $product->id,
                    'name'       => $product->name,
                    'price'      => $product->price,
                    'quantity'   => $quantity,
                ]);

                $totalAmount += $lineTotal;
            }

            $invoice->update(['total' => $totalAmount]);

            DB::commit();

            return response()->json([
                'message'     => 'Đặt hàng thành công!',
                'invoice_id'  => $invoice->id,
                'order_code'  => $orderCode,
                'total'       => $totalAmount
            ], 201);

        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Đã có lỗi xảy ra khi đặt hàng.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    public function history(Request $request)
    {
        $userId = auth()->id();
        $type = $request->query('type');

        if ($type === 'room') {
            $invoicesRoom = Invoices::where('id_user', 2)
                        ->where('type', 'Room')
                        ->with('room.roomCategory')
                        ->orderBy('created_at', 'desc')
                        ->get();
            return response()->json([
                'invoices' => $invoicesRoom
            ]);
        } 

        if ($type === 'product') {
            $invoicesProduct = Invoices::where('id_user', $userId)
                        ->where('type', 'Product')
                        ->with('room.roomCategory')
                        ->orderBy('created_at', 'desc')
                        ->get();
            return response()->json([
                'invoices' => $invoicesProduct
            ]);
        }

        return response()->json([
            'invoices' => null
        ]);
    }

    public function detailOrder(Request $request)
    {
        $id = $request->query('id');
        $orders = Order::where('invoice_id', $id)->get();

        if ($orders->isEmpty()) {
            return response()->json([
                'message' => 'Không tìm thấy đơn hàng.',
                'orders' => []
            ], 404);
        }

        return response()->json([
            'orders' => $orders
        ]);
    }

    function generateOrderCode($type = 'room') 
    {
        $prefix = match ($type) {
            'room'  => 'DP',
            'order' => 'DH',
            default => 'XX',
        };

        $datePart   = date('ymd');
        $randomPart = strtoupper(substr(bin2hex(random_bytes(5)), 0, 5));

        return $prefix . $datePart . $randomPart;
    }

    private function isRoomBookedInPeriod($roomId, Carbon $startDate, Carbon $endDate)
    {
        return RentalDetail::where('id_room', $roomId)
            ->where('status', 0)
            ->whereBetween('date', [$startDate->format('Y-m-d'), $endDate->format('Y-m-d')])
            ->exists();
    }

    public function sendInvoicePaidMail($invoice_id)
    {
        if (!$invoice_id) {
            logger()->error('Invoice ID is missing');
            return response()->json(['error' => 'Invoice ID is required'], 400);
        }

        try {
            $invoice = Invoices::findOrFail($invoice_id);
            logger()->info('Đang gửi mail tới: ' . $invoice->email);

            \Illuminate\Support\Facades\Notification::route('mail', $invoice->email)
                ->notify(new InvoicePaidNotification($invoice));

            logger()->info('Gửi mail thành công tới: ' . $invoice->email);
        } catch (\Exception $e) {
            logger()->error('Lỗi khi gửi mail: ' . $e->getMessage());
        }

        return 'Mail sent!';
    }
}
