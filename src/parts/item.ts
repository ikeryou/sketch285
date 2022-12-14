import { Color } from "three";
import { Conf } from "../core/conf";
import { Func } from "../core/func";
import { Mouse } from "../core/mouse";
import { MyDisplay } from "../core/myDisplay";
import { Tween } from "../core/tween";
import { Util } from "../libs/util";

// -----------------------------------------
//
// -----------------------------------------
export class Item extends MyDisplay {

  private _itemId:number;
  private _txt:Array<HTMLElement> = [];
  private _fontSize:number = 32 * 1;
  private _radius:number;

  constructor(opt:any) {
    super(opt)

    this._itemId = opt.id;

    const sw = Func.instance.sw();
    const sh = Func.instance.sh();
    const baseRadius = Math.min(sw, sh) * 0.15;
    this._radius = Util.instance.map(this._itemId, baseRadius * 0.35, baseRadius, 0, Conf.instance.ITEM_NUM);

    // 円周に収まる数だけつくる
    const dist = this._radius * 2 * 3.14;
    let num = ~~(dist / (this._fontSize * 0.25));
    if(num % 2 != 0) num += 1

    for(let i = 0; i < num; i++) {
      const t = document.createElement('span');
      t.classList.add('item-txt');
      this.getEl().append(t);

      const col = new Color(['#FFF', '#FF0000'][i % 2])
      const size = i % 2 == 0 ? this._fontSize * 2 : this._fontSize * 0.5;

      Tween.instance.set(t, {
        width: size * 4,
        height: size * 0.5,
        backgroundColor: '#' + col.getHexString(),
        border: '2px solid #0000FF'
      })

      this._txt.push(t);
    }
  }


  protected _update(): void {
    super._update();

    const mx = Mouse.instance.easeNormal.x
    const my = Mouse.instance.easeNormal.y

    let radius = this._radius * Util.instance.map(mx, 1, 6, -1, 1);

    const ang = (this._c * 0.5) * (this._itemId % 2 == 0 ? 1 : -1);
    this._txt.forEach((val,i) => {
      const fontSize = this.getRect(val);

      const radian = Util.instance.radian(ang + (360 / this._txt.length) * i);
      const x = Math.sin(radian) * radius;
      const y = Math.cos(radian) * radius;

      const dx = -x;
      const dy = -y;
      const rot = Util.instance.degree(Math.atan2(dy, dx)) + (my * -180);

      Tween.instance.set(val, {
        x:x - fontSize.width * 0.5,
        y:y - fontSize.height * 0.5,
        rotationZ:rot,
        rotationX:0.01,
      });
    })
  }
}