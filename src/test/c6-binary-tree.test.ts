import solution from '../challenges/c6-binary-tree/solution';

describe('binary tree solution', () => {
  test('counts nodes properly', () => {
    expect(solution({})).toBe(1);
    expect(solution({ a: {}, b: { a: {}, b: {} } })).toBe(5);
    expect(solution({ a: {}, b: { a: {}, b: {}, c: {} } })).toBe(5);
    expect(
      solution({
        a: {
          a: {
            a: { a: {}, b: { a: {}, b: { a: { a: {}, b: {} }, b: {} } } },
            b: {},
          },
          b: {
            a: {
              a: {},
              b: { a: {}, b: { a: { a: {}, b: { a: {}, b: {} } }, b: {} } },
            },
            b: { a: {}, b: {} },
          },
        },
        b: {
          a: {},
          b: {
            a: {
              a: {},
              b: {
                a: {},
                b: {
                  a: {},
                  b: {
                    a: {},
                    b: {
                      a: {},
                      b: {
                        a: {},
                        b: {
                          a: {
                            a: {
                              a: {
                                a: {},
                                b: { a: {}, b: { a: { a: {}, b: {} }, b: {} } },
                              },
                              b: {},
                            },
                            b: {
                              a: {
                                a: {},
                                b: {
                                  a: {},
                                  b: {
                                    a: { a: {}, b: { a: {}, b: {} } },
                                    b: {},
                                  },
                                },
                              },
                              b: { a: {}, b: {} },
                            },
                          },
                          b: {
                            a: {},
                            b: {
                              a: {
                                a: {},
                                b: {
                                  a: {},
                                  b: {
                                    a: {},
                                    b: {
                                      a: {},
                                      b: { a: {}, b: { a: {}, b: {} } },
                                    },
                                  },
                                },
                              },
                              b: { a: {}, b: {} },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            b: { a: {}, b: {} },
          },
        },
      })
    ).toBe(93);
  });
});
