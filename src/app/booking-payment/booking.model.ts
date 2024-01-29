export class Booking {
  constructor(
    public hotelId: string,
    public roomsQuantity: number,
    public fromDate: string,
    public toDate: string,
    public totalAmount: number,
    public bookingId?: string
  ) {}
}
