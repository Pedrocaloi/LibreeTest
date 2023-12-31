import React from 'react';
import styled from 'styled-components';
import {ButtonWallet} from '@aragon/ui-components';
import {useTranslation} from 'react-i18next';

import {useWallet} from 'hooks/useWallet';
import {useGlobalModalContext} from 'context/globalModals';
import {Container, GridLayout} from 'components/layout';

const ExploreNav: React.FC = () => {
  const {t} = useTranslation();
  const {address, ensName, ensAvatarUrl, isConnected, methods} = useWallet();
  const {open} = useGlobalModalContext();

  const handleWalletButtonClick = () => {
    if (isConnected) {
      open('wallet');
      return;
    }
    methods.selectWallet().catch((err: Error) => {
      // To be implemented: maybe add an error message when
      // the error is different from closing the window
      console.error(err);
    });
  };

  return (
    <Container data-testid="navbar">
      <Menu>
        <GridLayout>
          <RightContent>
            <ActionsWrapper>
              <ButtonWallet
                src={ensAvatarUrl || address}
                onClick={handleWalletButtonClick}
                isConnected={isConnected}
                label={
                  isConnected
                    ? ensName || address
                    : t('navButtons.connectWallet')
                }
              />
            </ActionsWrapper>
          </RightContent>
        </GridLayout>
      </Menu>
    </Container>
  );
};

const Menu = styled.nav.attrs({
  className: 'py-1 desktop:py-2 bg-neutral-200',
})``;

const RightContent = styled.div.attrs({
  className:
    'col-start-9 col-span-4 flex flex-row-reverse justify-between items-center',
})``;

const ActionsWrapper = styled.div.attrs({
  className: 'flex space-x-3 items-center',
})``;

export default ExploreNav;
