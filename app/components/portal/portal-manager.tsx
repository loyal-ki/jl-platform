/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/state-in-constructor */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-class-component-methods */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import React, {PureComponent} from 'react';
import {View, StyleSheet} from 'react-native';

export type State = {
    portals: Array<{
        key: number;
        children: React.ReactNode;
    }>;
};

export default class PortalManager extends PureComponent<{}, State> {
    state: State = {
        portals: [],
    };

    mount = (key: number, children: React.ReactNode) => {
        this.setState(state => ({
            portals: [...state.portals, {key, children}],
        }));
    };

    update = (key: number, children: React.ReactNode) =>
        this.setState(state => ({
            portals: state.portals.map(item => {
                if (item.key === key) {
                    return {...item, children};
                }
                return item;
            }),
        }));

    unmount = (key: number) =>
        this.setState(state => ({
            portals: state.portals.filter(item => item.key !== key),
        }));

    render() {
        return this.state.portals.map(({key, children}) => (
            <View
                key={key}
                collapsable={false}
                pointerEvents="box-none"
                style={StyleSheet.absoluteFill}>
                {children}
            </View>
        ));
    }
}
