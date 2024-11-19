import React, { useEffect, useState } from "react";
import OrderHistory from "./OrderHistory";

// Product Interface
interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

// Order Interface
interface Order {
  id: number;
  products: Product;
  quantity: number;
  address: string;
  shippingType: number;
}

// Shipping Cart Interface
interface ShippingCart {
  id: number;
  count: number;
  products: Product;
}

// Initial Product Data
const productInitData: Product[] = [
  { id: 1, name: "발난로", price: 10_000, quantity: 10 },
  { id: 2, name: "손난로", price: 30_000, quantity: 30 },
  { id: 3, name: "옛날식 석유 난로", price: 400_000, quantity: 10 },
  { id: 4, name: "전기 난로", price: 1_000_000, quantity: 10 },
];

const Order: React.FC = () => {
  console.log("Order 렌더링");

  // State
  const [products, setProducts] = useState<Product[]>(productInitData);
  const [orders, setOrders] = useState<Order[]>([]);
  const [shippingCarts, setShippingCarts] = useState<ShippingCart[]>([]);

  // Decrement Quantity
  const decrementQuantity = (product: Product): void => {
    setProducts(
      products.map((p) =>
        p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p
      )
    );
  };

  // Handle Order
  const handleOrder = (product: Product): void => {
    if (product.quantity < 1) {
      alert("재고가 부족합니다.");
      return;
    }

    console.log("재고 관리 전 product =", product);
    decrementQuantity(product);
    console.log("재고 관리 후 product =", product);

    setOrders([
      ...orders,
      {
        id: Math.random(),
        products: product,
        quantity: 1,
        address: "서울",
        shippingType: 0,
      },
    ]);
  };

  // Handle Add to Shipping Cart
  const handleShippingCart = (product: Product): void => {
    setShippingCarts([
      ...shippingCarts,
      {
        id: Math.random(),
        count: 1,
        products: product,
      },
    ]);
  };

  // Effect to monitor products
  useEffect(() => {
    console.log("useEffect products : ", products);
  }, [products]);

  return (
    <div>
      <h1>상품 리스트</h1>
      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>상품명</th>
            <th>가격</th>
            <th>재고량</th>
            <th>주문</th>
            <th>기능</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price.toLocaleString()}원</td>
              <td>{product.quantity}</td>
              <td>
                <button onClick={() => handleOrder(product)}>주문하기</button>
              </td>
              <td>
                <button onClick={() => handleShippingCart(product)}>
                  장바구니담기
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <br />
      <br />
      <OrderHistory orders={orders} setOrders={setOrders} />
    </div>
  );
};

export default Order;
