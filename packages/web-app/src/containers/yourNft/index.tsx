import React from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';

//====================================================
// HardCoded NFTS
import nft1 from '../../utils/assets/nft1.jpg';
import nft2 from '../../utils/assets/nft3.webp';
import nft3 from '../../utils/assets/nft2.webp';
import nft4 from '../../utils/assets/nft4.png';
import nft5 from '../../utils/assets/nft5.jpg';
import nft6 from '../../utils/assets/nft6.webp';

export const YourNFT = () => {
  const nfts = [nft1, nft2, nft3, nft4, nft5, nft6];
  const {t} = useTranslation();

  return (
    <>
      <Container>
        <Title>{t('dashboard.nftOverview.title')}</Title>
        <CardDisplay>
          {nfts.map(nft => (
            <Card>
              <StyledImg src={nft} />
            </Card>
          ))}
        </CardDisplay>
      </Container>
    </>
  );
};

const Container = styled.div.attrs({
  className: `bg-white w-full mx-0 tablet:col-span-fullñ
      tablet:w-full tablet:mx-0 desktop:col-start-2 desktop:col-span-10
      tablet:mt-3 rounded-lg shadow-100 p-2 tablet:p-3 desktop:p-6
      border border-ui-100`,
})``;

const StyledImg = styled.img.attrs({
  className: 'w-10/12 h-full rounded-xl object-cover',
})``;

const Title = styled.p.attrs({
  className: 'text-ui-800 font-bold text-lg mt-3 mb-1',
})``;

const CardDisplay = styled.div.attrs({
  className: `grid grid-cols-2 tablet:grid-cols-3 gap-1 tablet:gap-2`,
})``;

const Card = styled.div.attrs({
  className:
    'w-full bg-white rounded-xl p-1 tablet:p-2 space-y-1 box-border ' +
    'hover:border hover:border-ui-100 ' +
    'active:border active:border-ui-200 ' +
    'focus:outline-none focus:ring-2 focus:ring-primary-500',
})`
  &:hover {
    box-shadow: 0px 4px 8px rgba(31, 41, 51, 0.04),
      0px 0px 2px rgba(31, 41, 51, 0.06), 0px 0px 1px rgba(31, 41, 51, 0.04);
  }
`;
const CardContent = styled.div.attrs({
  className: 'w-full h-16',
});

const TextContent = styled.div.attrs({
  className:
    'absolute bottom-0 flex flex-col items-left bg-white opacity-80 w-full h-fit-content p-1 tablet:py-0 rounded-b-xl',
});

const Description = styled.p.attrs({
  className: 'text-ui-600 text-left font-normal ft-text-sm line-clamp-2',
});
