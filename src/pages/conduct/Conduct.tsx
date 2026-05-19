import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';

import * as S from './Conduct.style';
import {
  ConductControls,
  ConductFilters,
  ConductTable,
} from './components';
import { useConductPage } from './hooks';

export function ConductPage() {
  const conductPage = useConductPage();

  return (
    <>
      <Header variant="app" />
      <Sidebar />
      <S.Page>
        <ConductControls {...conductPage.controlsProps} />
        <ConductFilters {...conductPage.filtersProps} />
        <ConductTable {...conductPage.tableProps} />
      </S.Page>
    </>
  );
}
