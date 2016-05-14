import {Inject, ViewChild, ElementRef, Renderer} from 'angular2/core';
import {Page} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/home/home.html',
  styles: [`
    video {display: none;}
    ion-card ion-card-content {padding: 0; line-height: 0; text-align: center;}
  `]
})
export class HomePage {

  @ViewChild('canvas') canvas;
  @ViewChild('video') video;

  constructor(
    elementRef: ElementRef,
    renderer: Renderer
  ) {
  }

  ngAfterViewInit() {

    window.URL = window.URL || (<any>window).webkitURL ;
    (<any>navigator).getUserMedia = (<any>navigator).getUserMedia || (<any>navigator).webkitGetUserMedia;

    if((<any>navigator).getUserMedia){
      (<any>navigator).getUserMedia({video: true},function(stream) {
      video.src = window.URL.createObjectURL(stream);
      }, (e) => {
        console.log('failed',e);
      });
    }

    let draw = () => {
      if (video.paused || video.ended) {
        return;
      }
      context.drawImage(video, 0, 0, vw, vh);
      window.requestAnimationFrame(draw);
    }

    let video = this.video.nativeElement;
    let canvas = this.canvas.nativeElement;
    let context = canvas.getContext('2d');
    let vw, vh;
    video.addEventListener('loadedmetadata', function() {
        vw = this.videoWidth || this.width;
        vh = this.videoHeight || this.height;
        canvas.width = Math.min(window.innerWidth, vw);
        canvas.height = vh;
    }, false);
    video.addEventListener('play', draw, false);

  }
}
