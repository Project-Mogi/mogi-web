import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import calendarIcon from '@/assets/icons/guidance_calendar.svg';
import searchIcon from '@/assets/icons/iconamoon_search.svg';
import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { getConductDetail, getConductInfos, type ConductGender, type ConductInfo } from '@/features/conduct/api';
import { getApiErrorMessage } from '@/shared/api/types';

import * as S from './Conduct.style';

const genderFilters = ['전체', '남', '여'];
const gradeFilters = ['전체', '1학년', '2학년', '3학년'];
const classFilters = ['전체', '1반', '2반', '3반'];

type SortOption = 'latest' | 'reward' | 'penalty' | 'total';

export function ConductPage() {
  const [selectedGender, setSelectedGender] = useState('전체');
  const [selectedGrade, setSelectedGrade] = useState('전체');
  const [selectedClass, setSelectedClass] = useState('전체');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('latest');

  const conductFilters = useMemo(
    () => ({
      gender: getGenderValue(selectedGender),
      grade: getNumberFromFilter(selectedGrade),
      classNumber: getNumberFromFilter(selectedClass),
    }),
    [selectedClass, selectedGender, selectedGrade],
  );

  const {
    data: conductInfos = [],
    isError: isConductError,
    isLoading: isConductLoading,
    error: conductError,
  } = useQuery({
    queryKey: ['conduct', 'list', conductFilters],
    queryFn: () => getConductInfos(conductFilters),
  });

  const selectedStudent = conductInfos.find((row) => row.userId === selectedUserId);

  const {
    data: selectedStudentDetail,
    isError: isDetailError,
    isLoading: isDetailLoading,
    error: detailError,
  } = useQuery({
    queryKey: ['conduct', 'detail', selectedUserId],
    queryFn: () => getConductDetail(Number(selectedUserId)),
    enabled: Boolean(selectedUserId),
  });

  const tableRows = useMemo(
    () => sortConductRows(filterConductRows(conductInfos, searchKeyword), sortOption),
    [conductInfos, searchKeyword, sortOption],
  );

  return (
    <>
      <Header variant="app" />
      <Sidebar />
      <S.Page>
        <S.ControlBar>
          <S.ControlLeft>
            <S.DateButton type="button">
              <span>2026. 05. 18.</span>
              <S.CalendarIcon src={calendarIcon} alt="" />
            </S.DateButton>
            <S.SearchBox>
              <S.SearchIcon src={searchIcon} alt="" />
              <S.SearchInput
                value={searchKeyword}
                placeholder="이름으로 검색..."
                onChange={(event) => setSearchKeyword(event.target.value)}
              />
            </S.SearchBox>
          </S.ControlLeft>
          <S.ControlRight>
            <S.SortBox>
              <S.SortSelect
                id="conduct-sort"
                value={sortOption}
                onChange={(event) => setSortOption(event.target.value as SortOption)}
              >
                <option value="latest">최신순</option>
                <option value="reward">상점순</option>
                <option value="penalty">벌점순</option>
                <option value="total">합계순</option>
              </S.SortSelect>
            </S.SortBox>
          </S.ControlRight>
        </S.ControlBar>

        <S.FilterPanel>
          <S.FilterList>
            <S.FilterGroup>
              <S.FilterLabel>성별 : </S.FilterLabel>
              {genderFilters.map((filter) => (
                <S.FilterButton
                  key={filter}
                  type="button"
                  $isSelected={selectedGender === filter}
                  onClick={() => setSelectedGender(filter)}
                >
                  {filter}
                </S.FilterButton>
              ))}
            </S.FilterGroup>
            <S.FilterGroup>
              <S.FilterLabel>학년 : </S.FilterLabel>
              {gradeFilters.map((filter) => (
                <S.FilterButton
                  key={filter}
                  type="button"
                  $isSelected={selectedGrade === filter}
                  onClick={() => setSelectedGrade(filter)}
                >
                  {filter}
                </S.FilterButton>
              ))}
            </S.FilterGroup>
            <S.FilterGroup>
              <S.FilterLabel>반 : </S.FilterLabel>
              {classFilters.map((filter) => (
                <S.FilterButton
                  key={filter}
                  type="button"
                  $isSelected={selectedClass === filter}
                  onClick={() => setSelectedClass(filter)}
                >
                  {filter}
                </S.FilterButton>
              ))}
            </S.FilterGroup>
          </S.FilterList>
          <S.CreateButton type="button" onClick={() => setIsCreateModalOpen(true)}>
            상벌점 부여
          </S.CreateButton>
        </S.FilterPanel>

        {isConductError && (
          <S.StateMessage>{getApiErrorMessage(conductError, '상벌점 정보를 불러오지 못했습니다')}</S.StateMessage>
        )}
        {!isConductError && (
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
                {isConductLoading
                  ? Array.from({ length: 6 }, (_, rowIndex) => (
                      <S.TableRow key={`conduct-skeleton-${rowIndex}`}>
                        {Array.from({ length: 8 }, (_, cellIndex) => (
                          <td key={`conduct-skeleton-${rowIndex}-${cellIndex}`}>
                            <S.SkeletonBar $width={getSkeletonWidth(cellIndex)} />
                          </td>
                        ))}
                      </S.TableRow>
                    ))
                  : tableRows.map((row) => (
                      <S.TableRow key={`${row.roomNumber}-${row.userId}`} $isSelected={selectedUserId === row.userId}>
                        <td>{row.roomNumber}</td>
                        <td>{row.userName}</td>
                        <td>{getGenderLabel(row.gender, selectedGender)}</td>
                        <td>{row.studentNumber}</td>
                        <td>{row.totalRewardPoint}</td>
                        <td>{row.totalPenaltyPoint}</td>
                        <td>
                          <S.Point $value={row.totalPoint}>{row.totalPoint}</S.Point>
                        </td>
                        <td>
                          <S.ActionButton
                            type="button"
                            $isSelected={selectedUserId === row.userId}
                            onClick={() => setSelectedUserId(row.userId)}
                          >
                            보기
                          </S.ActionButton>
                        </td>
                      </S.TableRow>
                    ))}
              </tbody>
            </S.Table>
            {!isConductLoading && tableRows.length === 0 && (
              <S.EmptyTableText>조회된 상벌점 정보가 없습니다.</S.EmptyTableText>
            )}
          </S.TableWrap>
        )}
      </S.Page>

      {selectedStudent && (
        <S.ModalOverlay role="presentation" onClick={() => setSelectedUserId(null)}>
          <S.Modal role="dialog" aria-modal="true" aria-labelledby="conduct-detail-title" onClick={(event) => event.stopPropagation()}>
            <S.ModalHeader>
              <S.ModalTitle id="conduct-detail-title">{selectedStudent.userName} 상벌점 정보</S.ModalTitle>
              <S.ModalCloseButton type="button" onClick={() => setSelectedUserId(null)}>
                닫기
              </S.ModalCloseButton>
            </S.ModalHeader>
            <S.DetailGrid>
              <S.DetailItem>
                <S.DetailLabel>방 번호</S.DetailLabel>
                <S.DetailValue>{selectedStudentDetail?.roomNumber ?? selectedStudent.roomNumber}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailLabel>성별</S.DetailLabel>
                <S.DetailValue>{getGenderLabel(selectedStudent.gender, selectedGender)}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailLabel>학번</S.DetailLabel>
                <S.DetailValue>{selectedStudentDetail?.studentNumber ?? selectedStudent.studentNumber}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailLabel>상점</S.DetailLabel>
                <S.DetailValue>{selectedStudentDetail?.totalRewardPoint ?? selectedStudent.totalRewardPoint}점</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailLabel>벌점</S.DetailLabel>
                <S.DetailValue>{selectedStudentDetail?.totalPenaltyPoint ?? selectedStudent.totalPenaltyPoint}점</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailLabel>합계</S.DetailLabel>
                <S.DetailValue>
                  <S.Point $value={selectedStudentDetail?.totalPoint ?? selectedStudent.totalPoint}>
                    {selectedStudentDetail?.totalPoint ?? selectedStudent.totalPoint}점
                  </S.Point>
                </S.DetailValue>
              </S.DetailItem>
            </S.DetailGrid>
            {isDetailLoading && (
              <S.ModalSkeletonList>
                <S.SkeletonBar $width="72%" />
                <S.SkeletonBar $width="56%" />
                <S.SkeletonBar $width="64%" />
              </S.ModalSkeletonList>
            )}
            {isDetailError && (
              <S.ModalStateText>
                {getApiErrorMessage(detailError, '상세 상벌점 정보를 불러오지 못했습니다.')}
              </S.ModalStateText>
            )}
            {selectedStudentDetail && (
              <S.HistoryList>
                {selectedStudentDetail.conductDetailedInfo.length === 0 ? (
                  <S.EmptyText>상벌점 이력이 없습니다.</S.EmptyText>
                ) : (
                  selectedStudentDetail.conductDetailedInfo.map((history, index) => (
                    <S.HistoryItem key={`${history.conductCategory}-${history.givenScore}-${index}`}>
                      <span>{history.conductCategory === 'REWARD' ? '상점' : '벌점'}</span>
                      <strong>{history.givenScore}점</strong>
                    </S.HistoryItem>
                  ))
                )}
              </S.HistoryList>
            )}
          </S.Modal>
        </S.ModalOverlay>
      )}

      {isCreateModalOpen && (
        <S.ModalOverlay role="presentation" onClick={() => setIsCreateModalOpen(false)}>
          <S.Modal role="dialog" aria-modal="true" aria-labelledby="conduct-create-title" onClick={(event) => event.stopPropagation()}>
            <S.ModalHeader>
              <S.ModalTitle id="conduct-create-title">상벌점 부여</S.ModalTitle>
              <S.ModalCloseButton type="button" onClick={() => setIsCreateModalOpen(false)}>
                닫기
              </S.ModalCloseButton>
            </S.ModalHeader>
            <S.EmptyText>상벌점 부여 입력 폼은 다음 단계에서 연결합니다.</S.EmptyText>
          </S.Modal>
        </S.ModalOverlay>
      )}
    </>
  );
}

function getGenderValue(filter: string): ConductGender | undefined {
  if (filter === '남') {
    return 'BOY';
  }

  if (filter === '여') {
    return 'GIRL';
  }

  return undefined;
}

function getGenderLabel(gender: ConductGender | undefined, selectedGender: string) {
  if (gender === 'BOY') {
    return '남';
  }

  if (gender === 'GIRL') {
    return '여';
  }

  return selectedGender === '전체' ? '-' : selectedGender;
}

function getNumberFromFilter(filter: string) {
  if (filter === '전체') {
    return undefined;
  }

  const numberValue = Number(filter.replace(/[^0-9]/g, ''));

  return numberValue || undefined;
}

function filterConductRows(rows: ConductInfo[], searchKeyword: string) {
  const keyword = searchKeyword.trim();

  if (!keyword) {
    return rows;
  }

  return rows.filter((row) => row.userName.includes(keyword));
}

function sortConductRows(rows: ConductInfo[], sortOption: SortOption) {
  const sortedRows = [...rows];

  switch (sortOption) {
    case 'reward':
      return sortedRows.sort((prev, next) => next.totalRewardPoint - prev.totalRewardPoint);
    case 'penalty':
      return sortedRows.sort((prev, next) => next.totalPenaltyPoint - prev.totalPenaltyPoint);
    case 'total':
      return sortedRows.sort((prev, next) => next.totalPoint - prev.totalPoint);
    case 'latest':
    default:
      return sortedRows.sort((prev, next) => next.userId - prev.userId);
  }
}

function getSkeletonWidth(cellIndex: number) {
  const widths = ['48px', '72px', '40px', '68px', '44px', '44px', '44px', '52px'];

  return widths[cellIndex] ?? '60px';
}
