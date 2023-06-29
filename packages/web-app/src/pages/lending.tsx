import {
    IllustrationHuman,
    Breadcrumb,
    ButtonText,
    IconAdd,
    IlluObject,
} from '@aragon/ui-components';
import { withTransaction } from '@elastic/apm-rum-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import {
    PageWrapper,
    TokenSectionWrapper,
    TransferSectionWrapper,
} from 'components/wrappers';
import { useGlobalModalContext } from 'context/globalModals';
import { useMappedBreadcrumbs } from 'hooks/useMappedBreadcrumbs';
import useScreen from 'hooks/useScreen';
import { trackEvent } from 'services/analytics';
import PageEmptyState from 'containers/pageEmptyState';
import { Loading } from 'components/temporary';
import { useDaoDetailsQuery } from 'hooks/useDaoDetails';
import { htmlIn } from 'utils/htmlIn';
import LendingTokenList from 'components/lendingTokenList';

const Lending: React.FC = () => {
    const { t } = useTranslation();
    const { data: daoDetails, isLoading } = useDaoDetailsQuery();
    const { open } = useGlobalModalContext();
    const { isMobile, isDesktop } = useScreen();

    // load dao details
    const navigate = useNavigate();
    const { breadcrumbs, icon, tag } = useMappedBreadcrumbs();

    const netWorth = 10000;
    const netAPY = 10;
    const healthFactor = 2.1;

    const collateralList: any[] = [
        {
            id: '1',
            symbol: 'WETH',
            apyPercentage: 2.65,
            balance: 1.2,
            balanceUsd: 2222,
            changeType: 'Positive',
        },
        {
            id: '2',
            symbol: 'WBTC',
            apyPercentage: 1.65,
            balance: 0.2,
            balanceUsd: 8888,
            changeType: 'Positive',
        },
    ]

    const borrowList = [
        {
            id: '1',
            symbol: 'USDC',
            apyPercentage: 1.65,
            balance: 1000,
            balanceUsd: 1000,
            changeType: 'Negative',
        }
    ]

    /*************************************************
     *                    Render                     *
     *************************************************/
    if (isLoading) {
        return <Loading />;
    }

    if (collateralList.length === 0 && isDesktop)
        return (
            <PageEmptyState
                title={t('finance.emptyState.title')}
                subtitle={htmlIn(t)('finance.emptyState.description')}
                Illustration={
                    <div className="flex">
                        <IllustrationHuman
                            {...{
                                body: 'chart',
                                expression: 'excited',
                                hair: 'bun',
                            }}
                            {...(isMobile
                                ? { height: 165, width: 295 }
                                : { height: 225, width: 400 })}
                        />
                        <IlluObject object={'wallet'} className="-ml-36" />
                    </div>
                }
                buttonLabel={t('finance.emptyState.buttonLabel')}
                onClick={() => {
                    open('deposit');
                }}
            />
        );

    return (
        <>
            <PageWrapper
                customHeader={
                    <HeaderContainer>
                        <Header>
                            {!isDesktop && (
                                <Breadcrumb
                                    icon={icon}
                                    crumbs={breadcrumbs}
                                    tag={tag}
                                    onClick={navigate}
                                />
                            )}

                            {/* Main */}
                            <ContentContainer>
                                <TextWrapper>
                                    <TextContainer>
                                        <Title>
                                            {new Intl.NumberFormat('en-US', {
                                                style: 'currency',
                                                currency: 'USD',
                                            }).format(netWorth)}
                                        </Title>

                                        <SubtitleContainer>
                                            <Description>{t('finance.lending.netWorth')}</Description>
                                        </SubtitleContainer>
                                    </TextContainer>

                                    <SubtextWrapper>
                                        <TextContainer>
                                            <Title>{netAPY}%</Title>

                                            <SubtitleContainer>
                                                <Description>{t('finance.lending.netAPY')}</Description>
                                            </SubtitleContainer>
                                        </TextContainer>

                                        <TextContainer>
                                            <Title style={{ color: '#00D16C' }}>{healthFactor}</Title>

                                            <SubtitleContainer>
                                                <Description>{t('finance.lending.healthFactor')}</Description>
                                            </SubtitleContainer>
                                        </TextContainer>
                                    </SubtextWrapper>
                                </TextWrapper>

                                {/* Button */}
                                <ButtonText
                                    size="large"
                                    label={t('finance.lending.newCreditDelegation')}
                                    iconLeft={<IconAdd />}
                                    className="w-full tablet:w-auto"
                                    onClick={() => {
                                        trackEvent('finance_newTransferBtn_clicked', {
                                            dao_address: daoDetails?.address,
                                        });
                                        open();
                                    }}
                                />
                            </ContentContainer>
                        </Header>
                    </HeaderContainer>
                }
            >
                {collateralList.length === 0 ? (
                    <PageEmptyState
                        title={t('finance.emptyState.title')}
                        subtitle={htmlIn(t)('finance.emptyState.description')}
                        Illustration={
                            <div className="flex">
                                <IllustrationHuman
                                    {...{
                                        body: 'chart',
                                        expression: 'excited',
                                        hair: 'bun',
                                    }}
                                    {...(isMobile
                                        ? { height: 165, width: 295 }
                                        : { height: 225, width: 400 })}
                                />
                                <IlluObject object={'wallet'} className="-ml-32" />
                            </div>
                        }
                        buttonLabel={t('finance.emptyState.buttonLabel')}
                        onClick={() => {
                            open('deposit');
                        }}
                    />
                ) : (
                    <>
                        <div className={'h-4'} />
                        <TokenSectionWrapper title={t('finance.lending.yourCollateral')}>
                            <ListContainer>
                                <LendingTokenList tokens={collateralList.slice(0, 5)} />
                            </ListContainer>
                        </TokenSectionWrapper>
                        <div className={'h-4'} />
                        <TransferSectionWrapper
                            title={t('finance.lending.yourBorrows')}
                            showButton
                        >
                            <ListContainer>
                                <LendingTokenList
                                    tokens={borrowList.slice(0, 5)}
                                />
                            </ListContainer>
                        </TransferSectionWrapper>
                    </>
                )}
            </PageWrapper>
        </>
    );
};

export default withTransaction('Lending', 'component')(Lending);

const ListContainer = styled.div.attrs({
    className: 'py-2 space-y-2',
})``;

const HeaderContainer = styled.div.attrs({
    className:
        'col-span-full desktop:col-start-3 desktop:col-end-11 -mx-2 tablet:mx-0 tablet:mt-3',
})``;

const SubtitleContainer = styled.div.attrs({
    className: 'flex gap-x-1.5 items-center mt-1',
})``;

const Header = styled.div.attrs({
    className: `p-2 desktop:p-0 pb-3 desktop:mt-5 space-y-2 tablet:space-y-3 
     bg-ui-0 desktop:bg-transparent tablet:rounded-xl tablet:border
     tablet:border-ui-100 desktop:border-none tablet:shadow-100 desktop:shadow-none`,
})``;

const ContentContainer = styled.div.attrs({
    className: `flex flex-col tablet:flex-row gap-y-2 
       tablet: gap - y - 3 tablet: items - start desktop: items - center
       tablet:justify-between`,
})``;

const TextWrapper = styled.div.attrs({
    className: 'flex flex-col tablet:flex-row tablet:items-center justify-start space-y-2 tablet:space-y-0 space-x-0 tablet:space-x-3 desktop:space-x-5',
})``;

const SubtextWrapper = styled.div.attrs({
    className: 'flex items-center justify-start space-x-2 desktop:space-x-5',
})``;

const TextContainer = styled.div.attrs({
    className: 'tablet:flex-1 space-y-1 capitalize',
})``;

const Title = styled.h2.attrs({
    className: 'font-bold text-ui-800 ft-text-3xl',
})``;

const Description = styled.p.attrs({
    className: 'text-ui-600 ft-text-base',
})``;
