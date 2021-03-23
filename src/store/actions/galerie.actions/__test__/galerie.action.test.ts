import {
  GALERIE_POST,
  GALERIE_SET,
  postGalerie,
  resetGalerie,
  setGalerie,
} from '#store/actions';

describe('galerie', () => {
  describe('actions', () => {
    it('should create a post action', () => {
      const data = {
        name: 'galerie name',
      };
      const expectedAction = {
        payload: { data },
        type: GALERIE_POST,
      };
      expect(postGalerie(data)).toEqual(expectedAction);
    });
    it('should create a reset action', () => {
      const expectedAction = {
        payload: {
          data: {
            errors: {
              name: '',
            },
            status: 'pending',
          },
        },
        type: GALERIE_SET,
      };
      expect(resetGalerie()).toEqual(expectedAction);
    });
    it('should create a set action', () => {
      const data = {
        status: 'error',
        errors: {
          name: 'name error',
        },
      } as {
        status?: store.Status;
        errors?: {
          name?: string;
        }
      };
      const expectedAction = {
        payload: { data },
        type: GALERIE_SET,
      };
      expect(setGalerie(data)).toEqual(expectedAction);
    });
  });
});
