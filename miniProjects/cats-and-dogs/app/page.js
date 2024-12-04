//page.js
import Link from "next/link";
import "./globals.css";

export default function HomePage() {
  return (
    <div className="container">
      <h1>골라보세요</h1>
      <div className="choose">
        <div className="dog">
          <Link href="/dog">강아지</Link>
        </div>
        <div className="cat">
          <Link href="/cat">고양이</Link>
        </div>
      </div>
    </div>
  );
}
