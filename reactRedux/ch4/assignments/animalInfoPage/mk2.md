# 동물 상세 정보 페이지 만들기

## 특정 id 값에 대한 데이터를 받아오는 방법

**URL parameter**란 주소의 경로에 유동적인 값을 넣는 형태로 id or name을 사용하여 특정 데이터를 조회할 떄 사용. `useParams`는 URL query parameter의 키-값 pair을 담고 있는 객체를 반환하기 떄문에 동물 `id` 값에 따라 동적으로 변경되는 parameter (`params`)에 접글 할 수 있다.

동물 상세 정보 페이지 구현 하는 detail component에서 `useParams`를 사용하여 페이지에 해당하는 동물의 `id`값을 가져왔다.
`filter`고차함수를 이용하여 해당 `id`값과 일치하는 동물의 데이터 정보만 가져와서 렌더링 할 수 있다.

```js
export default function Detail() {
  const { id } = useParams();

  const animal = data.filter((el) => el.id === Number(id));
  const [{ name, img, description }] = animal;

  return (
    <Wrapper>
      <img src={img} alt={name} />
      <p>이름 : {name}</p>
      <p>설명 : {description}</p>
    </Wrapper>
  );
}
```
