//layout.js

import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav>
          <ul>
            <li>
              <Link href="/">홈</Link>
            </li>
            <li>
              <Link href="/dog">강아지</Link>
            </li>
            <li>
              <Link href="/cat">고양이</Link>
            </li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}
