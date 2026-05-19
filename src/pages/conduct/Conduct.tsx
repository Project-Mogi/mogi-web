import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';

import * as S from './Conduct.style';
import {
  ConductControls,
  ConductCreateModal,
  ConductDetailModal,
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

      {conductPage.detailModalProps && <ConductDetailModal {...conductPage.detailModalProps} />}

      {conductPage.createModalProps && <ConductCreateModal {...conductPage.createModalProps} />}
    </>
  );
}
