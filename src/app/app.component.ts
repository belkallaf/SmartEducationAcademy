import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

declare const TestScroll: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'smartAcademyApp';

  constructor(){}

  ngOnInit(): void{

    this.loadJsFile('assets/vendor/owl.carousel/owl.carousel.min.js');
    // this.loadJsFile('assets/vendor/counterup/counterup.min.js');
    this.loadJsFile('assets/js/main.js');
  }
  // // tslint:disable-next-line:typedef
  // jquery( '.back-to-top' ).click( function() {
  //   alert(1);
  //   $('html, body').animate({
  //       scrollTop: 0
  //   }, 1500, 'easeInOutExpo');
  //   return false;
  // });

  backToTop(): void{
    // alert(1);
    // $('html, body').animate({
    //     scrollTop: 0
    //      }, 1500, 'easeInOutExpo');
    // alert(2);
    // return false;
    // TestScroll();
  }

  loadJsFile(url): void {
    const node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

}
