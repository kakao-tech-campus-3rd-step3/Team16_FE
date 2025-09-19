import { useState } from 'react';
import BaseModal from '@/components/common/BaseModal';
import styled from '@emotion/styled';
import ReportModal from '@/components/ReportModal';
import { useHeader } from '@/hooks/useHeader';

export default function DemoPage() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);

  useHeader({ leftContent: null, centerContent: '테스트페이지' });

  return (
    <div>
      <button onClick={() => setModalOpen(true)}>중앙 모달 열기</button>
      <button onClick={() => setSheetOpen(true)}>바텀시트 열기</button>

      <ReportModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        targetType="GROUP"
        targetId={1} //임시로 넣음
      />

      <BaseModal isOpen={isSheetOpen} onClose={() => setSheetOpen(false)} variant="bottom">
        <Wrapper>
          <button>사진 등록하기</button>
          <button>삭제하기</button>
        </Wrapper>
      </BaseModal>
    </div>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
