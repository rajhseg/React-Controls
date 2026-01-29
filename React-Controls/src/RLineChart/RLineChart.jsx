
import PropTypes from 'prop-types';
import { PopupChartItem } from '../Models/models.js'
import styles from './RLineChart.module.css';
import { forwardRef, useEffect, useId, useImperativeHandle, useRef, useState } from 'react';


export class RLineChartItem {
    constructor(ItemName, ItemColor, Values = []) {
        this.ItemName = ItemName;
        this.ItemColor = ItemColor;
        this.Values = Values;
    }
}

const RLineChart = forwardRef(function RLineChart({
    Style,
    PlotItemSize = 3,
    TextColor = "gray",
    XAxisTitle = "",
    YAxisTitle = "",
    XAxisItemNames = [],
    NoOfSplitInYAxis = 4,
    Width = 300,
    Height = 300,
    MarginX = 50,
    MarginY = 50,
    DataListHeight = 50,
    PopupBackColor = "lightgray",
    PopupForeColor = undefined,
    PopupBackgroundOpacity = 1,
    ChartItems = []
}, ref) {


    let context = null;
    let PopupItems = [];
    let Id = useId();
    let HostElementId = useId();

    const [IsRendered, setIsRendered] = useState(false);
    const [RenderItems, setRenderItems] = useState([]);

    const bar = useRef();

    useImperativeHandle(ref, () => ({
        Id: Id,
        HostElementId: HostElementId,
        IsRendered: IsRendered,
        Render() {
            RenderedLineChart();
        },
    }))

    useEffect(() => {
        setRenderItems((prevState) => []);

        let itms = [];

        for (let i = 0; i < ChartItems.length; i++) {
            let itm = ChartItems[i];
            itms.push(itm);
        }

        setRenderItems((prevState) => [...prevState, ...itms])
    }, [
        PlotItemSize,
        TextColor,
        XAxisTitle,
        YAxisTitle,
        NoOfSplitInYAxis,
        Width,
        Height,
        MarginX,
        MarginY,
        DataListHeight,
        PopupBackColor,
        PopupForeColor,
        PopupBackgroundOpacity,
        ChartItems,
        XAxisItemNames
    ]);

    useEffect(() => {

        context = bar.current.getContext('2d');
        bar.current.onmousemove = MouseMove.bind(this);

        RenderedLineChart();

    }, [RenderItems]);


    const NoOfSplitInXAxis = () => {
        return XAxisItemNames.length;
    }

    const MouseMove = (event) => {
        if (context && bar) {
            context?.beginPath();
            context.clearRect(0, 0, Width, Height);
            context.closePath();

            RenderedLineChart();

            let item = MouseOnTopOfItem(event.offsetX, event.offsetY);

            if (item) {

                let lineItem = item.Item;
                let x = event.offsetX + 10;
                let y = event.offsetY;
                let met = context.measureText(lineItem.Values[item.ValueIndex].toString());
                let met1 = context.measureText(XAxisItemNames[item.ValueIndex]);

                let xtitle = context.measureText(XAxisTitle);
                let ytitle = context.measureText(YAxisTitle);

                let w1 = met.width + xtitle.width;
                let w2 = met1.width + ytitle.width;

                let width = Math.max(w1, w2);

                let textWidth = 25 + width;

                if (x + textWidth > Width) {
                    x = x - textWidth - 20;
                }

                let height = 40;
                if (y + height > Height) {
                    y = y - height;
                }

                context.beginPath();
                context.save();
                context.globalAlpha = PopupBackgroundOpacity;
                context.fillStyle = PopupBackColor;
                context.rect(x, y, textWidth, 40);
                context.fill();
                context.restore();
                context.closePath();

                context.beginPath();
                context.save();

                context.strokeStyle = PopupForeColor ?? item.ItemColor;
                context.fillStyle = PopupForeColor ?? item.ItemColor;
                context.fillText(" " + XAxisTitle + " : " + XAxisItemNames[item.ValueIndex], x + 5, y + 15);
                context.fillText(" " + YAxisTitle + " : " + lineItem.Values[item.ValueIndex], x + 5, y + 35);
                context.stroke();

                context.restore();
                context?.closePath();
            }
        }
    }


    const MouseOnTopOfItem = (x, y) => {

        let boundaryRange = 3;

        for (let index = 0; index < PopupItems.length; index++) {
            const element = PopupItems[index];
            if (x >= element.x1 - boundaryRange && x <= element.x2 + boundaryRange
                && y >= element.y1 - boundaryRange && y <= element.y2 + boundaryRange) {
                return element;
            }
        }

        return undefined;
    }

    const getWidthFromString = (value) => {

        if (context) {
            let metrics = context.measureText(value);
            return metrics.width;
        }

        return 50;
    }

    const getTextHeight = (met) => {
        return met.actualBoundingBoxAscent + met.actualBoundingBoxDescent;
    }

    const isPropString = (prop) => {
        return typeof prop === 'string';
    }

    const RenderedLineChart = () => {

        setIsRendered((prev) => false);

        PopupItems = [];

        if (bar && context && RenderItems && RenderItems.length > 0) {
            let min = undefined;
            let max = undefined;
            context.clearRect(0, 0, Width, Height);

            let spaceFromTopYAxis = 25;
            let spaceFromRightXAxis = 25;

            let yValues = [];

            for (let index = 0; index < RenderItems.length; index++) {
                const element = RenderItems[index];
                let _y = element.Values.map(y => y);
                yValues = [...yValues, ..._y];
            }

            if (yValues) {

                min = MinArray(yValues);
                max = MaxArray(yValues);

                let ydistance = 0;
                if (min !== undefined && max !== undefined) {
                    ydistance = (max) / NoOfSplitInYAxis;
                }

                ydistance = GetRoundToTenDigit(ydistance);

                var MinLimit = 0;
                var MaxLimit = ydistance * (NoOfSplitInYAxis);

                var StartX = MarginX;
                var StartY = Height - MarginY;

                /* Draw Vertical Line */
                context.beginPath();
                context.moveTo(StartX, StartY);
                context.lineTo(StartX, 0);
                context.strokeStyle = TextColor;
                context.stroke();

                /* Draw Horizontal Line */
                context.moveTo(StartX, StartY);
                context.lineTo(Width, StartY);
                context.strokeStyle = TextColor;
                context.stroke();
                context.closePath();


                /* Draw Title on x-axis */
                context.beginPath();

                let met = context.measureText(XAxisTitle);
                let xTextPoint = (Width - MarginX) / 2 + MarginX;
                xTextPoint = xTextPoint - (met.width / 2);
                let yTextPoint = Height - 10;

                context.save();
                context.fillStyle = TextColor;
                context.fillText(XAxisTitle, xTextPoint, yTextPoint);
                context.restore();

                context.closePath();

                /* Draw Title On Y axis */
                context.beginPath();
                context.save();

                met = context.measureText(XAxisTitle);
                yTextPoint = (Height - MarginY) / 2;
                yTextPoint = yTextPoint + (met.width / 2);
                xTextPoint = 15;
                context.fillStyle = TextColor;
                context.translate(xTextPoint, yTextPoint);
                context.rotate((Math.PI / 180) * 270);
                context.fillText(YAxisTitle, 0, 0);

                context.restore();
                context.closePath();


                /* Draw y axis line */
                let yvDistance = (StartY - spaceFromTopYAxis) / NoOfSplitInYAxis;

                /* Draw Y Axis */
                for (let index = 0; index <= NoOfSplitInYAxis; index++) {
                    let yDisplayValue = Math.round(ydistance * (NoOfSplitInYAxis - index));
                    let yPoint = Math.round((yvDistance * index) + spaceFromTopYAxis);

                    HorizontalLineInYAxis(StartX, yPoint);
                    DrawHorizontalLine(StartX, yPoint);
                    HorizontalLineDisplayValueInYAxis(yDisplayValue.toString(), StartX, yPoint);
                }

                /* Draw X Axis Line */
                let xdistance = 0;
                xdistance = (Width - MarginX - spaceFromRightXAxis) / NoOfSplitInXAxis();

                xdistance = GetRoundToTenDigit(xdistance);
                let xvDistance = (Width - StartX - spaceFromRightXAxis) / NoOfSplitInXAxis();

                for (let index = 0; index < NoOfSplitInXAxis(); index++) {
                    let xDisplayValue = XAxisItemNames[index];
                    let xPoint = (xvDistance * (index + 1)) + StartX;
                    let yPoint = Height - MarginY;

                    DrawVerticalLine(xPoint, yPoint);
                    DrawVerticalLineInXAxis(xPoint, yPoint);
                    DrawVerticalLineDisplayValueInXAxis(xDisplayValue.toString(), xPoint, yPoint);
                }

                for (let index = 0; index < RenderItems.length; index++) {
                    const element = RenderItems[index];

                    let prevX = undefined;
                    let prevY = undefined;

                    for (let v = 0; v < element.Values.length; v++) {
                        const item = element.Values[v];

                        let xPoint = xvDistance * (v + 1) + MarginX;

                        let yindx = -(item / ydistance) + NoOfSplitInYAxis;
                        let yPoint = Math.round((yvDistance * yindx) + spaceFromTopYAxis);

                        /* Plot Circle */
                        Plot(xPoint, yPoint, element.ItemColor);

                        PopupItems.push(new PopupChartItem(xPoint, yPoint, xPoint + PlotItemSize,
                            yPoint + PlotItemSize, element, v, index, element.ItemColor));

                        /* Plot Line */
                        if (prevX !== undefined && prevY !== undefined) {
                            PlotLine(xPoint, yPoint, prevX, prevY, element.ItemColor);
                        }

                        prevX = xPoint;
                        prevY = yPoint;
                    }

                }

            }

            setIsRendered((prev) => true);
        }
    }

    const PlotLine = (xPoint, yPoint, prevX, prevY, color) => {
        if (context) {
            context.beginPath();
            context.strokeStyle = color;
            context.moveTo(prevX, prevY);
            context.lineTo(xPoint, yPoint);
            context.stroke();
            context.closePath();
        }
    }

    const Plot = (x, y, color) => {
        if (context) {
            context.beginPath();
            context.strokeStyle = color;
            context.fillStyle = color;
            context.ellipse(x, y, PlotItemSize, PlotItemSize, 0, 0, 2 * Math.PI);
            context.stroke();
            context.fill();
            context.closePath();
        }
    }

    const DrawVerticalLine = (xPoint, yPoint) => {
        if (context) {
            context.beginPath();
            context.lineWidth = 0.2;
            context.strokeStyle = TextColor;
            context.moveTo(xPoint, yPoint);
            context.lineTo(xPoint, 0);
            context.stroke();
            context.closePath();
        }
    }

    const DrawVerticalLineDisplayValueInXAxis = (value, xPoint, yPoint) => {
        if (context) {
            context.beginPath();

            let met = context.measureText(value);
            let endY = yPoint + 15;

            context.fillStyle = TextColor;
            context.fillText(value, (xPoint - (met.width / 2)), endY);
            context.fill();
            context.stroke();
            context.closePath();
        }
    }

    const DrawVerticalLineInXAxis = (xPoint, yPoint) => {
        if (context) {
            context.beginPath();
            let startY = yPoint - 5;
            let endY = yPoint + 5;
            context.lineWidth = 1;
            context.strokeStyle = TextColor;
            context.moveTo(xPoint, startY);
            context.lineTo(xPoint, endY);
            context.stroke();
            context.closePath();
        }
    }

    const GetRoundToTenDigit = (distance) => {
        let j = distance / 10;
        let roundedJ = Math.ceil(j);
        distance = roundedJ * 10;

        return distance;
    }

    const GetYStartPoint = (displayValue, distance, itemcount,
        vDistance, spaceFromTopYAxis) => {
        let index = -(displayValue / distance) + NoOfSplitInXAxis();
        let yPoint = Math.round((vDistance * index) + spaceFromTopYAxis);
        return yPoint;
    }

    const DrawXAxisName = (name, xPoint, yPoint) => {
        if (context) {
            let startY = yPoint;
            context.beginPath()
            context.moveTo(xPoint, startY);
            context.fillStyle = TextColor;
            context.fillText(name, xPoint, startY);
            context.fill();
            context.strokeStyle = TextColor;
            context.stroke();
            context.closePath();
        }
    }

    const DrawBar = (startX, startY, xdistance, yDistance, color) => {
        if (context) {
            context.beginPath();
            context.fillStyle = color;
            context.fillRect(startX, startY, xdistance, yDistance);
            context.fill();
            context.closePath();
        }
    }

    const HorizontalLineDisplayValueInYAxis = (value, x, ypoint) => {
        if (context) {
            context.beginPath();
            let metrics = context.measureText(value);

            let StartX = x - 7 - metrics.width;
            let StartY = ypoint + 3;
            let EndX = x - 7;
            let EndY = ypoint;

            context.fillStyle = TextColor;
            context.moveTo(StartX, StartY);
            context.fillText(value, StartX, StartY);
            context.fill();
            context.stroke();
            context.closePath();
        }
    }

    const DrawHorizontalLine = (x, ypoint) => {
        if (context) {
            context.beginPath();
            let startX = x;
            let endX = x + Width - MarginX;
            context.lineWidth = 0.2;
            context.strokeStyle = TextColor;
            context.moveTo(startX, ypoint);
            context.lineTo(endX, ypoint);
            context.stroke();
            context.closePath();
        }
    }

    const HorizontalLineInYAxis = (x, ypoint) => {
        if (context) {
            context.beginPath();
            let StartX = x - 5;
            let StartY = ypoint;
            let EndX = x + 5;
            let EndY = ypoint;

            context.strokeStyle = TextColor;
            context.moveTo(StartX, StartY);
            context.lineTo(EndX, EndY);

            context.stroke();
            context.closePath();
        }
    }

    const DrawText = (text, x, y, forecolor, rotate = undefined) => {
        if (context) {
            context.beginPath();
            context.strokeStyle = forecolor;
            context.fillStyle = forecolor;
            context.fillText(text, x, y);
            context.fill();
            context.stroke();
            context.closePath();
        }
    }

    const MinArray = (array) => {
        return array.reduce((x, y) => {
            return x < y ? x : y;
        });
    }

    const MaxArray = (array) => {
        return array.reduce((x, y) => {
            return x > y ? x : y;
        })
    }

    const IsLineItemListEqual = (a, b) => {

        if ((a == null || a === undefined) && (b == null || b === undefined))
            return true;

        if (a == null || b == null || a === undefined || b === undefined)
            return false;

        if (a.length !== b.length)
            return false;

        for (let index = 0; index < a.length; index++) {
            let element1 = a[index];
            let element2 = b[index];

            if (element1.ItemName !== element2.ItemName || element1.ItemColor !== element2.ItemColor ||
                element1.Values.map(x => x).toString() !== element2.Values.map(x => x).toString()) {
                return false;
            }
        }

        return true;
    }


    return (
        <>
            <div id={HostElementId} style={Style} className={styles.host}>
                <div id={Id}>
                    <canvas ref={bar} width={Width} height={Height}>

                    </canvas>
                    {
                        IsRendered &&

                        <div style={{ position: 'relative', alignContent: 'center', bottom: '10px', height: DataListHeight + 'px' }}>
                            <div className={styles.dataContainer} style={{ 'width': (Width - MarginX) + 'px' }}>
                                {
                                    RenderItems.map((itm, index) => (
                                        <div key={index} className={styles.data}>
                                            <div className={styles.indicator} style={{ backgroundColor: itm.ItemColor }}>
                                            </div>
                                            <span className={styles.title} style={{ width: 'fit-content' }}>{itm.ItemName}</span>
                                        </div>
                                    ))
                                }

                            </div>
                        </div>
                    }

                </div>
            </div>
        </>
    );
});


RLineChart.propTypes = {
    Style: PropTypes.any,
    PlotItemSize: PropTypes.number,
    TextColor: PropTypes.string,
    XAxisTitle: PropTypes.string,
    YAxisTitle: PropTypes.string,
    XAxisItemNames: PropTypes.arrayOf(PropTypes.string),
    NoOfSplitInYAxis: PropTypes.number,
    Width: PropTypes.number,
    MarginX: PropTypes.number,
    MarginY: PropTypes.number,
    Height: PropTypes.number,
    DataListHeight: PropTypes.number,
    PopupBackColor: PropTypes.string,
    PopupForeColor: PropTypes.string,
    PopupBackgroundOpacity: PropTypes.number,
    ChartItems: PropTypes.arrayOf(PropTypes.shape(
        {
            ItemName: PropTypes.string,
            ItemColor: PropTypes.string,
            Values: PropTypes.arrayOf(PropTypes.number)  
        }
    ))
}

export default RLineChart;
