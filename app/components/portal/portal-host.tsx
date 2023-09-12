/* eslint-disable max-classes-per-file */
/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/static-property-placement */
/* eslint-disable default-case */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/destructuring-assignment */
import React, {createContext, Component} from 'react';
import {DeviceEventEmitter, NativeEventEmitter, StyleSheet, View} from 'react-native';

import PortalManager from './portal-manager';

import type {EmitterSubscription} from 'react-native';

export type PortalHostProps = {
    children: React.ReactNode;
};

export type Operation =
    | {type: 'mount'; key: number; children: React.ReactNode}
    | {type: 'update'; key: number; children: React.ReactNode}
    | {type: 'unmount'; key: number};

export type PortalMethods = {
    mount: (children: React.ReactNode) => number;
    update: (key: number, children: React.ReactNode) => void;
    unmount: (key: number) => void;
};

export const PortalContext = createContext<PortalMethods>(null as any);
// events
const addType = 'REACT_NATIVE_XIAOSHU_ADD_PORTAL';
const removeType = 'REACT_NATIVE_XIAOSHU_REMOVE_PORTAL';
// fix react native web does not support DeviceEventEmitter
const TopViewEventEmitter = DeviceEventEmitter || new NativeEventEmitter();

class PortalGuard {
    private nextKey = 10000;

    add = (e: React.ReactNode) => {
        const key = this.nextKey++;
        TopViewEventEmitter.emit(addType, e, key);
        return key;
    };

    remove = (key: number) => TopViewEventEmitter.emit(removeType, key);
}

export const portal = new PortalGuard();

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default class PortalHost extends Component<PortalHostProps> {
    static displayName = 'Portal.Host';

    nextKey = 0;

    queue: Operation[] = [];

    manager: PortalManager | undefined | null;

    addTypeEmitter!: EmitterSubscription;

    removeTypeEmitter!: EmitterSubscription;

    componentDidMount() {
        const {manager} = this;
        const {queue} = this;

        this.addTypeEmitter = TopViewEventEmitter.addListener(addType, this.mount);
        this.removeTypeEmitter = TopViewEventEmitter.addListener(removeType, this.unmount);

        while (queue.length && manager) {
            const action = queue.pop();
            if (!action) {
                continue;
            }
            // tslint:disable-next-line:switch-default
            switch (action.type) {
                case 'mount':
                    manager.mount(action.key, action.children);
                    break;
                case 'update':
                    manager.update(action.key, action.children);
                    break;
                case 'unmount':
                    manager.unmount(action.key);
                    break;
            }
        }
    }

    componentWillUnmount() {
        if (this.addTypeEmitter.remove) {
            this.addTypeEmitter.remove();
        } else {
            // @ts-ignore
            TopViewEventEmitter.removeListener?.(addType, this.mount);
        }

        if (this.removeTypeEmitter.remove) {
            this.removeTypeEmitter.remove();
        } else {
            // @ts-ignore
            TopViewEventEmitter.removeListener?.(removeType, this.unmount);
        }
    }

    setManager = (manager?: PortalManager | undefined | null) => {
        this.manager = manager;
    };

    mount = (children: React.ReactNode, _key?: number) => {
        const key = _key || this.nextKey++;
        if (this.manager) {
            this.manager.mount(key, children);
        } else {
            this.queue.push({type: 'mount', key, children});
        }

        return key;
    };

    update = (key: number, children: React.ReactNode) => {
        if (this.manager) {
            this.manager.update(key, children);
        } else {
            const op: Operation = {type: 'mount', key, children};
            const index = this.queue.findIndex(
                o => o.type === 'mount' || (o.type === 'update' && o.key === key)
            );

            if (index > -1) {
                this.queue[index] = op;
            } else {
                this.queue.push(op);
            }
        }
    };

    unmount = (key: number) => {
        if (this.manager) {
            this.manager.unmount(key);
        } else {
            this.queue.push({type: 'unmount', key});
        }
    };

    render() {
        return (
            <PortalContext.Provider
                value={{
                    mount: this.mount,
                    update: this.update,
                    unmount: this.unmount,
                }}>
                {/* Need collapsable=false here to clip the elevations, otherwise they appear above Portal components */}
                <View style={styles.container} collapsable={false}>
                    {this.props.children}
                </View>
                <PortalManager ref={this.setManager} />
            </PortalContext.Provider>
        );
    }
}
