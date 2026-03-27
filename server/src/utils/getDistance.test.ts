import { getDistance } from './getDistance';

describe('getDistance', () => {
  it('should return 0 when two points are the same', () => {
    const point1 = { lat: 48.8566, lng: 2.3522 };
    const point2 = { lat: 48.8566, lng: 2.3522 };
    
    const distance = getDistance(point1, point2);
    
    expect(distance).toBeCloseTo(0, 5);
  });
});
