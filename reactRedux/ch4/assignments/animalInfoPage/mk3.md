# 동물 이름으로 검색기능 만들기 & 검색 결과 페이지 생성하기

## 1. 검색 및 결과를 보여주는 Search component생성

```js
export default function Search() {
  // inputValue: 입력 필드의 현재 값을 저장하는 상태 변수
  const [inputValue, setInputValue] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSearch}>
        <input
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          placeholder="동물 이름 검색"
        />
        <button type="submit">검색</button>
      </Form>
    </Wrapper>
  );
}
```

사용자가 입력한 값을 `onChange`이벤트를 통해 상태 `inputValue`를 관리.

- 검색 버튼을 누르면 새로고침을 발생 시키지 않는 `handleSearch` event handler를 생성하여 `Form`컴포넌트에 등록

## 2. `useSearchParams`로 검색 결과를 URL에 동적으로 업데이트 하기

```js
export default function Search() {
  const [inputValue, setInputValue] = useState("");
  // searchParams : 현재 URL의 쿼리 파라미터를 읽기 위한 객체
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setSearchParams({ name: inputValue });
    } else {
      setSearchParams({});
    }
    setInputValue("");
  };

  return <Wrapper>...</Wrapper>;
}
```

`useSearchParams`는 `handleSearch` function 에서 사용자가 입력한 검색어를 URL query parameter로 설정

- 검색 결과를 반영할 수 있도록 URL을 동적으로 update하는 기능을 한다.
- 여기서는 `name`이 query parameter의 key, `inputValue`는 값이 되어 URL에 반영된다

## 3. 검색어로 데이터를 filtering 하기

```js
export default function Search() {
  const [inputValue, setInputValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  // filteredData: 검색된 데이터를 저장하는 상태 변수(초기엔 전체 데이터)
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    const query = searchParams.get("name");
    if (query) {
      const filtered = data.filter((animal) => animal.name.includes(query));
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setSearchParams({ name: inputValue });
    } else {
      setSearchParams({});
    }
    setInputValue("");
  };

  return <Wrapper>...</Wrapper>;
}
```

`useEffect`를 사용함으로써 1. 처음 컴포넌트가 렌더링될 떄 2. URL의 `searchParams`가 변결될떄 마다 검색어를 가져와서 데이터를 filtering할 수 있게 하였다.

- `searchParams.get("name")`을 통해 query parameter에서 `name`값을 추출하고, 그 값이 있을 경우 동물 데이터를 필터링해서 `filteredData`에 저장하였다

## 4. 검색 결과를 화면에 표시

```js
export default function Search() {
...

  return (
    <Wrapper>
      <Form onSubmit={handleSearch}>
        <input
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          placeholder="동물 이름 검색"
        />
        <button type="submit">검색</button>
      </Form>
      <Results>
        {filteredData.length > 0 ? (
          filteredData.map((el) => {
            const { id, name, img, description } = el;
            return (
              <Link to={`/detail/${id}`} key={id}>
                <Card name={name} img={img} description={description} />
              </Link>
            );
          })
        ) : (
          <Message>데이터가 없습니다!😔</Message>
        )}
      </Results>
    </Wrapper>
  );
}
```

- 사용자가 검색을 완료하면, 해당 검색어에 맞게 filtering된 데이터 (filteredData)를 `map`고차함수를 이용하여 화면에 출력하였다.
- 초기 Search화면에는 모든 데이터를 렌더링 하지만, after you search, `filteredData.length > 0`조건을 사용해 filtering 된 데이터가 없을 경우에는 "데이터가 없습니다"라는 메세지가 출력되도록 설정.
- 검색 시, 같은 형식의 동물 카드가 렌더링 될 수 있도록 Card component를 별도로 추출하여 Main페이지와 Search페이지에서 재사용

> 어떻게 새로고침을 해도 검색 결과가 유지 될 수 있을까요?
> React Router does not have a '캐싱' 기능.

- URL query parameter는 **브라우저에 의해 관리되는 상태**.
- 쿼리 파라미터는 URL에 포함되므로, 페이지를 새로고침 하거나, 다른 페이지로 이동했다가 돌아와도 URL에 query parameter가 그대로 남아 있기 떄문.

## 5. useNavigate를 이용하여 홈 화면/ 이전 화면으로 돌아가기

Search page에서 검색한 동물의 카드를 클릭하면 Detail페이지로 이동할 수 있도록 컴포넌트를 서로 연결 하였다.

- Detail page에서 정보 확인후, 다시 Search 컴포넌트를 새로 접근하는 것이 아니라, "뒤로 가기" 기능을 구현하기 위해 `useNavigate`을 사용 하였다.

```js
export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const animal = data.filter((el) => el.id === Number(id));
  const [{ name, img, description }] = animal;

  const goBack = () => {
    navigate(-1); // -1은 한 단계 이전 페이지로 이동함을 의미
  };

  return (
    <Wrapper>
      <div>
        <img src={img} alt={name} />
        <p>이름 : {name}</p>
        <p>설명 : {description}</p>
      </div>
      <BackButton onClick={goBack}>이전 화면으로</BackButton>
    </Wrapper>
  );
}
```

> `Link` component and `useNavigate`
> Link 컴포넌트는 **명시적**으로 페이지를 이동할 때 사용하기 적합한 `선언적`인 컴포넌트다.

- 예제 코드에서는 모든 페이지에서 렌더링되는 `Header`컴포넌트에 'home'버튼과 'search'버튼을 `Link`컴포넌트로 구현하였다.
- `useNavigate`는 명령적으로 페이지를 이동해야 할 떄 유용하다
- 페이지를 이동하기 전에 특정 작업을 수행해야 하거니, 조건에 따라 페이지 이동을 결정 해야 할 떄 사용
- 예제 코드에서는 브라우저의 '뒤로 가기' 동작을 구현하기 위해서 Detail page하단에 '이전 화면으로' 버튼을 `useNavigate`로 구현 하였다.
