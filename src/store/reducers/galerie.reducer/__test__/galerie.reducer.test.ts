import {
  GALERIE_SET,
} from '#store/actions';

import reducer from '../index';

describe('galerie', () => {
  describe('reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {
        type: '@@INIT',
      })).toEqual({
        status: 'pending',
        errors: {
          name: '',
        },
      });
    });
    it('should set galerie status', () => {
      const status = 'success';
      expect(reducer(undefined, {
        payload: {
          data: {
            status,
          },
        },
        type: GALERIE_SET,
      })).toEqual({
        status,
        errors: {
          name: '',
        },
      });
    });
    it('should set galerie errors', () => {
      const errors = {
        name: 'error name',
      };
      expect(reducer(undefined, {
        payload: {
          data: {
            errors,
          },
        },
        type: GALERIE_SET,
      })).toEqual({
        status: 'pending',
        errors,
      });
    });
  });
});
