export class Hotel {
  constructor(
    public name: string,
    public location: string,
    public description: string,
    public amenities: string,
    public url: string,
    public price: number,
    public id?: string
  ) {}
}
