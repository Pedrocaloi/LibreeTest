import {withTransaction} from '@elastic/apm-rum-react';
import React, {useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {Loading} from 'components/temporary';
import {ActionsProvider} from 'context/actions';
import {CreateProposalProvider} from 'context/createProposal';
import {useDaoDetailsQuery} from 'hooks/useDaoDetails';
import {PluginTypes} from 'hooks/usePluginClient';
import {usePluginSettings} from 'hooks/usePluginSettings';

import ProvideLiquidityStepper from 'containers/provideLiquidityStepper';
import ProvideTestTransferStepper from 'containers/provideTestTransferStepper';

export type TestTransferAction = {
  name: string; // This indicates the type of action;
};

type TestTransferFormData = {
  actions: TestTransferAction[];
};

export const defaultValues = {
  actions: [],
};

const TestTransfer: React.FC = () => {
  const [showTxModal, setShowTxModal] = useState(false);

  const {data: daoDetails, isLoading: detailsLoading} = useDaoDetailsQuery();
  const {data: pluginSettings, isLoading: settingsLoading} = usePluginSettings(
    daoDetails?.plugins.find(
      plugin =>
        plugin.id.includes('token-voting') ||
        plugin.id.includes('multisig.plugin')
    )?.instanceAddress as string,
    daoDetails?.plugins.find(
      plugin =>
        plugin.id.includes('token-voting') ||
        plugin.id.includes('multisig.plugin')
    )?.id as PluginTypes
  );

  const formMethods = useForm<TestTransferFormData>({
    defaultValues,
    mode: 'onChange',
  });

  /*************************************************
   *                    Render                     *
   *************************************************/

  if (!daoDetails || !pluginSettings || detailsLoading || settingsLoading) {
    return <Loading />;
  }

  return (
    <>
      <FormProvider {...formMethods}>
        <ActionsProvider daoId={daoDetails?.address as string}>
          <CreateProposalProvider
            showTxModal={showTxModal}
            setShowTxModal={setShowTxModal}
          >
            <ProvideTestTransferStepper
              daoDetails={daoDetails}
              pluginSettings={pluginSettings}
              enableTxModal={() => setShowTxModal(true)}
            />
          </CreateProposalProvider>
        </ActionsProvider>
      </FormProvider>
    </>
  );
};

export default withTransaction('TestTransfer', 'component')(TestTransfer);
