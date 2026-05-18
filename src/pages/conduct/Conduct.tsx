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
  const {
    conductErrorMessage,
    createConductError,
    createConductForm,
    createStudentKeyword,
    createStudentResults,
    detailErrorMessage,
    handleCreateConductSubmit,
    isConductError,
    isConductLoading,
    isCreateConductPending,
    isCreateModalOpen,
    isDetailError,
    isDetailLoading,
    openCreateModal,
    closeCreateModal,
    searchKeyword,
    selectedClass,
    selectedDate,
    selectedDateLabel,
    selectedGender,
    selectedGrade,
    selectedStudent,
    selectedStudentDetail,
    selectedUserId,
    selectedCreateStudent,
    setCreateConductCategory,
    selectCreateStudent,
    setCreateStudentKeyword,
    setSearchKeyword,
    setSelectedDate,
    setSelectedClass,
    setSelectedGender,
    setSelectedGrade,
    setSelectedUserId,
    setSortOption,
    sortOption,
    tableRows,
    updateCreateConductForm,
  } = useConductPage();

  return (
    <>
      <Header variant="app" />
      <Sidebar />
      <S.Page>
        <ConductControls
          searchKeyword={searchKeyword}
          selectedDate={selectedDate}
          selectedDateLabel={selectedDateLabel}
          sortOption={sortOption}
          onDateChange={setSelectedDate}
          onSearchChange={setSearchKeyword}
          onSortChange={setSortOption}
        />
        <ConductFilters
          selectedClass={selectedClass}
          selectedGender={selectedGender}
          selectedGrade={selectedGrade}
          onClassChange={setSelectedClass}
          onCreateClick={openCreateModal}
          onGenderChange={setSelectedGender}
          onGradeChange={setSelectedGrade}
        />
        <ConductTable
          errorMessage={conductErrorMessage}
          isError={isConductError}
          isLoading={isConductLoading}
          rows={tableRows}
          selectedGender={selectedGender}
          selectedUserId={selectedUserId}
          onSelectUser={setSelectedUserId}
        />
      </S.Page>

      {selectedStudent && (
        <ConductDetailModal
          detail={selectedStudentDetail}
          errorMessage={detailErrorMessage}
          isError={isDetailError}
          isLoading={isDetailLoading}
          selectedGender={selectedGender}
          student={selectedStudent}
          onClose={() => setSelectedUserId(null)}
        />
      )}

      {isCreateModalOpen && (
        <ConductCreateModal
          errorMessage={createConductError}
          form={createConductForm}
          isPending={isCreateConductPending}
          searchKeyword={createStudentKeyword}
          searchResults={createStudentResults}
          selectedStudent={selectedCreateStudent}
          onCategoryChange={setCreateConductCategory}
          onClose={closeCreateModal}
          onScoreChange={(value) => updateCreateConductForm('score', value)}
          onSearchChange={setCreateStudentKeyword}
          onSelectStudent={selectCreateStudent}
          onSubmit={handleCreateConductSubmit}
        />
      )}
    </>
  );
}
