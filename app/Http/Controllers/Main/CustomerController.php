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
use Illuminate\Support\Str;

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
    public function chooseRoom(Request $request)
    {
        $quantity = $request->quantity;
        $IssueDate = Carbon::parse($request->IssueDate);
        $DueDate = Carbon::parse($request->DueDate);
        $data['start'] = $IssueDate->format('Y/m/d');
        $adult = $request->adult;
        $children = $request->children;
        $roomType = RoomType::where('Adult', $adult)
            ->where('Children', $children)
            ->first();
        if (!$roomType) {
            return response()->json(['message' => 'Không tìm thấy loại phòng phù hợp'], 404);
        }
        $activeRooms = Room::where('id_room_categories', $roomType->id)
            ->where('status', 1)
            ->get();

        $availableRooms = [];
        foreach ($activeRooms as $room) {
            $conflictFound = false;
            while ($data['start'] <= $DueDate) {
                $rentalConflict = RentalDetail::where('id_room', $room->id)
                    ->where('date', $data['start'])
                    ->where('status', 1)
                    ->exists();
                if ($rentalConflict) {
                    $conflictFound = true;
                    break;
                }
                $data['start'] = Carbon::parse($data['start'])->addDay();  //sửa
            }
            if (!$conflictFound) {
                $availableRooms[] = $room;
            }
        }
        if (count($availableRooms) < $quantity) {
            return response()->json(['message' => 'Không đủ phòng còn trống'], 404);
        }

        return response()->json([
            $activeRooms,
            $availableRooms
        ]);
    }
    public function booking(Request $request)
    {
        $id_user = Auth()->user()->id;
        $id_room = $request->id_room;
        $id_order = $request->id_order;
        $IssueDate = Carbon::parse($request->IssueDate);
        $receive = $IssueDate->format('Y/m/d');
        $DueDate = Carbon::parse($request->DueDate);
        $back = $DueDate->format('Y/m/d');
        $firstName = $request->firstName;
        $lastName = $request->lastName;
        $email = $request->email;
        $phone = $request->phone;
        $paymentMethod = $request->paymentMethod ?? 1;
        $days = $IssueDate->diffInDays($DueDate);

        $room = Room::where('id', $id_room)
            ->select('id', 'price')
            ->first();
        $totalPrice = $room->price * $days;

        Invoices::create([
            'id_user'       => $id_user,
            'id_room'       => $id_room,
            'id_order'       => $id_order,
            'firstName'     => $firstName,
            'lastName'      => $lastName,
            'email'         => $email,
            'phone'         => $phone,
            'paymentMethod' => $paymentMethod,
            'note'          => $request->note,
            'total'         => $totalPrice,
            'type'          => 'Room',
            'created_at'    => now(),
            'updated_at'    => now(),
        ]);

        RentalDetail::where('id_room', $id_room)
            ->whereBetween('date', [$receive, $back])
            ->update(['status' => 0]);

        return response()->json([
            'message' => 'Đặt phòng thành công',
            'total_price' => $totalPrice,
        ]);
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

        $firstName      = $request->input('firstName');
        $lastName       = $request->input('lastName');
        $note           = $request->input('note');
        $email          = $request->input('email');
        $phone          = $request->input('phone');
        $paymentMethod  = $request->input('paymentMethod', 1);
        $id_order       = $this->generateOrderCode();
        $id_user        = auth()->id(); // Nếu chưa đăng nhập thì cần kiểm tra

        // Tính tổng tiền
        $total = 0;
        foreach ($products as $product) {
            $quantity = (int) $product['quantity'] ?? 1;
            $price = (int) $product['price'] ?? 0;
            $total += $price * $quantity;
        }

        // Tạo invoice
        $invoice = Invoices::create([
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
    function generateOrderCode() {
        $datePart = date('ymd'); // YYMMDD
        $randomPart = strtoupper(substr(bin2hex(random_bytes(5)), 0, 8)); // 8 ký tự chữ & số ngẫu nhiên
        return $datePart . $randomPart;
    }
}
