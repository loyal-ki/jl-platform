/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
import React, {Component} from 'react';

import PortalConsumer from './portal-consumer';
import PortalHost, {portal, PortalContext} from './portal-host';

export type PortalProps = {
    children?: React.ReactNode;
};

class Portal extends Component<PortalProps> {
    static Host = PortalHost;

    static add = portal.add;

    static remove = portal.remove;

    render() {
        const {children} = this.props;

        return (
            <PortalContext.Consumer>
                {manager => <PortalConsumer manager={manager}>{children}</PortalConsumer>}
            </PortalContext.Consumer>
        );
    }
}

export default Portal;
