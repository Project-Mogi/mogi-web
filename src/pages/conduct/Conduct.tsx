import * as S from './Conduct.style';

const summaryItems = [
  { label: '전체 학생', value: '158명' },
  { label: '상점 합계', value: '324점' },
  { label: '벌점 합계', value: '128점' },
  { label: '누적 합계', value: '196점' },
];

const conductRows = [
  {
    roomNumber: 301,
    name: '김은서',
    gender: '남',
    studentNumber: 1109,
    rewardPoint: 12,
    penaltyPoint: 4,
    totalPoint: 8,
  },
  {
    roomNumber: 301,
    name: '천해인',
    gender: '남',
    studentNumber: 1117,
    rewardPoint: 8,
    penaltyPoint: 10,
    totalPoint: -2,
  },
  {
    roomNumber: 302,
    name: '김도완',
    gender: '남',
    studentNumber: 1106,
    rewardPoint: 15,
    penaltyPoint: 3,
    totalPoint: 12,
  },
  {
    roomNumber: 303,
    name: '박건률',
    gender: '남',
    studentNumber: 1111,
    rewardPoint: 6,
    penaltyPoint: 7,
    totalPoint: -1,
  },
];

export function ConductPage() {
  return (
    <S.Page>
      <S.Header>
        <S.TitleGroup>
          <S.Title>상벌점 관리</S.Title>
          <S.Description>조회, 상세 확인, 부여, 수정, 취소를 한 화면에서 처리합니다</S.Description>
        </S.TitleGroup>
        <S.PrimaryButton type="button">상벌점 부여</S.PrimaryButton>
      </S.Header>

      <S.SummaryGrid>
        {summaryItems.map((item) => (
          <S.SummaryItem key={item.label}>
            <S.SummaryLabel>{item.label}</S.SummaryLabel>
            <S.SummaryValue>{item.value}</S.SummaryValue>
          </S.SummaryItem>
        ))}
      </S.SummaryGrid>

      <S.Toolbar>
        <S.SearchInput placeholder="이름, 학번, 방 번호로 검색" />
        <S.FilterGroup>
          <S.FilterLabel>조회</S.FilterLabel>
          <S.FilterButton type="button" $isSelected>
            전체
          </S.FilterButton>
          <S.FilterButton type="button">성별</S.FilterButton>
          <S.FilterButton type="button">학년</S.FilterButton>
          <S.FilterButton type="button">학년·반</S.FilterButton>
        </S.FilterGroup>
        <S.FilterGroup>
          <S.FilterLabel>성별</S.FilterLabel>
          <S.FilterButton type="button" $isSelected>
            전체
          </S.FilterButton>
          <S.FilterButton type="button">남</S.FilterButton>
          <S.FilterButton type="button">여</S.FilterButton>
        </S.FilterGroup>
        <S.FilterGroup>
          <S.FilterLabel>학년</S.FilterLabel>
          <S.FilterButton type="button" $isSelected>
            전체
          </S.FilterButton>
          <S.FilterButton type="button">1학년</S.FilterButton>
          <S.FilterButton type="button">2학년</S.FilterButton>
          <S.FilterButton type="button">3학년</S.FilterButton>
        </S.FilterGroup>
        <S.FilterGroup>
          <S.FilterLabel>반</S.FilterLabel>
          <S.FilterButton type="button" $isSelected>
            전체
          </S.FilterButton>
          <S.FilterButton type="button">1반</S.FilterButton>
          <S.FilterButton type="button">2반</S.FilterButton>
          <S.FilterButton type="button">3반</S.FilterButton>
        </S.FilterGroup>
      </S.Toolbar>

      <S.TableWrap>
        <S.Table>
          <thead>
            <tr>
              <th>방 번호</th>
              <th>이름</th>
              <th>성별</th>
              <th>학번</th>
              <th>상점</th>
              <th>벌점</th>
              <th>합계</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {conductRows.map((row) => (
              <tr key={`${row.roomNumber}-${row.studentNumber}`}>
                <td>{row.roomNumber}</td>
                <td>{row.name}</td>
                <td>{row.gender}</td>
                <td>{row.studentNumber}</td>
                <td>{row.rewardPoint}</td>
                <td>{row.penaltyPoint}</td>
                <td>
                  <S.Point $value={row.totalPoint}>{row.totalPoint}</S.Point>
                </td>
                <td>
                  <S.ActionGroup>
                    <S.ActionButton type="button">상세</S.ActionButton>
                    <S.ActionButton type="button">수정</S.ActionButton>
                    <S.ActionButton type="button">취소</S.ActionButton>
                  </S.ActionGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </S.Table>
      </S.TableWrap>
    </S.Page>
  );
}
