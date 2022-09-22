import { Challenge } from '..';
import solution from './solution';

interface Node {
  a?: Node;
  b?: Node;
}

const input: Node = {
  a: {
    a: { a: { a: {}, b: { a: {}, b: { a: { a: {}, b: {} }, b: {} } } }, b: {} },
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
                            b: { a: { a: {}, b: { a: {}, b: {} } }, b: {} },
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
                              b: { a: {}, b: { a: {}, b: { a: {}, b: {} } } },
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
};

const challenge: Challenge = {
  input,
  title: 'Binary Tree',
  output: solution(input),
  description:
    "Write a function to count the total number of nodes in a binary tree. The tree will be a JavaScript object, which denotes child nodes via 'a' and 'b' fields.",
  example: `{} ⟶ 1, { a: {} } ⟶ 2, { a: {}, b: { a: {}, b: {} } } ⟶ 5`,
};

export = challenge;
