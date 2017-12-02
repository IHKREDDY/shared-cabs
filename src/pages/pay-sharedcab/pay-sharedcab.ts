import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PaySharedcabPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pay-sharedcab',
  templateUrl: 'pay-sharedcab.html',
})
export class PaySharedcabPage {

    payAmount : any;
    CCNo :any;
    CCName : any;
    CVV : any;
    


    expMonths = [
       {name: "Month"},{name: "Jan"}, {name: "Feb"},{name: "Mar"},
       {name: "Apr"},{name: "May"},{name: "Jun"}, 
       {name: "Jul"},{name: "Aug"},{name: "Sep"},
       {name: "Oct"},{name: "Nov"},{name: "Dec"}];

       expMonthSel = this.expMonths[0];
       
       //expYears = [
        //{name: "Year"},{name: "2017"}, {name: "2018"},{name: "2019"},
        //{name: "2020"},{name: "2021"}];

        currentYear = (new Date()).getFullYear();//2017;
        
              expYears = [
                  { name: "Year" }, { name: this.currentYear + "" }, { name: (this.currentYear +1) + "" }, { name: (this.currentYear+2) + ""},
                  { name: (this.currentYear+3) + "" }, { name: (this.currentYear+4) + ""}];
 
        expYearSel = this.expYears[0];
       

   // expYearSel = {
   //     selectedMonth: "Year"
   // };

    //currentYear = 2017;

    //expYears = [
      //  "Year", this.currentYear, this.currentYear + 1, this.currentYear + 2, this.currentYear + 3, this.currentYear + 4, this.currentYear+5];


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaySharedcabPage');
  }

}
