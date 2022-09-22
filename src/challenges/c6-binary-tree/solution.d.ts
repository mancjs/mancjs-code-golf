declare function play(root: Node): number;

declare interface Node {
  a?: Node;
  b?: Node;
  c?: any; // Evilness
}

export = play;
