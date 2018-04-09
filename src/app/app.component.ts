import {
  Component, Input, ElementRef, AfterViewInit, ViewChild
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'app';
  /**
   *
   */
  @ViewChild('canvas') public canvas: ElementRef;
  private cx: CanvasRenderingContext2D;

  @Input() public width = 400;
  @Input() public height = 400;

  constructor() { }
  public ngAfterViewInit() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');

    //canvasEl.st

    canvasEl.width = this.width;
    canvasEl.height = this.height;

    this.cx.lineWidth = 3;
    this.cx.lineCap = 'round';
    //this.cx.strokeStyle = '#ff0';

    //this.cx.fillStyle = '#f00';
    //this.cx.translate(400,400);

    this.centerX = canvasEl.width / 2;
    this.centerY = canvasEl.height / 2;

    this.star = new Planet();
    this.star.size = 20;
    this.star.scale = this.scale;
    this.star.center = <Position>{ x: this.centerX, y: this.centerY };
    this.star.position = <Position>{ x: this.centerX, y: this.centerY };

    this.planet1 = new Planet();
    this.planet1.radius = 80;
    this.planet1.speed = 0.02;
    this.planet1.size = 10;
    this.planet1.scale = this.scale;
    this.planet1.center = this.star.position;

    this.planet2 = new Planet();
    this.planet2.radius = 120;
    this.planet2.speed = 0.04;
    this.planet2.size = 10;
    this.planet2.scale = this.scale;
    this.planet2.center = this.star.position;

    this.planet3 = new Planet();
    this.planet3.radius = 180;
    this.planet3.speed = 0.01;
    this.planet3.size = 15;
    this.planet3.scale = this.scale;
    this.planet3.center = this.star.position;

    this.satelit = new Planet();
    this.satelit.radius = 40;
    this.satelit.speed = 0.1;
    this.satelit.size = 8;
    this.satelit.scale = this.scale;
    this.satelit.center = this.star.position;
   

    this.startAnimation();
  }
  planet1: Planet;
  planet2: Planet;
  planet3: Planet;
  satelit: Planet;
  star: Planet;

  centerX: number = 0;
  centerY: number = 0;
  scale = 0.4;

  startAnimation = () => {
    this.cx.beginPath();
    this.cx.clearRect(-400, -400, this.width + 400, this.height + 400);

    this.planet1.nextPosition();
    this.planet1.render(this.cx);

    this.planet2.nextPosition();
    this.planet2.render(this.cx);

    this.planet3.nextPosition();
    this.planet3.render(this.cx);

    this.satelit.center = this.planet3.position;
    this.satelit.nextPosition();
    this.satelit.render(this.cx);

    this.star.render(this.cx);

    this.cx.fill();

    this.cx.closePath();

    requestAnimationFrame(this.startAnimation);
  }
}

class Position {
  public x: number;
  public y: number;
  constructor() {
  }
}
class Planet {
  setPosition(): any {
    this.position.x = this.center.x + this.radius * this.scale * Math.cos(this.angle);
    this.position.y = this.center.y + this.radius * this.scale * Math.sin(this.angle);
  }
  nextPosition(): any {
    this.angle += this.speed;
    if (this.angle > 2 * Math.PI)
      this.angle = 0;

    this.setPosition();
  }
  public position: Position = <Position>{};
  public radius: number = 0;
  public speed: number = 0;
  public angle: number = 0;
  public size: number = 0;
  public scale: number
  public center: Position

  //constructor(center: Position)
  //constructor(parentPlanet: Planet)
  constructor() {
    // if (typeof obj === typeof Position) {
    //   this.position = <Position>{};
    //   this.center = obj;
    //   this.setPosition();
    // } else if (typeof obj === typeof Planet) {
    //   this.center = (<Planet>obj).position;
    //   this.position = <Position>{};
    //   this.setPosition();
    // }
    //this.setPosition();
  }
  render(cx: CanvasRenderingContext2D) {
    cx.moveTo(this.position.x, this.position.y);
    cx.ellipse(this.position.x, this.position.y, this.size * this.scale, this.size * this.scale, 0, 0, 2 * Math.PI);
  }


  // constructor(public center: Position, ) {
  //   this.position = <Position>{};
  //   this.setPosition();
  // }
  // render(cx:CanvasRenderingContext2D){
  //   cx.moveTo(this.position.x,this.position.y);
  //   cx.ellipse(this.position.x, this.position.y,  this.size * this.scale, this.size * this.scale, 0, 0, 2 * Math.PI);
  // }
}
