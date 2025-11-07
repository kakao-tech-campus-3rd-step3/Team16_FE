import BaseModal from '@/components/common/BaseModal';
import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import type { ReactNode } from 'react';

interface BottomSheetOption {
  label: string;
  onClick: () => void;
  variant?: 'default' | 'danger';
}

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  options: BottomSheetOption[];
  customContent?: ReactNode;
}

const BottomSheet = ({ isOpen, onClose, options, customContent }: BottomSheetProps) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} variant="bottom">
      <Wrapper onClick={(e) => e.stopPropagation()}>
        {customContent ? (
          customContent
        ) : (
          <OptionList>
            {options.map((option, index) => (
              <OptionItem
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  option.onClick();
                  onClose();
                }}
                variant={option.variant || 'default'}
              >
                {option.label}
              </OptionItem>
            ))}
          </OptionList>
        )}
        <CloseButton>
          <OptionItem 
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }} 
            variant="default"
          >
            닫기
          </OptionItem>
        </CloseButton>
      </Wrapper>
    </BaseModal>
  );
};

export default BottomSheet;

const Wrapper = styled.div({
  marginBottom: '20px',
});

const OptionList = styled.div({
  margin: '0 16px 5px 16px',
  borderRadius: '12px',
  overflow: 'hidden',
  background: colors.gray300,
});

const CloseButton = styled.div({
  margin: '0 16px',
  borderRadius: '12px',
  overflow: 'hidden',
  background: colors.gray300,
});

const OptionItem = styled.div<{ variant: 'default' | 'danger' }>(({ variant }) => ({
  padding: '15px',
  textAlign: 'center',
  borderBottom: `1px solid ${colors.gray100}`,
  cursor: 'pointer',
  color: variant === 'danger' ? colors.error : colors.black,
  fontWeight: variant === 'danger' ? 600 : 400,
  '&:last-child': {
    borderBottom: 'none',
  },
  '&:hover': {
    backgroundColor: colors.gray100,
  },
}));
