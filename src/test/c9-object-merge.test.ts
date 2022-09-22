import solution from '../challenges/c9-object-merge/solution';

describe('simple object merge solution', () => {
  const s1 = { x: 1 };
  const s2 = { y: 2 };
  const s3 = { z: 3 };
  const sm = { x: 1, y: 2, z: 3 };

  const m1 = { x: 1, y: 2, z: 3 };
  const m2 = { xx: 11, yy: 22, zz: 33 };
  const m3 = { xxx: 111, yyy: 222, zzz: 333 };
  const mm = {
    x: 1,
    y: 2,
    z: 3,
    xx: 11,
    yy: 22,
    zz: 33,
    xxx: 111,
    yyy: 222,
    zzz: 333,
  };

  const n1 = { x: 1, y: 2, z: { k: 3 } };
  const n2 = { xx: 11, yy: 22, zz: { kk: 33 } };
  const n3 = { xxx: 111, yyy: 222, zzz: { kkk: { x: 333 } } };
  const nm = {
    x: 1,
    y: 2,
    z: { k: 3 },
    xx: 11,
    yy: 22,
    zz: { kk: 33 },
    xxx: 111,
    yyy: 222,
    zzz: { kkk: { x: 333 } },
  };

  test('merges three flat objects with single keys', () => {
    expect(solution([s1, s2, s3])).toEqual(sm);
  });

  test('merges three flat objects with multiple keys', () => {
    expect(solution([m1, m2, m3])).toEqual(mm);
  });

  test('merges three nested objects with multiple keys', () => {
    expect(solution([n1, n2, n3])).toEqual(nm);
  });
});
