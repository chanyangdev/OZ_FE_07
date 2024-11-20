import React from "react";

// Define the types for the props
interface Product {
  id: string;
  name: string;
  price: number;
}

interface Cart {
  id: string;
  products: Product;
  count: number;
}

interface ShoppingCartProps {
  carts: Cart[];
  handleOrder: (product: Product) => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ carts, handleOrder }) => {
  console.log("ShoppingCart 렌더링 : ", carts, handleOrder);

  return (
    <div>
      <h1>장바구니 리스트</h1>
      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>상품명</th>
            <th>가격</th>
            <th>주문 수량</th>
            <th>주문 하기</th>
          </tr>
        </thead>
        <tbody>
          {carts?.map((cart) => (
            <tr key={cart.id}>
              <td>{cart.products.name}</td>
              <td>{cart.products.price}</td>
              <td>{cart.count}</td>
              <td>
                <button onClick={() => handleOrder(cart.products)}>
                  주문하기
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShoppingCart;
