declare const _default: {
    new (props: import("./KeyboardAwareHOC").KeyboardAwareHOCProps): {
        _rnkasv_keyboardView: any;
        callbacks: {
            onKeyboardWillShow?: import("react-native").EmitterSubscription | undefined;
            onKeyboardDidShow?: import("react-native").EmitterSubscription | undefined;
            onKeyboardWillHide?: import("react-native").EmitterSubscription | undefined;
            onKeyboardDidHide?: import("react-native").EmitterSubscription | undefined;
            onKeyboardWillChangeFrame?: import("react-native").EmitterSubscription | undefined;
            onKeyboardDidChangeFrame?: import("react-native").EmitterSubscription | undefined;
        };
        keyboardWillShowEvent: import("react-native").EmitterSubscription | undefined;
        keyboardWillHideEvent: import("react-native").EmitterSubscription | undefined;
        position: import("./KeyboardAwareHOC").ContentOffset;
        defaultResetScrollToCoords: {
            x: number;
            y: number;
        } | undefined;
        mountedComponent: boolean;
        handleOnScroll: Function | undefined;
        state: import("./KeyboardAwareHOC").KeyboardAwareHOCState;
        componentDidMount(): void;
        componentDidUpdate(prevProps: import("./KeyboardAwareHOC").KeyboardAwareHOCProps): void;
        componentWillUnmount(): void;
        getScrollResponder: () => any;
        scrollToPosition: (x: number, y: number, animated?: boolean) => void;
        scrollToEnd: (animated?: boolean) => void;
        scrollForExtraHeightOnAndroid: (extraHeight: number) => void;
        scrollToFocusedInput: (reactNode: any, extraHeight?: number | undefined, keyboardOpeningTime?: number | undefined) => void;
        scrollIntoView: (element: import("react").Component<{}, {}, any>, options?: import("./KeyboardAwareHOC").ScrollIntoViewOptions) => Promise<void>;
        _defaultGetScrollPosition: (parentLayout: import("./KeyboardAwareHOC").ElementLayout, childLayout: import("./KeyboardAwareHOC").ElementLayout, contentOffset: import("./KeyboardAwareHOC").ContentOffset) => import("./KeyboardAwareHOC").ScrollPosition;
        _measureElement: (element: import("react").Component<{}, {}, any>) => Promise<import("./KeyboardAwareHOC").ElementLayout>;
        _updateKeyboardSpace: (frames: {
            endCoordinates: {
                height: number;
                screenY: number;
            };
        }) => void;
        _resetKeyboardSpace: () => void;
        _scrollToFocusedInputWithNodeHandle: (nodeID: number, extraHeight?: number | undefined, keyboardOpeningTime?: number | undefined) => void;
        _handleOnScroll: (e: import("react-native").NativeSyntheticEvent<any> & {
            nativeEvent: {
                contentOffset: number;
            };
        }) => void;
        _handleRef: (ref: import("react").Component<{}, {}, any>) => void;
        update: () => void;
        render(): JSX.Element;
        context: any;
        setState<K extends "keyboardSpace">(state: import("./KeyboardAwareHOC").KeyboardAwareHOCState | ((prevState: Readonly<import("./KeyboardAwareHOC").KeyboardAwareHOCState>, props: Readonly<import("./KeyboardAwareHOC").KeyboardAwareHOCProps>) => import("./KeyboardAwareHOC").KeyboardAwareHOCState | Pick<import("./KeyboardAwareHOC").KeyboardAwareHOCState, K> | null) | Pick<import("./KeyboardAwareHOC").KeyboardAwareHOCState, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<import("./KeyboardAwareHOC").KeyboardAwareHOCProps> & Readonly<{
            children?: import("react").ReactNode;
        }>;
        refs: {
            [key: string]: import("react").ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<import("./KeyboardAwareHOC").KeyboardAwareHOCProps>, nextState: Readonly<import("./KeyboardAwareHOC").KeyboardAwareHOCState>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: import("react").ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<import("./KeyboardAwareHOC").KeyboardAwareHOCProps>, prevState: Readonly<import("./KeyboardAwareHOC").KeyboardAwareHOCState>): any;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<import("./KeyboardAwareHOC").KeyboardAwareHOCProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<import("./KeyboardAwareHOC").KeyboardAwareHOCProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<import("./KeyboardAwareHOC").KeyboardAwareHOCProps>, nextState: Readonly<import("./KeyboardAwareHOC").KeyboardAwareHOCState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<import("./KeyboardAwareHOC").KeyboardAwareHOCProps>, nextState: Readonly<import("./KeyboardAwareHOC").KeyboardAwareHOCState>, nextContext: any): void;
    };
    displayName: string;
    propTypes: {
        viewIsInsideTabBar: import("prop-types").Requireable<boolean>;
        resetScrollToCoords: import("prop-types").Requireable<import("prop-types").InferProps<{
            x: import("prop-types").Validator<number>;
            y: import("prop-types").Validator<number>;
        }>>;
        enableResetScrollToCoords: import("prop-types").Requireable<boolean>;
        enableAutomaticScroll: import("prop-types").Requireable<boolean>;
        extraHeight: import("prop-types").Requireable<number>;
        extraScrollHeight: import("prop-types").Requireable<number>;
        keyboardOpeningTime: import("prop-types").Requireable<number>;
        onScroll: import("prop-types").Requireable<object>;
        update: import("prop-types").Requireable<(...args: any[]) => any>;
        contentContainerStyle: import("prop-types").Requireable<any>;
        enableOnAndroid: import("prop-types").Requireable<boolean>;
        innerRef: import("prop-types").Requireable<(...args: any[]) => any>;
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
    contextType?: import("react").Context<any> | undefined;
} | ((Comp: import("react").ComponentType<{}>) => {
    new (props: import("./KeyboardAwareHOC").KeyboardAwareHOCProps): {
        _rnkasv_keyboardView: any;
        callbacks: {
            onKeyboardWillShow?: import("react-native").EmitterSubscription | undefined;
            onKeyboardDidShow?: import("react-native").EmitterSubscription | undefined;
            onKeyboardWillHide?: import("react-native").EmitterSubscription | undefined;
            onKeyboardDidHide?: import("react-native").EmitterSubscription | undefined;
            onKeyboardWillChangeFrame?: import("react-native").EmitterSubscription | undefined;
            onKeyboardDidChangeFrame?: import("react-native").EmitterSubscription | undefined;
        };
        keyboardWillShowEvent: import("react-native").EmitterSubscription | undefined;
        keyboardWillHideEvent: import("react-native").EmitterSubscription | undefined;
        position: import("./KeyboardAwareHOC").ContentOffset;
        defaultResetScrollToCoords: {
            x: number;
            y: number;
        } | undefined;
        mountedComponent: boolean;
        handleOnScroll: Function | undefined;
        state: import("./KeyboardAwareHOC").KeyboardAwareHOCState;
        componentDidMount(): void;
        componentDidUpdate(prevProps: import("./KeyboardAwareHOC").KeyboardAwareHOCProps): void;
        componentWillUnmount(): void;
        getScrollResponder: () => any;
        scrollToPosition: (x: number, y: number, animated?: boolean) => void;
        scrollToEnd: (animated?: boolean) => void;
        scrollForExtraHeightOnAndroid: (extraHeight: number) => void;
        scrollToFocusedInput: (reactNode: any, extraHeight?: number | undefined, keyboardOpeningTime?: number | undefined) => void;
        scrollIntoView: (element: import("react").Component<{}, {}, any>, options?: import("./KeyboardAwareHOC").ScrollIntoViewOptions) => Promise<void>;
        _defaultGetScrollPosition: (parentLayout: import("./KeyboardAwareHOC").ElementLayout, childLayout: import("./KeyboardAwareHOC").ElementLayout, contentOffset: import("./KeyboardAwareHOC").ContentOffset) => import("./KeyboardAwareHOC").ScrollPosition;
        _measureElement: (element: import("react").Component<{}, {}, any>) => Promise<import("./KeyboardAwareHOC").ElementLayout>;
        _updateKeyboardSpace: (frames: {
            endCoordinates: {
                height: number;
                screenY: number;
            };
        }) => void;
        _resetKeyboardSpace: () => void;
        _scrollToFocusedInputWithNodeHandle: (nodeID: number, extraHeight?: number | undefined, keyboardOpeningTime?: number | undefined) => void;
        _handleOnScroll: (e: import("react-native").NativeSyntheticEvent<any> & {
            nativeEvent: {
                contentOffset: number;
            };
        }) => void;
        _handleRef: (ref: import("react").Component<{}, {}, any>) => void;
        update: () => void;
        render(): JSX.Element;
        context: any;
        setState<K extends "keyboardSpace">(state: import("./KeyboardAwareHOC").KeyboardAwareHOCState | ((prevState: Readonly<import("./KeyboardAwareHOC").KeyboardAwareHOCState>, props: Readonly<import("./KeyboardAwareHOC").KeyboardAwareHOCProps>) => import("./KeyboardAwareHOC").KeyboardAwareHOCState | Pick<import("./KeyboardAwareHOC").KeyboardAwareHOCState, K> | null) | Pick<import("./KeyboardAwareHOC").KeyboardAwareHOCState, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<import("./KeyboardAwareHOC").KeyboardAwareHOCProps> & Readonly<{
            children?: import("react").ReactNode;
        }>;
        refs: {
            [key: string]: import("react").ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<import("./KeyboardAwareHOC").KeyboardAwareHOCProps>, nextState: Readonly<import("./KeyboardAwareHOC").KeyboardAwareHOCState>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: import("react").ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<import("./KeyboardAwareHOC").KeyboardAwareHOCProps>, prevState: Readonly<import("./KeyboardAwareHOC").KeyboardAwareHOCState>): any;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<import("./KeyboardAwareHOC").KeyboardAwareHOCProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<import("./KeyboardAwareHOC").KeyboardAwareHOCProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<import("./KeyboardAwareHOC").KeyboardAwareHOCProps>, nextState: Readonly<import("./KeyboardAwareHOC").KeyboardAwareHOCState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<import("./KeyboardAwareHOC").KeyboardAwareHOCProps>, nextState: Readonly<import("./KeyboardAwareHOC").KeyboardAwareHOCState>, nextContext: any): void;
    };
    displayName: string;
    propTypes: {
        viewIsInsideTabBar: import("prop-types").Requireable<boolean>;
        resetScrollToCoords: import("prop-types").Requireable<import("prop-types").InferProps<{
            x: import("prop-types").Validator<number>;
            y: import("prop-types").Validator<number>;
        }>>;
        enableResetScrollToCoords: import("prop-types").Requireable<boolean>;
        enableAutomaticScroll: import("prop-types").Requireable<boolean>;
        extraHeight: import("prop-types").Requireable<number>;
        extraScrollHeight: import("prop-types").Requireable<number>;
        keyboardOpeningTime: import("prop-types").Requireable<number>;
        onScroll: import("prop-types").Requireable<object>;
        update: import("prop-types").Requireable<(...args: any[]) => any>;
        contentContainerStyle: import("prop-types").Requireable<any>;
        enableOnAndroid: import("prop-types").Requireable<boolean>;
        innerRef: import("prop-types").Requireable<(...args: any[]) => any>;
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
    contextType?: import("react").Context<any> | undefined;
});
export default _default;
