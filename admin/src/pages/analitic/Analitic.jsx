import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar,  XAxis, YAxis, Tooltip} from 'recharts';

import { useSelector } from "react-redux";
import "./analitic.css";
import { PieChart, Pie,  Cell, Legend  } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
  
 

const Analytics=()=> {
  const [products,setProducts]= useState([]);
  const [orders,setOrders]= useState([]);
  const [wo,wsetOrders]= useState([]);
  const [me,msetOrders]= useState([]);
  const [ki,ksetOrders]= useState([]);
  const user= useSelector((state)=>state.user.currentUser)
  const produ = products.filter(p=>p.adminid===user._id);
  const orde = orders.filter(p=>p.adminid===user._id);
  const wom = wo.filter(p=>p.adminid===user._id);
  const men = me.filter(p=>p.adminid===user._id);
  const kid= ki.filter(p=>p.adminid===user._id);
  
  useEffect(()=>{
      const getProducts= async()=>{
          try{
              const res= await axios.get("http://localhost:5000/api/products");
              setProducts(res.data);
          } catch(err){}
      };
      getProducts();

      const getOrders= async()=>{
        try{
            const res= await axios.get("http://localhost:5000/api/orders");
            setOrders(res.data);
        } catch(err){}
    };
    getOrders();

  });
  const wgetOrders= async()=>{
      
  try{
    const wo= await axios.get( `http://localhost:5000/api/products?category=women`);
    wsetOrders(wo.data);
       
  }
  catch(err){}};
  wgetOrders();
  const mgetOrders= async()=>{
      
  try{
    const me= await axios.get(`http://localhost:5000/api/products?category=men`);
    msetOrders(me.data);
  }
  catch(err){}};
  mgetOrders();
  const kgetOrders= async()=>{
      
  try{
    const ki= await axios.get(`http://localhost:5000/api/products?category=kids`);
    ksetOrders(ki.data);
  }
  catch(err){}};
  kgetOrders();

  const pichar=[
    { name: 'Men', value: men.length },
    { name: 'Women', value: wom.length },
    { name: 'Kids', value: kid.length },
   ]
  return (
    <>
        <div className='char'>
        <h2 style={{color:'white', margin:'10px'}}>Analytics</h2>            
        <div className='procha'>
        <h3 style={{color:"white"}}>Prices Graph</h3>
      <BarChart width={1000} height={240} data={produ}>
        
   <Tooltip />
   {/* <Legend /> */}
       <XAxis dataKey="title" tick={{ fill: 'red' }} />
       <YAxis />
       <Bar dataKey="price" fill="#77dd77" />
      </BarChart>
      </div>
      <div className="tri">
      
      <div className="piec">
        <h3 style={{color:"white"}}>Categories Data </h3>
           <PieChart width={400} height={400 }>
             <Legend />
             <Tooltip />
          <Pie
            data={pichar}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {pichar.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
        </div>
      </div>
      </div>
    </>

    )
  }

export default  Analytics  