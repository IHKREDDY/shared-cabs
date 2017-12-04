export class SelectedCab {
  paxCount:number;
  PNR:string;
  cabList: Array<{route_no: number, from_loc_name: string, to_loc_name: string,from_coordinates:string,to_coordinates:string,cabType:string}>;
}