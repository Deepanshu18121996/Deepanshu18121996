import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  providers: [ NgbCarouselConfig ]
})
export class SliderComponent implements OnInit {
  images = [1, 2, 3].map(() => `https://picsum.photos/1900/800?random&t=${Math.random()}`,);
  constructor(config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.interval = 2000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
    config.wrap = true;
  }

  ngOnInit() {
  }

}
