 # <img src="https://capsule-render.vercel.app/api?type=transparent&fontColor=1491BD&height=100&section=header&text=ORDhelper&fontSize=80"/>
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)



> 본 사이트는 [시온스 조합도우미](http://sions.kr/bbs/board.php?bo_table=mk_helper)를 참고로 하여 만든 원피스 랜덤 디펜스 조합 도우미이며 SPA(single page application)입니다
> 
> 원피스 랜덤 디펜스에 관한 설명은 따로 하지않습니다.

* 장점
    * 다크모드 지원
    * 1080p 스크롤 최적화
    * 1440p 지원
    * 툴팁 세분화
    * 인게임 수치 계산
    * 등급별 초기화 가능
* 단점
    * 시온스에 비해 무거움
    * 조합시 나머지 퍼센트 보기 기능 미지원(시온스 유닛 개수Input 우클릭 기능)
    * 강화, 특강시 변동 수치 미구현


## 사용방법
[kaizoku.kr](https://kaizoku.kr/)

![다크모드지원](https://user-images.githubusercontent.com/109454882/202701126-e1a3f15e-ebd6-4937-91e3-763761d91cf8.gif)

컴퓨터,브라우저 설정에 맞춰서 라이트모드 다크모드 지원



![마우스호버시](https://user-images.githubusercontent.com/109454882/202702160-771b5ba2-3041-4fbb-8c6f-12376f9a7159.gif)

유닛에 마우스 호버시 필요 재료, 조건 툴팁 표시
유닛 썸네일에 마우스 호버시 흔함재료 몇개 필요한지 툴팁 표시



![개수줄어듦](https://user-images.githubusercontent.com/109454882/202702379-110bc618-a503-4f87-9337-4c87637dd368.gif)

보유 갯수만큼 흔함재료 줄어서 표시



![기본조작](https://user-images.githubusercontent.com/109454882/202701563-411d7b24-383b-4494-beae-392248daae2d.gif)

유닛 좌클릭시 개수 1 증가
100퍼센트 달성시 유닛 우클릭으로 조합 (하위 유닛 삭제)


![물마딜툴팁](https://user-images.githubusercontent.com/109454882/202703482-cc4f485a-6bd3-4666-a6ba-344b1826bfc5.gif)

물마딜 구분 표시



![사이드버튼1](https://user-images.githubusercontent.com/109454882/202702544-92dd610b-512d-44bf-9380-ea1689435842.gif)

유닛 스펙 툴팁 세분화


<img width="2560" alt="툴팁전체" src="https://user-images.githubusercontent.com/109454882/202702994-642cd23f-0e86-4379-8824-b9410a257adc.png">

스펙 툴팁 전체 사진



![사이드버튼2](https://user-images.githubusercontent.com/109454882/202703106-6fae5627-9010-4745-ba2c-f32b9832d3dc.gif)

기타 사이드버튼 

<img width="2560" alt="기타툴팁전체" src="https://user-images.githubusercontent.com/109454882/202703213-5199930f-e70a-4591-90f4-aca2c3466ae2.png">

기타 툴팁 전체 사진



![수치반영 스턴단일여러개](https://user-images.githubusercontent.com/109454882/202703596-8b59854b-98de-4780-84af-6754895e4c7c.gif)

스펙별 수치 반영
이감,깍은 중복 X
스턴, 단일은 중복 O



![초기화기능](https://user-images.githubusercontent.com/109454882/202703767-130a725e-ab36-43fc-9467-fc2470c0c71e.gif)

버튼 클릭시 등급별 초기화 가능



<img width="306" alt="고대의배" src="https://user-images.githubusercontent.com/109454882/202703927-e6ddbad9-069b-4185-8300-50404f552232.png">
<img width="353" alt="레일리" src="https://user-images.githubusercontent.com/109454882/202703932-87c77a97-35e5-4e32-a40a-2e15b1e7d530.png">
<img width="556" alt="압살롬" src="https://user-images.githubusercontent.com/109454882/202703935-8126d414-2046-4420-9865-63cddbe4d676.png">

목재, 레일리, 압살롬 등 기타는 따로 표기되니 유닛리스트에 없더라도 주의 바랍니다

<img width="2560" alt="1440캡쳐" src="https://user-images.githubusercontent.com/109454882/202704614-7dc6e492-8120-46fb-a5ce-e7a19878caa1.png">

1440p 해상도 맥북에서 캡쳐한 사진


<img width="959" alt="제목 없음" src="https://user-images.githubusercontent.com/109454882/202709597-150ff1b3-576c-4a50-a546-834be7f59822.png">

1080p 해상도 윈도우pc에서 캡쳐한 사진

## 개발회고

seo때문에 nextjs를 사용했고 개발자도구로 봤을때 head태그 메타태그도 잘 생겨있는데 aws s3로 배포를 해서 구글에 검색해도 서치에 걸리지 않는다
이래서는 react에 react-helmet 만 써도 충분했을 수준이라 nextjs 타이틀이 괜히 허울같이 느껴진다

그래서 nextjs 타이틀 구실을 해보자 [mockAPI](https://mockapi.io/) 같은 서비스로 만들어놓은 유닛 리스트(unit.js)를 JSON으로 받아 getStaticProps로 패치해서 revalidate 옵션을 줘 isr 로 시도해볼까 생각도 해봤지만.. 생각까지만 해보았다..

route 53으로 도메인 등록하고 acm에 cname 레코드 생성을 안눌러서 acm 인증서 발급이 계속 검토대기중 상태여서 3일을 날려먹고 블로그 다시보니 레코드 생성하기를 눌러줘야 하는거였다..
한 10분도 안걸려서 acm 인증서 발급완료.. 방법은 이해하기 어렵지만 어떻게 https도 인증받았다

겨우 spa을 만드는데 꽤 많은 시간을 쏟았다 진짜 조금 더 나은 방향으로 수정할 부분이 계속 나왔다 무슨 과제최종본_최종최종_최종진짜최종본 이런느낌 실제 서비스되는 일반 사이트는 얼마나 노력이 들어갈까
또 실감이 났고 같은 클론코딩이지만 뇌빼고 강의보면서 강의 클론코딩 하는거랑 기존사이트에 개선할 방향을 나아두고 하는 클론코딩은 확실히 다르다 생각했다
최종본을 봐도 자잘하게 기능부분이든 UI부분이든 아쉽지만 최선을 다했다 생각한다 졸작느낌도 좋고 오늘 놓는게 맞는거같다.
