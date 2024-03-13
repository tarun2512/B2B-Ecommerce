import "./orderList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts, getOrders } from "../../redux/apiCalls";

export default function OrderList() {
  const user= useSelector((state)=>state.user.currentUser)
  const dispatch = useDispatch();
  const ord = useSelector((state) => state.order.orders);
  const orders = ord.filter(o=>o.adminid===user._id)

  useEffect(() => {
    getOrders(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteProduct(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "Order ID", width: 220 },
    {
      field: "order",
      headerName: "Product ID",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            
          {/* <img className="productListImg" src={params.row.img} alt="" /> */}
            {params.row.productId}
          </div>
        );
      },
    },
    // {
    //   field: "order",
    //   headerName: "View Product",
    //   width: 150,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <Link to={"/order/" + params.row.productId}>
    //           <button className="productListEdit">view</button>
    //         </Link>
    //       </>
    //     );
    //   },
    // },
    { field: "quantity", headerName: "Quantity", width: 200 },
    // {
    //   field: "price",
    //   headerName: "Price",
    //   width: 160,
    // },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/order/" + params.row._id}>
              <button className="productListEdit">view/ edit</button>
            </Link>
            {/* <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            /> */}
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={orders}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
 