export class Room {
  _Id: string;
  room_name: string;
  room_number: number;
  type: string;
  max_occupancy: number;
  cost_per_night: number;
  floor: number;
  images: [
    {filename: string}
    ];
  attributes = [];
  booking: [
    {}
    ];
  hotel: string;
}
