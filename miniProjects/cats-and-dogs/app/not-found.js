//not-found.js
import Link from "next/link";
import "./globals.css"; // 전역 스타일을 적용

export default function NotFoundPage() {
  return (
    <div className="container">
      <h2>404 - 페이지를 찾을 수 없습니다</h2>
      <p>죄송합니다, 요청하신 페이지는 존재하지 않습니다.</p>
      <Link className="home" href="/">
        ← 홈으로 돌아가기
      </Link>
    </div>
  );
}
