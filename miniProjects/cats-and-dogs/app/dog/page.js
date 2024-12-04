// app/dog/page.js
import Link from "next/link";
import "../globals.css";

export default async function DogPage() {
  try {
    const res = await fetch("http://localhost:3000/api/dog");

    const data = await res.json();

    return (
      <div className="container">
        <h1>강아지</h1>

        <div className="api">
          <h2>API 데이터:</h2>
          <img src={data.image} alt="강아지 이미지" />
          <p>{data.message}</p>
        </div>
        <Link className="home" href="/">
          ← 홈으로 돌아가기
        </Link>
      </div>
    );
  } catch (error) {
    console.error("데이터를 가져오는 중 오류 발생:", error);
  }
}
