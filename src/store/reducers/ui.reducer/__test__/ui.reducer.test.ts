import { UI_SET } from '#store/actions';

import reducer from '../index';

describe('ui', () => {
  describe('reducer', () => {
    it('should set initial state', () => {
      expect(reducer(undefined, {
        type: '@@INIT',
      })).toEqual({
        loading: false,
        init: false,
      });
    });
    it('should set loading', () => {
      expect(reducer(undefined, {
        payload: {
          data: {
            loading: true,
          },
        },
        type: UI_SET,
      })).toEqual({
        init: false,
        loading: true,
      });
    });
    it('should set init', () => {
      expect(reducer(undefined, {
        payload: {
          data: {
            init: true,
          },
        },
        type: UI_SET,
      })).toEqual({
        init: true,
        loading: false,
      });
    });
  });
});
