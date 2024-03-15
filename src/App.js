import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import ApexChart from './components/Apexchart';

const RequestGraph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://checkinn.co/api/v1/int/requests')
      .then(response => {
        const jsonData = response.data;
        const hotelRequests = {};
        jsonData.requests.forEach(request => {
          const hotelName = request.hotel.shortname;
          if (hotelRequests[hotelName]) {
            hotelRequests[hotelName]++;
          } else {
            hotelRequests[hotelName] = 1;
          }
        });
        // console.log(hotelRequests);
        

        setData(hotelRequests);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  return (
    <div className="w-full mx-auto">
     <ApexChart data={data}/>
    </div>
  );
};

export default RequestGraph;
