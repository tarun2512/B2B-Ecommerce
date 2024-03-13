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
  
 

const Sales=()=> {
  const [products,setProducts]= useState([]);
  const [orders,setOrders]= useState([]);
  const [wo,wsetOrders]= useState([]);
  const [me,msetOrders]= useState([]);
  const [ki,ksetOrders]= useState([]);
  const user= useSelector((state)=>state.user.currentUser);
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
        <h2 style={{color:'white', margin:'10px'}}>Sales</h2>            
        <div className='procha'>
      <BarChart width={1000} height={450} data={orde}>
        
   <Tooltip />
   {/* <Legend /> */}
       <XAxis dataKey="pname" tick={{ fill: 'red' }} />
       <YAxis />
       <Bar dataKey="quantity" fill="#00FFFF" />
      </BarChart>
      </div>
      
      </div>
    </>

    )
  }

export default  Sales  