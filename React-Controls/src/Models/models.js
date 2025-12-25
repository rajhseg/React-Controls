
export class Graph {
    constructor(xPoint, yPoint) {
        this.xPoint = xPoint;
        this.yPoint = yPoint;
    }
}


export class PopupChartItem {
    constructor( x1,  y1,  x2,  y2, 
         Item,  ValueIndex,  ItemIndex,
         ItemColor = 'gray'){
            this.x1 = x1;
            this.y1 = y1;
            this.x2 = x2;
            this.y2 =  y2;
            this.Item = Item;
            this.ValueIndex = ValueIndex;
            this.ItemIndex = ItemIndex;
            this.ItemColor = ItemColor;
    }
}

export class DrawTextItem {
    constructor(value,  x,  y,  color,  rotate = false) {

        this.value = value;
        this.x = x;
        this.y = y;
        this.color = color;
        this.rotate = rotate;

    }
}
