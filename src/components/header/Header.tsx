import textLogo from '@/assets/logos/TextLogo.png';
import { clearAuthTokens } from '@/shared/api/token';

import * as S from './Header.style';

type HeaderProps = {
  variant?: 'auth' | 'app';
};

export function Header({ variant = 'auth' }: HeaderProps) {
  const isAppHeader = variant === 'app';

  return (
    <S.Header $variant={variant}>
      <S.LogoLink to="/conduct" aria-label="모두의기숙사 홈">
        <S.LogoImage src={textLogo} alt="모두의기숙사" />
      </S.LogoLink>

      {isAppHeader ? (
        <S.AppActions aria-label="사용자 메뉴">
          <S.UserName>관리자</S.UserName>
          <S.LogoutLink to="/login" onClick={clearAuthTokens}>
            로그아웃
          </S.LogoutLink>
        </S.AppActions>
      ) : (
        <S.Actions aria-label="인증 메뉴">
          <S.ActionLink to="/login" $variant="outline">
            로그인
          </S.ActionLink>
          <S.ActionLink to="/signup" $variant="primary">
            회원가입
          </S.ActionLink>
        </S.Actions>
      )}
    </S.Header>
  );
}
