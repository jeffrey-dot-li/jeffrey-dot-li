import { Texture } from 'three';

const easeOutSine = (t: number, b: number, c: number, d: number) => {
  return c * Math.sin((t / d) * (Math.PI / 2)) + b;
};

interface Point {
  x: number
  y: number
  age: number
  force: number
  vx: number
  vy: number
}

export default class TouchTexture {
  size: number;
  width: number;
  height: number;
  maxAge: number;
  radius: number;
  speed: number;
  trail: Point[];
  last: null | {x: number; y: number};
  canvas!: HTMLCanvasElement;
  ctx: any;
  texture!: Texture;
  constructor() {
    this.size = 64 * 2 * 2 * 2 * 2;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.width = this.height = this.size;

    this.maxAge = 64;
    this.radius = 0.15 * this.size;
    // this.radius = 0.15 * 1000;

    this.speed = 1 / this.maxAge;
    // this.speed = 0.01;

    this.trail = [];
    this.last = null;

    this.initTexture();

  }

  initTexture() {

    this.canvas = document.createElement("canvas");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = this.canvas.getContext("2d");
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.texture = new Texture(this.canvas);
    this.canvas.id = "touchTexture";
  }

  update(delta: number) {
    this.clear();
    const speed = this.speed;
    // console.log({trail : this.trail});
    this.trail.forEach((point, i) => {
      const f = point.force * speed * (1 - point.age / this.maxAge);

      point.x += point.vx * f;
      point.y += point.vy * f;
      point.age++;
      if (point.age > this.maxAge)
        this.trail.splice(i, 1);
    });

    // this.trail.forEach((point, i) => {
    //   this.drawPoint(point);
    // });
    this.drawPoints();

    // this.test();
    this.texture.needsUpdate = true;
  }

  clear() {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  addTouch(point: {x : number, y : number}) {
    let force = 0;
    let vx = 0;
    let vy = 0;
    const last = this.last;
    if (last) {
      const dx = point.x - last.x;
      const dy = point.y - last.y;
      if (dx === 0 && dy === 0) return;
      const dd = dx * dx + dy * dy;
      const d = Math.sqrt(dd);
      vx = dx / d;
      vy = dy / d;

      force = Math.min(dd * 10000, 1);
      // force = Math.sqrt(dd)* 50.;
      // force = 1;
    }
    this.last = {
      x: point.x,
      y: point.y,
    };
    this.trail.push({ x: point.x, y: point.y, age: 0, force, vx, vy });
  }

  drawPoints() {
    // const mix = (a, b, t) => a * (1 - t) + b * t;
    // const inBetweens = 0;
    for (let i = 0; i < this.trail.length; i++) {
      const point = this.trail[i];
      //   const nextPoint = this.trail[i + 1];
      //   // if (false)

      //   if (nextPoint && false) {
      //     for (let j = 0; j < inBetweens - 1; j++) {
      //       const percent = j / (inBetweens - 1);
      //       this.drawPoint({
      //         x: mix(point.x, nextPoint.x, percent),
      //         y: mix(point.y, nextPoint.y, percent),
      //         age: mix(point.age, nextPoint.age, percent),
      //         angle: mix(point.angle, nextPoint.angle, percent),
      //         force: mix(point.force, nextPoint.force, percent),
      //       });
      //     }
      //   }
      this.drawPoint(point);
    }
  }

  drawPoint(point: Point) {
    const pos = {
      x: point.x * this.width,
      y: (1 - point.y) * this.height,
    };

    let intensity = 1;
    // When you get old, you get less potent.
    // let halfMax = this.maxAge / 2;
    // intensity =
    //   Math.min(1, point.age / halfMax) -
    //   Math.max(0, (point.age - halfMax) / halfMax);
    // let intensity = 1;

    const easeInQuad = (t: number, b: number, c: number, d: number) => {
      t /= d;
      return c * t * t + b;
    };

    const easeOutQuad = (t: number, b: number, c: number, d: number) => {
      t /= d;
      return -c * t * (t - 2) + b;
    };

    if (point.age < this.maxAge * 0.3) {
      intensity = easeOutSine(point.age / (this.maxAge * 0.3), 0, 1, 1);
    }
    else {
      intensity = easeOutQuad(
        1 - (point.age - this.maxAge * 0.3) / (this.maxAge * 0.7),
        0,
        1,
        1,
      );
    }
    // intensity = easeOutSine(1 - point.age / this.maxAge, 0, 1, 1);
    // intensity = 1 - point.age / this.maxAge;
    const i = intensity;
    intensity *= point.force;

    const radius = this.radius;
    const grd = this.ctx.createRadialGradient(
      pos.x,
      pos.y,
      radius * 0.3,
      pos.x,
      pos.y,
      radius,
    );
    const color = `${((point.vx + 1) / 2) * 255}, ${((point.vy + 1) / 2)
      * 255}, ${intensity * 255}`;
      // color = `${(intensity) * 255},${(intensity) * 255},${(intensity) * 255}`

    grd.addColorStop(0, `rgba(${color}, ${0.2 * intensity})`);
    grd.addColorStop(1, `rgba(${color},0.0)`);

    this.ctx.beginPath();
    this.ctx.fillStyle = grd;
    this.ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
    this.ctx.fill();
  }
}
