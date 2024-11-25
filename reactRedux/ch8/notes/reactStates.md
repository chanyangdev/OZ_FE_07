# React 상태관리

## React의 상태를 관리하는 방법

### 내부

- `useState`
- Context API

### 외부

- Redux, Redux Toolkit
- Recoil, MobX, Zustand, Jotai

## Props Drilling

useState만 사용했을떄
![useState](./images/Screenshot%202024-11-25%20at%2010.22.21 AM.png)

Props Drilling 자체는
React로 개발하다 보면 발생하는 _자연스러운 현상_

상태를 *체계적으로 설계*해서 사용하면 useState만으로도 규모있는 애플리케이션을 만들 수 있음

하지만 설계를 아무리 잘 했더라도 **너무 과하게** 발생하면, 코드가 *지저분*해지고 _관리하기_ 어려워짐.

## 전역 상태 관리의 필요성

*여러 컴포넌트*에서 *상태를 사용*해야 할 떄 === *전역 상태 관리*가 필요할 떄 사용할 수 있는 **도구**가 필요해짐

대표적인 도구

- Context API
- Redux, Redux Toolkit

![전역상태 관리](./images/Screenshot%202024-11-25%20at%2010.55.55 AM.png)
