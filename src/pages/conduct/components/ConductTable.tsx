import { type ConductInfo } from '@/features/conduct/api';

import * as S from '../Conduct.style';
import { getGenderLabel, getSkeletonWidth } from '../utils';

interface ConductTableProps {
  errorMessage: string;
  isError: boolean;
  isLoading: boolean;
  rows: ConductInfo[];
  selectedGender: string;
  selectedUserId: number | null;
  onSelectUser: (userId: number) => void;
}

export function ConductTable({
  errorMessage,
  isError,
  isLoading,
  rows,
  selectedGender,
  selectedUserId,
  onSelectUser,
}: ConductTableProps) {
  if (isError) {
    return <S.StateMessage>{errorMessage}</S.StateMessage>;
  }

  return (
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
          {isLoading
            ? Array.from({ length: 6 }, (_, rowIndex) => (
                <S.TableRow key={`conduct-skeleton-${rowIndex}`}>
                  {Array.from({ length: 8 }, (_, cellIndex) => (
                    <td key={`conduct-skeleton-${rowIndex}-${cellIndex}`}>
                      <S.SkeletonBar $width={getSkeletonWidth(cellIndex)} />
                    </td>
                  ))}
                </S.TableRow>
              ))
            : rows.map((row) => (
                <S.TableRow
                  key={`${row.roomNumber}-${row.userId}`}
                  $isSelected={selectedUserId === row.userId}
                >
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
                      onClick={() => onSelectUser(row.userId)}
                    >
                      보기
                    </S.ActionButton>
                  </td>
                </S.TableRow>
              ))}
        </tbody>
      </S.Table>
      {!isLoading && rows.length === 0 && (
        <S.EmptyTableText>조회된 상벌점 정보가 없습니다.</S.EmptyTableText>
      )}
    </S.TableWrap>
  );
}
