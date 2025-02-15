import { range, pluck } from './utils';

describe('utils', () => {

  // range; tests
  describe('range', () => {
    it('returns correct range from 1 to 5', () => {
      expect(range(1, 5)).toEqual([1, 2, 3, 4]);
    })

    it('returns correct range from 41 to 46', () => {
      expect(range(41, 46)).toEqual([41, 42, 43, 44, 45]);
    })
  })

  // pluck; tests
  describe('pluck', () => {
    it('returns correct value', () => {
      const data: { id: string, name: string }[] = [
        { id: '1', name: 'foo' },
        { id: '2', name: 'buzz' },
        { id: '3', name: 'buck' },
      ]
      
      expect(pluck(data, 'id')).toEqual(['1', '2', '3']);
    })
  })
})