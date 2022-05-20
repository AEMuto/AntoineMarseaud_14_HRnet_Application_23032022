import React from 'react';
import styled from 'styled-components';
import { colors } from '../theme/colors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

type ModalProps = {
  children: React.ReactNode;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal = ({ children, visible, setVisible }: ModalProps) => {
  return (
    <>
      {visible && (
        <ModalContainer>
          <ModalWrapper>
            {children}
            <CloseIcon icon={faXmark} onClick={() => setVisible(false)} />
          </ModalWrapper>
        </ModalContainer>
      )}
    </>
  );
};

export default Modal;

const ModalContainer = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const ModalWrapper = styled.div`
  background-color: ${colors.white};
  padding: 1rem 2rem 1rem 1rem;
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 6px 6px 4px rgba(0, 0, 0, 0.2);
`;

const CloseIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0.5rem;
  color: ${colors.black};
`;
