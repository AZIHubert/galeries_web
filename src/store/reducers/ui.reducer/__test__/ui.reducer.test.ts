import { LOADER_SET } from '#store/actions';

import reducer from '../index';

describe('ui', () => {
  describe('reducer', () => {
    it('should set initial state', () => {
      expect(reducer(undefined, {
        type: '@@INIT',
      })).toEqual({
        loading: false,
      });
    });
    it('should set loading', () => {
      expect(reducer(undefined, {
        payload: {
          data: {
            loading: true,
          },
        },
        type: LOADER_SET,
      })).toEqual({
        loading: true,
      });
    });
  });
});
