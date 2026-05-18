import { useState } from 'react';

import calendarIcon from '@/assets/icons/guidance_calendar.svg';
import searchIcon from '@/assets/icons/iconamoon_search.svg';
import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';

import * as S from './Conduct.style';
import { conductRows } from './data';

const genderFilters = ['전체', '남', '여'];
const gradeFilters = ['전체', '1학년', '2학년', '3학년'];
const classFilters = ['전체', '1반', '2반', '3반'];

export function ConductPage() {
  const [selectedGender, setSelectedGender] = useState('전체');
  const [selectedGrade, setSelectedGrade] = useState('전체');
  const [selectedClass, setSelectedClass] = useState('전체');
  const [selectedStudentNumber, setSelectedStudentNumber] = useState<number | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const selectedStudent = conductRows.find((row) => row.studentNumber === selectedStudentNumber);

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
              <S.SearchInput placeholder="이름으로 검색..." />
            </S.SearchBox>
          </S.ControlLeft>
          <S.ControlRight>
            <S.SortBox>
              <S.SortSelect id="conduct-sort" defaultValue="latest">
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
                <S.TableRow
                  key={`${row.roomNumber}-${row.studentNumber}`}
                  $isSelected={selectedStudentNumber === row.studentNumber}
                >
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
                    <S.ActionButton
                      type="button"
                      $isSelected={selectedStudentNumber === row.studentNumber}
                      onClick={() => setSelectedStudentNumber(row.studentNumber)}
                    >
                      보기
                    </S.ActionButton>
                  </td>
                </S.TableRow>
              ))}
            </tbody>
          </S.Table>
        </S.TableWrap>
      </S.Page>

      {selectedStudent && (
        <S.ModalOverlay role="presentation" onClick={() => setSelectedStudentNumber(null)}>
          <S.Modal role="dialog" aria-modal="true" aria-labelledby="conduct-detail-title" onClick={(event) => event.stopPropagation()}>
            <S.ModalHeader>
              <S.ModalTitle id="conduct-detail-title">{selectedStudent.name} 상벌점 정보</S.ModalTitle>
              <S.ModalCloseButton type="button" onClick={() => setSelectedStudentNumber(null)}>
                닫기
              </S.ModalCloseButton>
            </S.ModalHeader>
            <S.DetailGrid>
              <S.DetailItem>
                <S.DetailLabel>방 번호</S.DetailLabel>
                <S.DetailValue>{selectedStudent.roomNumber}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailLabel>성별</S.DetailLabel>
                <S.DetailValue>{selectedStudent.gender}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailLabel>학번</S.DetailLabel>
                <S.DetailValue>{selectedStudent.studentNumber}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailLabel>상점</S.DetailLabel>
                <S.DetailValue>{selectedStudent.rewardPoint}점</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailLabel>벌점</S.DetailLabel>
                <S.DetailValue>{selectedStudent.penaltyPoint}점</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailLabel>합계</S.DetailLabel>
                <S.DetailValue>
                  <S.Point $value={selectedStudent.totalPoint}>{selectedStudent.totalPoint}점</S.Point>
                </S.DetailValue>
              </S.DetailItem>
            </S.DetailGrid>
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
