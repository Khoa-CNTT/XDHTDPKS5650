<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;
use App\Models\Invoices;

class InvoicePaidNotification extends Notification
{
    protected $invoice;

    public function __construct(Invoices $invoice)
    {
        $this->invoice = $invoice;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Đặt phòng thành công')
            ->greeting('Xin chào ' . $this->invoice->name)
            ->line('Bạn đã đặt phòng thành công. Thông tin chi tiết:')
            ->line('• Tên phòng: ' . optional($this->invoice->room)->room_name)
            ->line('• Giá: ' . number_format($this->invoice->total, 0, ',', '.') . ' VNĐ')
            ->line('• Từ ngày: ' . $this->invoice->issueDate)
            ->line('• Đến ngày: ' . $this->invoice->dueDate)
            ->line('• Ghi chú: ' . ($this->invoice->note ?? 'Không có'))
            ->line('Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!')
            ->salutation('Trân trọng, Đội ngũ hỗ trợ');
    }
}

