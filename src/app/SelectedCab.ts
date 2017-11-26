export class SelectedCab {
  paxCount:number;
  PNR:string;
  cabList: Array<{route_no: number, location: string,lat:string,lng:string,cabType:string}>;
}