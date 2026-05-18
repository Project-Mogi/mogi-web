import textLogo from '@/assets/logos/TextLogo.png';

import * as S from './Header.style';

export function Header() {
  return (
    <S.Header>
      <S.LogoLink to="/" aria-label="모두의기숙사 홈">
        <S.LogoImage src={textLogo} alt="모두의기숙사" />
      </S.LogoLink>

      <S.Actions aria-label="인증 메뉴">
        <S.ActionLink to="/login" $variant="outline">
          로그인
        </S.ActionLink>
        <S.ActionLink to="/signup" $variant="primary">
          회원가입
        </S.ActionLink>
      </S.Actions>
    </S.Header>
  );
}
