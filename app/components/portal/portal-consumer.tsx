/* eslint-disable react/destructuring-assignment */
import {Component} from 'react';

import type {PortalMethods} from './portal-host';
import type React from 'react';

export type PortalConsumerProps = {
    manager: PortalMethods;
    children: React.ReactNode;
};

export default class PortalConsumer extends Component<PortalConsumerProps> {
    key: any;

    componentDidMount() {
        this.checkManager();
        this.key = this.props.manager.mount(this.props.children);
    }

    componentDidUpdate() {
        this.checkManager();

        this.props.manager.update(this.key, this.props.children);
    }

    componentWillUnmount() {
        this.checkManager();

        this.props.manager.unmount(this.key);
    }

    private checkManager() {
        if (!this.props.manager) {
            throw new Error(
                'Looks like you forgot to wrap your root component with `Provider` component'
            );
        }
    }

    render() {
        return null;
    }
}
