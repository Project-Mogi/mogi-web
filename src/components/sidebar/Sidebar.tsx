import * as S from './Sidebar.style';

const menuItems = [
  // { label: '대시보드', path: '/dashboard', end: true },
  // { label: '학생 관리', path: '/students' },
  { label: '상벌점 관리', path: '/conduct', end: false },
  // { label: '히스토리', path: '/histories' },
  // { label: '통계', path: '/statistics' },
];

export function Sidebar() {
  return (
    <S.Sidebar aria-label="관리자 메뉴">
      <S.Menu>
        {menuItems.map((item) => (
          <S.MenuLink key={item.path} to={item.path} end={item.end}>
            {item.label}
          </S.MenuLink>
        ))}
      </S.Menu>
    </S.Sidebar>
  );
}
