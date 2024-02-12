import dayjs from "dayjs";
import { getYearsOld, getBMR, getDailyCalorieIntake } from "../lib/utils";

describe('getYearsOld', () => {
  let mockDayjs: jest.Mock;

//   beforeEach(() => {
//     mockDayjs = dayjs as unknown as jest.Mock;
//     mockDayjs.mockClear();
//   });

  it('should return 30 if null is provided', () => {
    const result = getYearsOld(null);
    expect(result).toBe(30);
  });

  it('should return 30 if empty string is provided', () => {
    const result = getYearsOld('');
    expect(result).toBe(30);
  });

  it('should calculate the difference in years if a valid year string is provided', () => {
    const mockDiff = jest.fn().mockReturnValue(20);
    mockDayjs.mockReturnValue({
      diff: mockDiff,
      year: jest.fn().mockReturnValue(mockDayjs),
    });

    const result = getYearsOld('2002');
    expect(result).toBe(20);
    expect(mockDayjs).toHaveBeenCalledTimes(2);
    expect(mockDayjs().year).toHaveBeenCalledWith(2002);
    expect(mockDayjs().diff).toHaveBeenCalledWith(mockDayjs().year(2002), 'year');
  });

  it('should throw an error if an invalid year string is provided', () => {
    const mockDiff = jest.fn().mockImplementation(() => {
      throw new Error('Invalid year');
    });
    mockDayjs.mockReturnValue({
      diff: mockDiff,
      year: jest.fn().mockReturnValue(mockDayjs),
    });

    expect(() => getYearsOld('invalid')).toThrow('Invalid year');
  });
});

describe('getBMR', () => {
  it('should calculate BMR correctly for male', () => {
    const data = {
      age: '1990',
      gender: 'male',
      weight: '70',
      height: '180'
    };
    const result = getBMR(data);
    expect(result).toBeCloseTo(1666.5);
  });

  it('should calculate BMR correctly for female', () => {
    const data = {
      age: '1990',
      gender: 'female',
      weight: '60',
      height: '165'
    };
    const result = getBMR(data);
    expect(result).toBeCloseTo(1381.25);
  });

  it('should handle non-numeric weight and height', () => {
    const data = {
      age: '1990',
      gender: 'male',
      weight: 'invalid',
      height: 'invalid'
    };
    expect(() => getBMR(data)).toThrow();
  });
});

describe('getDailyCalorieIntake', () => {
it('should return 0 if no data is provided', () => {
    const result = getDailyCalorieIntake({
        age: null,
        gender: null,
        weight: null,
        height: null,
        activity: null,
        goal: null
    });
    expect(result).toBe(0);
});

  it('should calculate daily calorie intake correctly for low activity and weight maintenance', () => {
    const data = {
      age: '1990',
      gender: 'male',
      weight: '70',
      height: '180',
      activity: 'low',
      goal: 'maintain_weight'
    };
    const result = getDailyCalorieIntake(data);
    expect(result).toBeCloseTo(1666.5 * 1.39);
  });

  it('should calculate daily calorie intake correctly for high activity and weight loss', () => {
    const data = {
      age: '1990',
      gender: 'female',
      weight: '60',
      height: '165',
      activity: 'high',
      goal: 'lose_weight'
    };
    const result = getDailyCalorieIntake(data);
    expect(result).toBeCloseTo((1381.25 * 1.89) - 500);
  });

  it('should calculate daily calorie intake correctly for medium activity and weight gain', () => {
    const data = {
      age: '1990',
      gender: 'male',
      weight: '70',
      height: '180',
      activity: 'medium',
      goal: 'gain_weight'
    };
    const result = getDailyCalorieIntake(data);
    expect(result).toBeCloseTo((1666.5 * 1.59) + 250);
  });

  it('should handle non-numeric weight and height', () => {
    const data = {
      age: '1990',
      gender: 'male',
      weight: 'invalid',
      height: 'invalid',
      activity: 'low',
      goal: 'maintain_weight'
    };
    expect(() => getDailyCalorieIntake(data)).toThrow();
  });
});