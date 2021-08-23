import React from "react";
import PropTypes from "prop-types";
import { KeyboardEventListener, EmitterSubscription, NativeSyntheticEvent, StyleProp, ViewStyle } from "react-native";
export declare type KeyboardAwareHOCProps = {
    viewIsInsideTabBar?: boolean;
    resetScrollToCoords?: {
        x: number;
        y: number;
    };
    enableResetScrollToCoords?: boolean;
    enableAutomaticScroll?: boolean;
    extraHeight?: number;
    extraScrollHeight?: number;
    keyboardOpeningTime?: number;
    onScroll?: Function;
    update?: Function;
    contentContainerStyle?: any;
    enableOnAndroid?: boolean;
    innerRef?: Function;
    onKeyboardWillShow: KeyboardEventListener;
    onKeyboardDidShow: KeyboardEventListener;
    onKeyboardWillHide: KeyboardEventListener;
    onKeyboardDidHide: KeyboardEventListener;
    onKeyboardWillChangeFrame: KeyboardEventListener;
    onKeyboardDidChangeFrame: KeyboardEventListener;
};
export declare type KeyboardAwareHOCState = {
    keyboardSpace: number;
};
export declare type ElementLayout = {
    x: number;
    y: number;
    width: number;
    height: number;
};
export declare type ContentOffset = {
    x: number;
    y: number;
};
export declare type ScrollPosition = {
    x: number;
    y: number;
    animated: boolean;
};
export declare type ScrollIntoViewOptions = {
    getScrollPosition?: (parentLayout: ElementLayout, childLayout: ElementLayout, contentOffset: ContentOffset) => ScrollPosition;
};
export declare type KeyboardAwareHOCOptions = {
    enableOnAndroid: boolean;
    contentContainerStyle: StyleProp<ViewStyle>;
    enableAutomaticScroll: boolean;
    extraHeight: number;
    extraScrollHeight: number;
    enableResetScrollToCoords: boolean;
    keyboardOpeningTime: number;
    viewIsInsideTabBar: boolean;
    refPropName: string;
};
declare const listenToKeyboardEvents: (configOrComp: any) => {
    new (props: KeyboardAwareHOCProps): {
        _rnkasv_keyboardView: any;
        callbacks: {
            onKeyboardWillShow?: EmitterSubscription;
            onKeyboardDidShow?: EmitterSubscription;
            onKeyboardWillHide?: EmitterSubscription;
            onKeyboardDidHide?: EmitterSubscription;
            onKeyboardWillChangeFrame?: EmitterSubscription;
            onKeyboardDidChangeFrame?: EmitterSubscription;
        };
        keyboardWillShowEvent: EmitterSubscription | undefined;
        keyboardWillHideEvent: EmitterSubscription | undefined;
        position: ContentOffset;
        defaultResetScrollToCoords: {
            x: number;
            y: number;
        } | undefined;
        mountedComponent: boolean;
        handleOnScroll: Function | undefined;
        state: KeyboardAwareHOCState;
        componentDidMount(): void;
        componentDidUpdate(prevProps: KeyboardAwareHOCProps): void;
        componentWillUnmount(): void;
        getScrollResponder: () => any;
        scrollToPosition: (x: number, y: number, animated?: boolean) => void;
        scrollToEnd: (animated?: boolean) => void;
        scrollForExtraHeightOnAndroid: (extraHeight: number) => void;
        /**
         * @param keyboardOpeningTime: takes a different keyboardOpeningTime in consideration.
         * @param extraHeight: takes an extra height in consideration.
         */
        scrollToFocusedInput: (reactNode: any, extraHeight?: number | undefined, keyboardOpeningTime?: number | undefined) => void;
        scrollIntoView: (element: React.Component, options?: ScrollIntoViewOptions) => Promise<void>;
        _defaultGetScrollPosition: (parentLayout: ElementLayout, childLayout: ElementLayout, contentOffset: ContentOffset) => ScrollPosition;
        _measureElement: (element: React.Component) => Promise<ElementLayout>;
        _updateKeyboardSpace: (frames: {
            endCoordinates: {
                height: number;
                screenY: number;
            };
        }) => void;
        _resetKeyboardSpace: () => void;
        _scrollToFocusedInputWithNodeHandle: (nodeID: number, extraHeight?: number | undefined, keyboardOpeningTime?: number | undefined) => void;
        _handleOnScroll: (e: NativeSyntheticEvent<any> & {
            nativeEvent: {
                contentOffset: number;
            };
        }) => void;
        _handleRef: (ref: React.Component) => void;
        update: () => void;
        render(): JSX.Element;
        context: any;
        setState<K extends "keyboardSpace">(state: KeyboardAwareHOCState | ((prevState: Readonly<KeyboardAwareHOCState>, props: Readonly<KeyboardAwareHOCProps>) => KeyboardAwareHOCState | Pick<KeyboardAwareHOCState, K> | null) | Pick<KeyboardAwareHOCState, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<KeyboardAwareHOCProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<KeyboardAwareHOCProps>, nextState: Readonly<KeyboardAwareHOCState>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<KeyboardAwareHOCProps>, prevState: Readonly<KeyboardAwareHOCState>): any;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<KeyboardAwareHOCProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<KeyboardAwareHOCProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<KeyboardAwareHOCProps>, nextState: Readonly<KeyboardAwareHOCState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<KeyboardAwareHOCProps>, nextState: Readonly<KeyboardAwareHOCState>, nextContext: any): void;
    };
    displayName: string;
    propTypes: {
        viewIsInsideTabBar: PropTypes.Requireable<boolean>;
        resetScrollToCoords: PropTypes.Requireable<PropTypes.InferProps<{
            x: PropTypes.Validator<number>;
            y: PropTypes.Validator<number>;
        }>>;
        enableResetScrollToCoords: PropTypes.Requireable<boolean>;
        enableAutomaticScroll: PropTypes.Requireable<boolean>;
        extraHeight: PropTypes.Requireable<number>;
        extraScrollHeight: PropTypes.Requireable<number>;
        keyboardOpeningTime: PropTypes.Requireable<number>;
        onScroll: PropTypes.Requireable<object>;
        update: PropTypes.Requireable<(...args: any[]) => any>;
        contentContainerStyle: PropTypes.Requireable<any>;
        enableOnAndroid: PropTypes.Requireable<boolean>;
        innerRef: PropTypes.Requireable<(...args: any[]) => any>;
        onKeyboardWillShow: FunctionConstructor;
        onKeyboardDidShow: FunctionConstructor;
        onKeyboardWillHide: FunctionConstructor;
        onKeyboardDidHide: FunctionConstructor;
        onKeyboardWillChangeFrame: FunctionConstructor;
        onKeyboardDidChangeFrame: FunctionConstructor;
    };
    defaultProps: {
        enableAutomaticScroll: boolean;
        extraHeight: number;
        extraScrollHeight: number;
        enableResetScrollToCoords: boolean;
        keyboardOpeningTime: number;
        viewIsInsideTabBar: boolean;
        enableOnAndroid: boolean;
    };
    contextType?: React.Context<any> | undefined;
} | ((Comp: React.ComponentType) => {
    new (props: KeyboardAwareHOCProps): {
        _rnkasv_keyboardView: any;
        callbacks: {
            onKeyboardWillShow?: EmitterSubscription;
            onKeyboardDidShow?: EmitterSubscription;
            onKeyboardWillHide?: EmitterSubscription;
            onKeyboardDidHide?: EmitterSubscription;
            onKeyboardWillChangeFrame?: EmitterSubscription;
            onKeyboardDidChangeFrame?: EmitterSubscription;
        };
        keyboardWillShowEvent: EmitterSubscription | undefined;
        keyboardWillHideEvent: EmitterSubscription | undefined;
        position: ContentOffset;
        defaultResetScrollToCoords: {
            x: number;
            y: number;
        } | undefined;
        mountedComponent: boolean;
        handleOnScroll: Function | undefined;
        state: KeyboardAwareHOCState;
        componentDidMount(): void;
        componentDidUpdate(prevProps: KeyboardAwareHOCProps): void;
        componentWillUnmount(): void;
        getScrollResponder: () => any;
        scrollToPosition: (x: number, y: number, animated?: boolean) => void;
        scrollToEnd: (animated?: boolean) => void;
        scrollForExtraHeightOnAndroid: (extraHeight: number) => void;
        /**
         * @param keyboardOpeningTime: takes a different keyboardOpeningTime in consideration.
         * @param extraHeight: takes an extra height in consideration.
         */
        scrollToFocusedInput: (reactNode: any, extraHeight?: number | undefined, keyboardOpeningTime?: number | undefined) => void;
        scrollIntoView: (element: React.Component, options?: ScrollIntoViewOptions) => Promise<void>;
        _defaultGetScrollPosition: (parentLayout: ElementLayout, childLayout: ElementLayout, contentOffset: ContentOffset) => ScrollPosition;
        _measureElement: (element: React.Component) => Promise<ElementLayout>;
        _updateKeyboardSpace: (frames: {
            endCoordinates: {
                height: number;
                screenY: number;
            };
        }) => void;
        _resetKeyboardSpace: () => void;
        _scrollToFocusedInputWithNodeHandle: (nodeID: number, extraHeight?: number | undefined, keyboardOpeningTime?: number | undefined) => void;
        _handleOnScroll: (e: NativeSyntheticEvent<any> & {
            nativeEvent: {
                contentOffset: number;
            };
        }) => void;
        _handleRef: (ref: React.Component) => void;
        update: () => void;
        render(): JSX.Element;
        context: any;
        setState<K extends "keyboardSpace">(state: KeyboardAwareHOCState | ((prevState: Readonly<KeyboardAwareHOCState>, props: Readonly<KeyboardAwareHOCProps>) => KeyboardAwareHOCState | Pick<KeyboardAwareHOCState, K> | null) | Pick<KeyboardAwareHOCState, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<KeyboardAwareHOCProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<KeyboardAwareHOCProps>, nextState: Readonly<KeyboardAwareHOCState>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<KeyboardAwareHOCProps>, prevState: Readonly<KeyboardAwareHOCState>): any;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<KeyboardAwareHOCProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<KeyboardAwareHOCProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<KeyboardAwareHOCProps>, nextState: Readonly<KeyboardAwareHOCState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<KeyboardAwareHOCProps>, nextState: Readonly<KeyboardAwareHOCState>, nextContext: any): void;
    };
    displayName: string;
    propTypes: {
        viewIsInsideTabBar: PropTypes.Requireable<boolean>;
        resetScrollToCoords: PropTypes.Requireable<PropTypes.InferProps<{
            x: PropTypes.Validator<number>;
            y: PropTypes.Validator<number>;
        }>>;
        enableResetScrollToCoords: PropTypes.Requireable<boolean>;
        enableAutomaticScroll: PropTypes.Requireable<boolean>;
        extraHeight: PropTypes.Requireable<number>;
        extraScrollHeight: PropTypes.Requireable<number>;
        keyboardOpeningTime: PropTypes.Requireable<number>;
        onScroll: PropTypes.Requireable<object>;
        update: PropTypes.Requireable<(...args: any[]) => any>;
        contentContainerStyle: PropTypes.Requireable<any>;
        enableOnAndroid: PropTypes.Requireable<boolean>;
        innerRef: PropTypes.Requireable<(...args: any[]) => any>;
        onKeyboardWillShow: FunctionConstructor;
        onKeyboardDidShow: FunctionConstructor;
        onKeyboardWillHide: FunctionConstructor;
        onKeyboardDidHide: FunctionConstructor;
        onKeyboardWillChangeFrame: FunctionConstructor;
        onKeyboardDidChangeFrame: FunctionConstructor;
    };
    defaultProps: {
        enableAutomaticScroll: boolean;
        extraHeight: number;
        extraScrollHeight: number;
        enableResetScrollToCoords: boolean;
        keyboardOpeningTime: number;
        viewIsInsideTabBar: boolean;
        enableOnAndroid: boolean;
    };
    contextType?: React.Context<any> | undefined;
});
export default listenToKeyboardEvents;
