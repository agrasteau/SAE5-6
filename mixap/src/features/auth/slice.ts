import { UserDocType } from '../../db/types';
import { StoreSlice } from '../../hooks/useStore';

interface State {
  user: UserDocType | undefined;
  set: (user: Partial<UserDocType>) => void;
}

interface Slice {
  authSlice: State;
}

const authSlice: StoreSlice<Slice> = (set /*, get*/) => ({
  authSlice: {
    user: undefined,
    set: (user: Partial<UserDocType>) => {
      set((): any => ({
        authSlice: { user },
      }));
    },
  },
});

export default authSlice;
