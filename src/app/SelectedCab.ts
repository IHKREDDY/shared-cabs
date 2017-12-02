export class SelectedCab {
  paxCount:number;
  PNR:string;
  cabList: Array<{route_no: number, from_loc_name: string, to_loc_name: string,lat:string,lng:string,cabType:string}>;
}