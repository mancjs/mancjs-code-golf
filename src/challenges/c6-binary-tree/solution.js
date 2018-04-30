function play(root) {
  // return JSON.stringify(root).split('').reduce((count, char) => char === '{' ? count + 1 : count, 0);

  function countNode(node) {
    if (node) {
      return 1 + countNode(node.a) + countNode(node.b);
    }

    return 0;
  };

  return countNode(root);
}

if (typeof module !== 'undefined') {
  module.exports = play;
}
