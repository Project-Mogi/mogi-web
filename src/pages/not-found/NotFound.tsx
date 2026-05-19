import { useNavigate } from 'react-router-dom';

import notFoundHero from '@/assets/images/not-found-hero.png';
import { Header } from '@/components/header';

import * as S from './NotFound.style';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <>
      <Header variant="app" />
      <S.Page>
        <S.Content>
          <S.HeroImage src={notFoundHero} alt="" aria-hidden="true" />
          <S.Title>페이지를 찾을 수 없습니다</S.Title>
          <S.Description>주소를 다시 확인하거나 상벌점 관리 화면으로 이동해 주세요</S.Description>
          <S.Actions>
            <S.PrimaryButton type="button" onClick={() => navigate('/conduct')}>
              상벌점 관리로 이동
            </S.PrimaryButton>
            <S.SecondaryButton type="button" onClick={() => navigate(-1)}>
              이전으로
            </S.SecondaryButton>
          </S.Actions>
        </S.Content>
      </S.Page>
    </>
  );
}
