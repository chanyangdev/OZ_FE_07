// app/cat/page.js
import Link from "next/link";
import "../globals.css";

export default async function CatPage() {
  try {
    // 서버 측에서 API 호출
    const res = await fetch("http://localhost:3000/api/cat"); // 고양이 데이터 요청

    const data = await res.json();

    console.log("API 데이터:", data);

    return (
      <div className="container">
        <h1>고양이</h1>

        <div className="api">
          <h2>API 데이터:</h2>
          <img src={data.image} alt="고양이 이미지" />
          <p>{data.message}</p>
        </div>
        <Link className="home" href="/">
          ← 홈으로 돌아가기
        </Link>
      </div>
    );
  } catch (error) {
    console.error("데이터를 가져오는 중 오류 발생:", error);
    return <div>오류가 발생했습니다.</div>;
  }
}
