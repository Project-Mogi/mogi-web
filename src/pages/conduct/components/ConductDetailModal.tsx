import { type ConductDetail, type ConductInfo } from '@/features/conduct/api';

import * as S from '../Conduct.style';
import { getGenderLabel } from '../utils';

interface ConductDetailModalProps {
  detail?: ConductDetail;
  errorMessage: string;
  isError: boolean;
  isLoading: boolean;
  selectedGender: string;
  student: ConductInfo;
  onClose: () => void;
}

export function ConductDetailModal({
  detail,
  errorMessage,
  isError,
  isLoading,
  selectedGender,
  student,
  onClose,
}: ConductDetailModalProps) {
  return (
    <S.ModalOverlay role="presentation" onClick={onClose}>
      <S.Modal
        role="dialog"
        aria-modal="true"
        aria-labelledby="conduct-detail-title"
        onClick={(event) => event.stopPropagation()}
      >
        <S.ModalHeader>
          <S.ModalTitle id="conduct-detail-title">{student.userName} 상벌점 정보</S.ModalTitle>
          <S.ModalCloseButton type="button" onClick={onClose}>
            닫기
          </S.ModalCloseButton>
        </S.ModalHeader>
        <S.DetailGrid>
          <S.DetailItem>
            <S.DetailLabel>방 번호</S.DetailLabel>
            <S.DetailValue>{detail?.roomNumber ?? student.roomNumber}</S.DetailValue>
          </S.DetailItem>
          <S.DetailItem>
            <S.DetailLabel>성별</S.DetailLabel>
            <S.DetailValue>{getGenderLabel(student.gender, selectedGender)}</S.DetailValue>
          </S.DetailItem>
          <S.DetailItem>
            <S.DetailLabel>학번</S.DetailLabel>
            <S.DetailValue>{detail?.studentNumber ?? student.studentNumber}</S.DetailValue>
          </S.DetailItem>
          <S.DetailItem>
            <S.DetailLabel>상점</S.DetailLabel>
            <S.DetailValue>{detail?.totalRewardPoint ?? student.totalRewardPoint}점</S.DetailValue>
          </S.DetailItem>
          <S.DetailItem>
            <S.DetailLabel>벌점</S.DetailLabel>
            <S.DetailValue>{detail?.totalPenaltyPoint ?? student.totalPenaltyPoint}점</S.DetailValue>
          </S.DetailItem>
          <S.DetailItem>
            <S.DetailLabel>합계</S.DetailLabel>
            <S.DetailValue>
              <S.Point $value={detail?.totalPoint ?? student.totalPoint}>
                {detail?.totalPoint ?? student.totalPoint}점
              </S.Point>
            </S.DetailValue>
          </S.DetailItem>
        </S.DetailGrid>
        {isLoading && (
          <S.ModalSkeletonList>
            <S.SkeletonBar $width="72%" />
            <S.SkeletonBar $width="56%" />
            <S.SkeletonBar $width="64%" />
          </S.ModalSkeletonList>
        )}
        {isError && <S.ModalStateText>{errorMessage}</S.ModalStateText>}
        {detail && (
          <S.HistoryList>
            {detail.conductDetailedInfo.length === 0 ? (
              <S.EmptyText>상벌점 이력이 없습니다.</S.EmptyText>
            ) : (
              detail.conductDetailedInfo.map((history, index) => (
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
  );
}
