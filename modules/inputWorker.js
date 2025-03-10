self.onmessage = function (event) {
    const { x, y } = event.data;

    // Send back the position as fast as possible
    self.postMessage({ x, y });
};