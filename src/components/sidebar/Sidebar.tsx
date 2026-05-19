import { useLocation } from 'react-router-dom';

import * as S from './Sidebar.style';

const menuItems = [
  // { label: '대시보드', path: '/dashboard', end: true },
  // { label: '학생 관리', path: '/students' },
  { label: '상벌점 관리', path: '/conduct', end: true },
  // { label: '히스토리', path: '/histories' },
  // { label: '통계', path: '/statistics' },
];

const conductCreateMenuItem = { label: '상벌점 부여', path: '/conduct/create', end: true };

export function Sidebar() {
  const location = useLocation();
  const shouldShowConductCreateMenu = location.pathname === '/conduct/create';

  return (
    <S.Sidebar aria-label="관리자 메뉴">
      <S.Menu>
        {menuItems.map((item) => (
          <S.MenuLink key={item.path} to={item.path} end={item.end}>
            {item.label}
          </S.MenuLink>
        ))}
        {shouldShowConductCreateMenu && (
          <S.TemporaryMenuGroup>
            <S.SubMenuLink to={conductCreateMenuItem.path} end={conductCreateMenuItem.end}>
              {conductCreateMenuItem.label}
            </S.SubMenuLink>
          </S.TemporaryMenuGroup>
        )}
      </S.Menu>
    </S.Sidebar>
  );
}
