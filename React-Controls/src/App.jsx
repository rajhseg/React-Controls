
import { useEffect, useState } from 'react';
import './App.css'
import { RButton } from './RButton/RButton'
import { RDonutChart, RDonutChartItem } from './RDonutChart/RDonutChart';
import { RPieChart, RPieChartItem } from './RPieChart/RPieChart';

function App() {

  const [chartItems, setChartItems] = useState([]);

  const [piechartItems, setPieChartItems] = useState([]);

  const [ButtonHeight, setButtonHeight] = useState('32px');

  const handleClick = (e) => {
      let pieItem1 = new RDonutChartItem(24,'Batminton', 'darkgreen', 'white');
      setChartItems((prev)=> [...prev, pieItem1]);

      let pieItem2 = new RPieChartItem(24, 'Batminton', 'darkgreen', 'white');
      setPieChartItems((prev)=> [...prev, pieItem2]);

      setButtonHeight((prevState) => '40px');
  }

  const createDonutItems = () => {

    let pieItem1 = new RDonutChartItem(24,'Cricket', 'grey', 'white');
    let pieItem2 = new RDonutChartItem(35,'Volleyball', 'purple', 'white');
    let pieItem3 = new RDonutChartItem(12,'Tennis', 'gray', 'white');
    let pieItem4 = new RDonutChartItem(44,'BaseBall', 'teal', 'white');
    let pieItem5 = new RDonutChartItem(14,'Hockey', 'darkblue', 'white');
    let pieItem6 = new RDonutChartItem(44,'Football', '#13297A', 'white');
    
    setChartItems((prev)=>[]);

    let donutItems = [];
    
    donutItems.push(pieItem1);
    donutItems.push(pieItem2);
    donutItems.push(pieItem3);
    donutItems.push(pieItem4);
    donutItems.push(pieItem5);
    donutItems.push(pieItem6);

    setChartItems((prev)=> [...prev, ...donutItems]);
  }

  const CreatePieChartItems = () => {

    let pieItem1 = new RPieChartItem(24,'Cricket', 'grey', 'white');
    let pieItem2 = new RPieChartItem(35,'Volleyball', 'purple', 'white');
    let pieItem3 = new RPieChartItem(12,'Tennis', 'gray', 'white');
    let pieItem4 = new RPieChartItem(44,'BaseBall', 'teal', 'white');
    let pieItem5 = new RPieChartItem(14,'Hockey', 'darkblue', 'white');
    let pieItem6 = new RPieChartItem(44,'Football', '#13297A', 'white');
    
    setPieChartItems((prev)=>[]);

    let pieItems = [];
    
    pieItems.push(pieItem1);
    pieItems.push(pieItem2);
    pieItems.push(pieItem3);
    pieItems.push(pieItem4);
    pieItems.push(pieItem5);
    pieItems.push(pieItem6);

    setPieChartItems((prev)=> [...prev, ...pieItems]);
  }


  useEffect(()=>{
    createDonutItems();
    CreatePieChartItems();
  }, []);

  return (
      <>
        <RButton ButtonHeight={ButtonHeight} IsDisabled={false} onClick={handleClick}>Submit</RButton>

        <RDonutChart DataListHeight={100} ChartWidth={300} ShadowColor={'blue'} ChartItems={chartItems} Opacity={'0.8'}></RDonutChart>

        <RPieChart DataListHeight={100} ChartWidth={300} ShadowColor={'blue'} ChartItems={piechartItems} Opacity={'0.8'}></RPieChart>
      </>
  )
}

export default App
