import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

function Schedule() {
  useEffect(() => {
    myFunction();
  }, []);
  const url = "http://127.0.0.1:3000/trains";
  const [data, setdata] = useState([])
  const [trainData, settrainData] = useState({});
  const getTrainDetails = async(item,id)=> {
    const response = await fetch(url+'/'+id);
    const jsonData = await response.json();
    settrainData(jsonData);
    console.log(jsonData)
  }
  const myFunction = async () => {
    try {
      const response = await fetch(url);
      const jsonData = await response.json();
      setdata(jsonData);
      console.log(jsonData);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
    <Table striped>
      <thead>
        <tr>
          <th>Train Number</th>
          <th>Train Name</th>
          <th>Departure Time</th>
          <th>Seats Availabe(SL)</th>
          <th>Seats Availabe(AC)</th>
          <th>Price(SL)</th>
          <th>Price(AC)</th>
          <th>Delayed by</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
            <tr key={item.trainNumber} onClick={() => getTrainDetails(item,item.trainNumber)}>
              <td>{item.trainNumber}</td>
              <td>{item.trainName}</td>
              <td>{item.departureTime.Hours+':'+item.departureTime.Minutes+':'+item.departureTime.Seconds}</td>
              <td>{item.seatsAvailable.sleeper}</td>
              <td>{item.seatsAvailable.AC}</td>
              <td>{item.price.sleeper}</td>
              <td>{item.price.AC}</td>
              <td>{item.delayedBy}</td>
            </tr>
        ))}
      </tbody>
    </Table>
    <ListGroup className='m-5'>
      {/* <ListGroup.Item>Train Number: {trainData.trainNumber}</ListGroup.Item> */}
      {/* <ListGroup.Item>Train Name: {trainData.trainName}</ListGroup.Item> */}
      {/* <ListGroup.Item>Train Departure Time: {trainData.departureTime.Hours+':'+trainData.departureTime.Minutes+':'+trainData.departureTime.Seconds}</ListGroup.Item> */}
      {/* <ListGroup.Item>Seats Availabe(SL): {trainData.seatsAvailable.sleeper}</ListGroup.Item> */}
      {/* <ListGroup.Item>Seats Availabe(AC): {trainData.seatsAvailable.AC}</ListGroup.Item> */}
      {/* <ListGroup.Item>Price(SL): {trainData.price.sleeper}</ListGroup.Item> */}
      {/* <ListGroup.Item>Price(AC): {trainData.price.AC}</ListGroup.Item> */}
      {/* <ListGroup.Item>Delayed By: {trainData.delayedBy}</ListGroup.Item> */}
    </ListGroup>
    </>
  );
}

export default Schedule;