import { useNavigate } from 'react-router-dom';

import textLogo from '@/assets/logos/TextLogo.png';
import { logout } from '@/features/auth/sign-in/api';
import { clearAuthTokens } from '@/shared/api/token';

import * as S from './Header.style';

type HeaderProps = {
  variant?: 'auth' | 'app';
};

export function Header({ variant = 'auth' }: HeaderProps) {
  const navigate = useNavigate();
  const isAppHeader = variant === 'app';

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      clearAuthTokens();
      navigate('/login', { replace: true });
    }
  };

  return (
    <S.Header $variant={variant}>
      <S.LogoLink to="/conduct" aria-label="모두의기숙사 홈">
        <S.LogoImage src={textLogo} alt="모두의기숙사" />
      </S.LogoLink>

      {isAppHeader ? (
        <S.AppActions aria-label="사용자 메뉴">
          <S.UserName>관리자</S.UserName>
          <S.LogoutButton type="button" onClick={handleLogout}>
            로그아웃
          </S.LogoutButton>
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
