import React from "react";

// Define the Product and Order types
type Product = {
  id: number;
  name: string;
  price: number;
};

type Order = {
  id: number;
  products: Product;
  quantity: number;
  address: string;
  shippingType: number; // 0 for "주문 대기", 1 for "배송완료"
};

type OrderHistoryProps = {
  orders: Order[]; // Array of orders
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>; // State updater for orders
};

const OrderHistory: React.FC<OrderHistoryProps> = ({ orders, setOrders }) => {
  console.log("OrderHistory 렌더링 : ", orders);

  // Get the current time
  const currentTime = new Date().toLocaleString();

  // Handle marking an order as shipping completed
  const handleShippingCompleted = (ord: Order): void => {
    setOrders(
      orders.map((order) =>
        order.id === ord.id ? { ...order, shippingType: 1 } : order
      )
    );
  };

  return (
    <div>
      <h1>주문내역 리스트</h1>
      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>주문 id</th>
            <th>상품명</th>
            <th>가격</th>
            <th>주문 수량</th>
            <th>주문일자</th>
            <th>배송 위치</th>
            <th>배송 상태</th>
            <th>배송 완료 처리</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.products.name}</td>
              <td>{order.products.price}</td>
              <td>{order.quantity}</td>
              <td>{currentTime}</td>
              <td>{order.address}</td>
              <td>{order.shippingType === 0 ? "주문 대기" : "배송완료"}</td>
              <td>
                <button onClick={() => handleShippingCompleted(order)}>
                  배송완료
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;
