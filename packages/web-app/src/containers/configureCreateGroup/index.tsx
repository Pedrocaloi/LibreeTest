import {
    AlertInline,
    Label,
    ValueInput,
} from '@aragon/ui-components';
import React, { useEffect } from 'react';
import {
    Controller,
    FormState,
    useFormContext,
    useWatch,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { WithdrawAction } from 'pages/newWithdraw';
import { ActionIndex } from 'utils/types';

type ConfigureCreateGroupFormProps = ActionIndex;

const ConfigureCreateGroupForm: React.FC<ConfigureCreateGroupFormProps> = ({
    actionIndex,
}) => {
    const { t } = useTranslation();
    const { control, setValue } = useFormContext();

    const [name] =
        useWatch({
            name: [
                `actions.${actionIndex}.name`,
            ],
        });

    /*************************************************
     *                    Hooks                      *
     *************************************************/

    useEffect(() => {
        if (!name) {
            setValue(`actions.${actionIndex}.name`, 'create_group');
        }
    }, [actionIndex, name, setValue]);

    /*************************************************
     *                    Render                     *
     *************************************************/
    return (
        <>
            {/* Group name */}
            <FormItem>
                <Label
                    label={t('createGroup.nameInput')}
                    helpText={t('createGroup.nameDescription')}
                />
                <Controller
                    name={`actions.${actionIndex}.inputs.groupName`}
                    control={control}
                    defaultValue=""
                    render={({
                        field: { name, onBlur, onChange, value },
                        fieldState: { error },
                    }) => (
                        <>
                            <StyledInput
                                mode={error ? 'critical' : 'default'}
                                name={name}
                                type="text"
                                value={value}
                                placeholder={'...'}
                                onBlur={onBlur}
                                onChange={(e) => {
                                    onChange(e);
                                    setValue('groupName', e.target.value);
                                }}
                            />
                            {error?.message && (
                                <AlertInline label={error.message} mode="critical" />
                            )}
                        </>
                    )}
                />
            </FormItem>

        </>
    );
};

export default ConfigureCreateGroupForm;

/**
 * Check if the screen is valid
 * @param dirtyFields List of fields that have been changed
 * @param errors List of fields that have errors
 * @param tokenAddress Token address
 * @returns Whether the screen is valid
 */
export function isValid(
    dirtyFields?: FormState<WithdrawAction>['dirtyFields'],
    errors?: FormState<WithdrawAction>['errors'],
    tokenAddress?: string
) {
    // check if fields are dirty
    if (!dirtyFields?.to || !dirtyFields?.amount || !tokenAddress) return false;

    // check if fields have errors
    if (errors?.to || errors?.amount || errors?.tokenAddress) return false;

    return true;
}

/*************************************************
 *               Styled Components               *
 *************************************************/

const FormItem = styled.div.attrs({
    className: 'space-y-1.5 tablet:pb-1',
})``;

export const StyledInput = styled(ValueInput)`
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
`;
