import { getDistance } from '../../utils/getDistance';

describe('getDistance', () => {
  it('should return 0 when two points are the same', () => {
    const point1 = { lat: 48.8566, lng: 2.3522 };
    const point2 = { lat: 48.8566, lng: 2.3522 };
    
    const distance = getDistance(point1, point2);
    
    expect(distance).toBeCloseTo(0, 5);
  });

  it('should calculate correct distance between Paris and London', () => {
    const paris = { lat: 48.8566, lng: 2.3522 };
    const london = { lat: 51.5074, lng: -0.1278 };
    
    const distance = getDistance(paris, london);
    
    // Distance between Paris and London is approximately 343 km
    expect(distance).toBeCloseTo(343.556, 1);
  });

  it('should calculate correct distance between Paris and Berlin', () => {
    const paris = { lat: 48.8566, lng: 2.3522 };
    const berlin = { lat: 52.52, lng: 13.405 };
    
    const distance = getDistance(paris, berlin);
    
    // Distance between Paris and Berlin is approximately 877 km
    expect(distance).toBeCloseTo(877, 0);
  });

  it('should return symmetric distance (distance from A to B equals distance from B to A)', () => {
    const point1 = { lat: 40.7128, lng: -74.006 }; // New York
    const point2 = { lat: 51.5074, lng: -0.1278 }; // London
    
    const distance1 = getDistance(point1, point2);
    const distance2 = getDistance(point2, point1);
    
    expect(distance1).toBeCloseTo(distance2, 5);
  });

  it('should handle negative coordinates correctly', () => {
    const point1 = { lat: -33.8688, lng: 151.2093 }; // Sydney
    const point2 = { lat: -37.8136, lng: 144.9631 }; // Melbourne
    
    const distance = getDistance(point1, point2);
    
    // Distance between Sydney and Melbourne is approximately 713 km
    expect(distance).toBeCloseTo(713.427, 1);
  });

  it('should handle coordinates across the equator', () => {
    const northPoint = { lat: 10, lng: 0 };
    const southPoint = { lat: -10, lng: 0 };
    
    const distance = getDistance(northPoint, southPoint);
    
    // 20 degrees of latitude approximately equals 2223 km
    expect(distance).toBeCloseTo(2223.899, 1);
  });

  it('should handle coordinates across the prime meridian', () => {
    const westPoint = { lat: 0, lng: -10 };
    const eastPoint = { lat: 0, lng: 10 };
    
    const distance = getDistance(westPoint, eastPoint);
    
    // 20 degrees of longitude at equator approximately equals 2223 km
    expect(distance).toBeCloseTo(2223.899, 1);
  });
});
