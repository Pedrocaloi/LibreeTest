import {
  ButtonText,
  IconChevronRight,
  IconFinance,
  ListItemHeader,
  TransferListItem,
} from '@aragon/ui-components';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {generatePath, useNavigate} from 'react-router-dom';
import styled from 'styled-components';

import {StateEmpty} from 'components/stateEmpty';
import {useGlobalModalContext} from 'context/globalModals';
import {useNetwork} from 'context/network';
import {useTransactionDetailContext} from 'context/transactionDetail';
import {AllTransfers} from 'utils/paths';
import {abbreviateTokenAmount} from 'utils/tokens';
import {Transfer} from 'utils/types';
import {htmlIn} from 'utils/htmlIn';

type Props = {
  daoAddressOrEns: string;
  transfers: Transfer[];
};

const TreasurySnapshot: React.FC<Props> = ({
  daoAddressOrEns,
  transfers,
}) => {
  const {t} = useTranslation();
  const {open} = useGlobalModalContext();
  const navigate = useNavigate();
  const {network} = useNetwork();
  const {handleTransferClicked} = useTransactionDetailContext();

  if (transfers.length === 0) {
    return (
      <StateEmpty
        type="both"
        mode="card"
        body={'chart'}
        expression={'excited'}
        hair={'bun'}
        object={'wallet'}
        title={t('finance.emptyState.title')}
        description={htmlIn(t)('finance.emptyState.description')}
        primaryButton={{
          label: t('finance.emptyState.buttonLabel'),
          onClick: () => open(),
        }}
        renderHtml
      />
    );
  }

  return (
    <Container>
      <ListItemHeader
        icon={<IconFinance />}
        value={t('labels.latestActivity')}
        label={""}
        orientation="horizontal"
      />
      {transfers.slice(0, 3).map(({tokenAmount, ...rest}) => (
        <TransferListItem
          key={rest.id}
          tokenAmount={abbreviateTokenAmount(tokenAmount)}
          {...rest}
          onClick={() => handleTransferClicked({tokenAmount, ...rest})}
        />
      ))}
      <ButtonText
        mode="secondary"
        size="large"
        iconRight={<IconChevronRight />}
        label={t('labels.seeAll')}
        onClick={() =>
          navigate(generatePath(AllTransfers, {network, dao: daoAddressOrEns}))
        }
      />
    </Container>
  );
};

export default TreasurySnapshot;

const Container = styled.div.attrs({
  className: 'space-y-1.5 desktop:space-y-2',
})``;
