import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';

import * as S from './Conduct.style';
import { ConductCreateForm } from './components';
import { useConductCreatePage } from './hooks/useConductCreatePage';

export function ConductCreatePage() {
  const conductCreatePage = useConductCreatePage();

  return (
    <>
      <Header variant="app" />
      <Sidebar />
      <S.Page>
        <S.CreatePageHeader>
          <S.CreatePageTitleGroup>
            <S.CreatePageTitle>상벌점 부여</S.CreatePageTitle>
          </S.CreatePageTitleGroup>
          <S.SecondaryButton type="button" onClick={conductCreatePage.onCancel}>
            목록으로
          </S.SecondaryButton>
        </S.CreatePageHeader>

        <S.CreateFormPanel>
          {conductCreatePage.isStudentListLoading && (
            <S.CreateFormSkeleton>
              <S.SkeletonBar $width="72%" />
              <S.SkeletonBar $width="100%" />
              <S.SkeletonBar $width="86%" />
              <S.SkeletonBar $width="100%" />
            </S.CreateFormSkeleton>
          )}
          {conductCreatePage.isStudentListError && (
            <S.StateMessage>{conductCreatePage.studentListErrorMessage}</S.StateMessage>
          )}
          {!conductCreatePage.isStudentListLoading && !conductCreatePage.isStudentListError && (
            <ConductCreateForm {...conductCreatePage.formProps} />
          )}
        </S.CreateFormPanel>
      </S.Page>
    </>
  );
}
