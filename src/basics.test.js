function timerGame(callback) {
    setTimeout(() => {
      callback && callback();
    }, 10000);
}

beforeAll(() => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');
})

afterAll(() => {
    // jest.useRealTimers();
    // jest.clearAllMocks();
});

// seems to not be working as designed?!
it.skip('calls the callback after 10 seconds via timerGame', () => {
    const callback = jest.fn();
  
    timerGame(callback);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(callback).not.toBeCalled();
  
    jest.advanceTimersByTime(10000);

    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
});

// here again, seems to not be working as designed?!
it.skip('execution order', async () => {
    const order = [];
    order.push('1');
    setTimeout(() => { order.push('6'); }, 0);
    const promise = new Promise(resolve => {
      order.push('2');
      resolve();
    }).then(() => {
      order.push('4');
    });
    order.push('3');
    await promise;
    order.push('5');
    jest.advanceTimersByTime(0);
    expect(order).toEqual([ '1', '2', '3', '4', '5', '6' ]);
  });