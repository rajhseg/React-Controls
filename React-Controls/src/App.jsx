
import { useEffect } from 'react';
import './App.css'
import { RButton } from './RButton/RButton'
import { RDonutChart, RDonutChartItem } from './RDonutChart/RDonutChart';

function App() {

  const handleClick = (e) => {
    alert("hi");
  }

  
  let donutItems = [];

  const createDonutItems = () =>{
    let pieItem1 = new RDonutChartItem(24,'Cricket', 'grey', 'white');
    let pieItem2 = new RDonutChartItem(35,'Volleyball', 'purple', 'white');
    let pieItem3 = new RDonutChartItem(12,'Tennis', 'gray', 'white');
    let pieItem4 = new RDonutChartItem(44,'BaseBall', 'teal', 'white');
    let pieItem5 = new RDonutChartItem(14,'Hockey', 'darkblue', 'white');
    let pieItem6 = new RDonutChartItem(44,'Football', '#13297A', 'white');

    donutItems.push(pieItem1);
    donutItems.push(pieItem2);
    donutItems.push(pieItem3);
    donutItems.push(pieItem4);
    donutItems.push(pieItem5);
    donutItems.push(pieItem6);
  }

  useEffect(()=>{
    createDonutItems();
  }, []);

  return (
      <>
        <RButton IsDisabled={false} onClick={handleClick}>Submit</RButton>

        <RDonutChart DataListHeight={100} ChartWidth={300} ShadowColor={'blue'} ChartItems={donutItems} Opacity={'0.8'}></RDonutChart>
      </>
  )
}

export default App
