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
    jest.useRealTimers();
    jest.clearAllMocks();
});

// seems to not be working as designed?!
it.skip('calls the callback after 10 seconds via timerGame', async () => {
    const callback = jest.fn();
  
    timerGame(callback);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(callback).not.toBeCalled();
  
    jest.advanceTimersByTime(10000);

    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
});