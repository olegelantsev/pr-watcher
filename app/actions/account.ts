import {
  AccountCheckError,
  AccountSetting,
  UPDATE_ACCOUNT,
  UpdateAccountSetting,
  errorType,
  AccountCheckProgress,
  ACCOUNT_CHECK_IN_PROGRESS,
  Dispatch,
  ACCOUNT_CHECK_ERROR
} from '../reducers/types';
import { fetchRepoSlags } from './pullRequest';

export function updateAccount(
  accountSetting: AccountSetting,
  checking: boolean,
  error?: errorType
): UpdateAccountSetting {
  return {
    type: UPDATE_ACCOUNT,
    accountSetting,
    checking,
    error
  };
}

function accountCheckInProgress(): AccountCheckProgress {
  return {
    type: ACCOUNT_CHECK_IN_PROGRESS
  };
}

function accountCheckError(
  status: errorType,
  error: string
): AccountCheckError {
  return {
    type: ACCOUNT_CHECK_ERROR,
    error,
    status
  };
}

async function checkAccount(accountSetting: AccountSetting): Promise<boolean> {
  await fetchRepoSlags(accountSetting);
  return true;
}

export function checkAndUpdateAccount(accountSetting: AccountSetting) {
  return (dispatch: Dispatch) => {
    dispatch(accountCheckInProgress());

    return checkAccount(accountSetting)
      .then(() => {
        return dispatch(updateAccount(accountSetting, false, undefined));
      })
      .catch(err => {
        dispatch(accountCheckError('error', String(err)));
      });
  };
}
