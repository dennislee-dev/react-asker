function createClientXY(x, y) {
  return {clientX: x, clientY: y};
}

function createPageXY(x, y) {
  return {pageX: x, pageY: y};
}

export function createStartTouchEventObject({x = 0, y = 0}) {
  return {touches: [createClientXY(x, y)]};
}

export function createMoveTouchEventObject({x = 0, y = 0}, isPage) {
  return {changedTouches: [isPage ?createPageXY(x, y) : createClientXY(x, y)]};
}
