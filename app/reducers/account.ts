import { UPDATE_ACCOUNT, AccountSetting, UpdateAccountSetting } from './types';

const initialState = {
  projectSlug: 'PRJ',
  token: '123',
  url: 'http://localhost:5000'
} as AccountSetting;

export default function account(
  state: AccountSetting = initialState,
  action: UpdateAccountSetting
): AccountSetting {
  switch (action.type) {
    case UPDATE_ACCOUNT:
      return {
        ...state,
        projectSlug: action.accountSetting.projectSlug,
        token: action.accountSetting.projectSlug,
        url: action.accountSetting.url
      };
    default:
      return state;
  }
}
