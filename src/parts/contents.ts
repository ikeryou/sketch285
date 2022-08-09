import { Conf } from "../core/conf";
import { Func } from "../core/func";
import { Mouse } from "../core/mouse";
import { MyDisplay } from "../core/myDisplay";
import { Tween } from "../core/tween";
import { Util } from "../libs/util";
import { Item } from "./item";

// -----------------------------------------
//
// -----------------------------------------
export class Contents extends MyDisplay {

  private _id:number;
  private _item:Array<Item> = [];

  constructor(opt:any) {
    super(opt)

    this._id = opt.id;

    const num = Conf.instance.ITEM_NUM;
    for(let i = 0; i < num; i++) {
      const itemEl = document.createElement('span');
      itemEl.classList.add('item');
      this.getEl().append(itemEl);

      const item = new Item({
        id:i,
        el:itemEl,
      });
      this._item.push(item);
    }
  }


  protected _update(): void {
    super._update();

    const sw = Func.instance.sw();
    const sh = Func.instance.sh();

    const ang = this._c * Mouse.instance.easeNormal.x * 0.25 + (360 / Conf.instance.CON_NUM) * this._id;
    const rad = Util.instance.radian(ang);
    const radius = Math.min(sw, sh) * 0.25;

    let x = sw * 0.5 + Math.sin(rad) * radius;
    let y = sh * 0.5 + Math.cos(rad) * radius;

    Tween.instance.set(this.getEl(), {
      x: x,
      y: y,
    })
  }
}