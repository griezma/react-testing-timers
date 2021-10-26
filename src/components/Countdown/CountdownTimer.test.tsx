import { act, render, screen } from '@testing-library/react';

import CountdownTimer from "./CountdownTimer";

describe('CountdownTimer component', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    })
    
    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });

    it('should render', () => {
        const { getByText } = render(
            <CountdownTimer countdownSecs={1}>
                {_ => "countdown timer"}
            </CountdownTimer>);

        getByText('countdown timer');

        advanceTime(1000);
    });

    it('should not render if expiration time is zero', () => {
        const { container } = render(
            <CountdownTimer countdownSecs={0}>
                {_ => <div>"countdown timer"</div>}
            </CountdownTimer>);

        // should not render anything
        expect(container.firstChild).toBeNull();
    });

    it('should properly unmount', () => {
        const { getByText, unmount, queryByText } = render(
            <CountdownTimer countdownSecs={1000}>
                {d => "countdown timer " + d}
            </CountdownTimer>);

        getByText('countdown timer 1000');
        unmount();
        expect(queryByText(/countdown timer/)).toBeNull();
    });

    it("should count down and vanish", async () => {
        const expireInfo = (remaining: number) => `Expires in ${remaining} seconds`;

        const { getByText, findByText, queryByText } = render(
            <CountdownTimer countdownSecs={5}>
                {expireInfo}
            </CountdownTimer>);
        
        // should countdown from 5 to 1
        getByText(expireInfo(5));
        advanceTime(4000);
        await findByText(expireInfo(5 - 4));

        // should vanish after 1 second
        getByText(/Expires in/);
        advanceTime(1000);
        expect(queryByText(/Expires in/)).toBeNull();
    });

    test("expiration time can be updated after countdown started", async () => {
        const expirationInfo = (remaining: number) => `Expires in ${remaining} seconds`;

        const { getByText, findByText, queryByText, rerender } = render(
            <CountdownTimer countdownSecs={5}>
                {remaining => <div>{expirationInfo(remaining)}</div>}
            </CountdownTimer>
        );

        // should countdown from 5 to 3
        getByText(expirationInfo(5));
        advanceTime(2000);
        await findByText(expirationInfo(5 - 2));

        // updating expiration time to 7
        rerender(
            <CountdownTimer countdownSecs={7}>
                {remaining => <div>{expirationInfo(remaining)}</div>}
            </CountdownTimer>
        );

        // should countdown from 7 to 4
        getByText(expirationInfo(7));
        advanceTime(3000);
        getByText(expirationInfo(7 - 3));

        // should vanish after 4 seconds
        getByText(/Expires in/);
        advanceTime(4000);
        expect(queryByText(/Expires in/)).toBeNull();
    });

});

function advanceTime(msToRun: number) {
    // @ts-ignore normal usage of act
    act(() => jest.advanceTimersByTime(msToRun));
}

