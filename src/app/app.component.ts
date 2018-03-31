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

    canvasEl.width = this.width;
    canvasEl.height = this.height;

    this.cx.lineWidth = 3;
    this.cx.lineCap = 'round';
    //this.cx.strokeStyle = '#ff0';

    //this.cx.fillStyle = '#f00';
    //this.cx.translate(400,400);

    this.centerX = canvasEl.width / 2 - 105;
    this.centerY = canvasEl.height / 2 - 105;

    this.planet1 = new Planet(<Position>{ x: this.centerX, y: this.centerY }, this.scale);
    this.planet1.radius = 80;
    this.planet1.speed = 0.02;
    this.planet1.size = 10;

    this.planet2 = new Planet(<Position>{ x: this.centerX, y: this.centerY }, this.scale);
    this.planet2.radius = 120;
    this.planet2.speed = 0.04;
    this.planet2.size = 10;

    this.planet3 = new Planet(<Position>{ x: this.centerX, y: this.centerY }, this.scale);
    this.planet3.radius = 180;
    this.planet3.speed = 0.01;
    this.planet3.size = 15;

    this.startAnimation();
  }
  planet1: Planet;
  planet2: Planet;
  planet3: Planet;
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
    

    this.cx.moveTo(this.centerX, this.centerY);
    this.cx.ellipse(this.centerX, this.centerY, 20 * this.scale, 20 * this.scale, 0, 0, 2 * Math.PI);
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
  public position: Position;
  public radius: number;
  public speed: number = 0;
  public angle: number = 0;
  public size: number = 0;

  constructor(public center: Position, public scale: number) {
    this.position = <Position>{};
  }
  render(cx:CanvasRenderingContext2D){
    //cx.beginPath()
    cx.moveTo(this.position.x,this.position.y);
    cx.ellipse(this.position.x, this.position.y,  this.size * this.scale, this.size * this.scale, 0, 0, 2 * Math.PI);
    //cx.arc(x2, y2, 10 * this.scale, 0, 2 * Math.PI);
    //cx.closePath()
  }
}
