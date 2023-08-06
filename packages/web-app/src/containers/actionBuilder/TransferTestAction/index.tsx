import {ListItemAction} from '@aragon/ui-components';
import React from 'react';
import {useFormContext} from 'react-hook-form';
import {useTranslation} from 'react-i18next';

import {AccordionMethod} from 'components/accordionMethod';
import ConfigureWithdrawForm from 'containers/configureWithdraw';
import {useActionsContext} from 'context/actions';
import {ActionIndex} from 'utils/types';
import {FormItem} from '../addAddresses'; /*de aca sacar para los forms*/
import {useAlertContext} from 'context/alert';

type TransferTestActionProps = ActionIndex & {allowRemove?: boolean};

const TransferTestAction: React.FC<TransferTestActionProps> = ({
  actionIndex,
  allowRemove = true,
}) => {
  const {t} = useTranslation();
  const {removeAction, duplicateAction} = useActionsContext();
  const {setValue, clearErrors, resetField} = useFormContext();
  const {alert} = useAlertContext();

  const resetTransferTestFields = () => {
    clearErrors(`actions.${actionIndex}`);
    resetField(`actions.${actionIndex}`);
    setValue(`actions.${actionIndex}.inputs`, {
      testNameField: '',
      testNumberField: 0,
    });
    alert(t('alert.chip.resetAction'));
  };

  const removeTransferTestFields = (actionIndex: number) => {
    removeAction(actionIndex);
  };

  const methodActions = (() => {
    const result = [
      {
        component: (
          <ListItemAction title={t('labels.duplicateAction')} bgWhite />
        ),
        callback: () => {
          duplicateAction(actionIndex);
          alert(t('alert.chip.duplicateAction'));
        },
      },
      {
        component: <ListItemAction title={t('labels.resetAction')} bgWhite />,
        callback: resetTransferTestFields,
      },
    ];

    if (allowRemove) {
      result.push({
        component: (
          <ListItemAction title={t('labels.removeEntireAction')} bgWhite />
        ),
        callback: () => {
          removeTransferTestFields(actionIndex);
          alert(t('alert.chip.removedAction'));
        },
      });
    }

    return result;
  })();

  return (
    <AccordionMethod
      verified
      type="action-builder"
      methodName={t('TransferModal.testTrasnfer')}
      dropdownItems={methodActions}
      smartContractName={t('labels.aragonOSx')}
      methodDescription={t('TransferModal.testTransferSubtitle')}
    >
      <FormItem className="py-3 space-y-3 rounded-b-xl">
        <ConfigureWithdrawForm actionIndex={actionIndex} />
      </FormItem>
    </AccordionMethod>
  );
};

export default TransferTestAction;
