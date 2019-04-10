import * as icepick from 'icepick';
import { AnyAction, Reducer } from 'redux';

export interface MathState {
  userA: string;
  userB: string;
}

export const initialMathState: MathState = icepick.freeze({
  userA: '12345.678',
  userB: '0.000009'
});

export const math: Reducer<MathState> =
  (state: MathState = initialMathState, action: AnyAction): MathState => {
    switch (action.type) {
    case 'math/changeA':
      return icepick.set(state, 'userA', action.payload);
    case 'math/changeB':
      return icepick.set(state, 'userB', action.payload);
    }
    return state;
};
