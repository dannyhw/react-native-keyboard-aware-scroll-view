"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const prop_types_1 = __importDefault(require("prop-types"));
const react_native_1 = require("react-native");
const react_native_iphone_x_helper_1 = require("react-native-iphone-x-helper");
const _KAM_DEFAULT_TAB_BAR_HEIGHT = react_native_iphone_x_helper_1.isIphoneX() ? 83 : 49;
const _KAM_KEYBOARD_OPENING_TIME = 250;
const _KAM_EXTRA_HEIGHT = 75;
function getDisplayName(WrappedComponent) {
    return ((WrappedComponent &&
        (WrappedComponent.displayName || WrappedComponent.name)) ||
        "Component");
}
const ScrollIntoViewDefaultOptions = {
    enableOnAndroid: false,
    contentContainerStyle: undefined,
    enableAutomaticScroll: true,
    extraHeight: _KAM_EXTRA_HEIGHT,
    extraScrollHeight: 0,
    enableResetScrollToCoords: true,
    keyboardOpeningTime: _KAM_KEYBOARD_OPENING_TIME,
    viewIsInsideTabBar: false,
    // The ref prop name that will be passed to the wrapped component to obtain a ref
    // If your ScrollView is already wrapped, maybe the wrapper permit to get a ref
    // For example, with glamorous-native ScrollView, you should use "innerRef"
    refPropName: "ref",
    // Sometimes the ref you get is a ref to a wrapped view (ex: Animated.ScrollView)
    // We need access to the imperative API of a real native ScrollView so we need extraction logic
};
function KeyboardAwareHOC(ScrollableComponent, userOptions = ScrollIntoViewDefaultOptions) {
    var _a;
    const hocOptions = Object.assign(Object.assign({}, ScrollIntoViewDefaultOptions), userOptions);
    return _a = class extends react_1.default.Component {
            constructor(props) {
                super(props);
                this.mountedComponent = false;
                this.getScrollResponder = () => {
                    return (this._rnkasv_keyboardView &&
                        this._rnkasv_keyboardView.getScrollResponder &&
                        this._rnkasv_keyboardView.getScrollResponder());
                };
                this.scrollToPosition = (x, y, animated = true) => {
                    const responder = this.getScrollResponder();
                    responder && responder.scrollTo({ x, y, animated });
                };
                this.scrollToEnd = (animated = true) => {
                    const responder = this.getScrollResponder();
                    responder && responder.scrollToEnd({ animated });
                };
                this.scrollForExtraHeightOnAndroid = (extraHeight) => {
                    this.scrollToPosition(0, this.position.y + extraHeight, true);
                };
                /**
                 * @param keyboardOpeningTime: takes a different keyboardOpeningTime in consideration.
                 * @param extraHeight: takes an extra height in consideration.
                 */
                this.scrollToFocusedInput = (reactNode, extraHeight, keyboardOpeningTime) => {
                    if (extraHeight === undefined) {
                        extraHeight = this.props.extraHeight || 0;
                    }
                    if (keyboardOpeningTime === undefined) {
                        keyboardOpeningTime = this.props.keyboardOpeningTime || 0;
                    }
                    setTimeout(() => {
                        if (!this.mountedComponent) {
                            return;
                        }
                        const responder = this.getScrollResponder();
                        responder &&
                            responder.scrollResponderScrollNativeHandleToKeyboard(reactNode, extraHeight, true);
                    }, keyboardOpeningTime);
                };
                this.scrollIntoView = (element, options = {}) => __awaiter(this, void 0, void 0, function* () {
                    if (!this._rnkasv_keyboardView || !element) {
                        return;
                    }
                    const [parentLayout, childLayout] = yield Promise.all([
                        this._measureElement(this._rnkasv_keyboardView),
                        this._measureElement(element),
                    ]);
                    const getScrollPosition = (options === null || options === void 0 ? void 0 : options.getScrollPosition) || this._defaultGetScrollPosition;
                    const { x, y, animated } = getScrollPosition(parentLayout, childLayout, this.position);
                    this.scrollToPosition(x, y, animated);
                });
                this._defaultGetScrollPosition = (parentLayout, childLayout, contentOffset) => {
                    return {
                        x: 0,
                        y: Math.max(0, childLayout.y - parentLayout.y + contentOffset.y),
                        animated: true,
                    };
                };
                this._measureElement = (element) => {
                    const node = react_native_1.findNodeHandle(element);
                    if (!node) {
                        return Promise.reject(new Error("Element not found"));
                    }
                    return new Promise((resolve) => {
                        react_native_1.UIManager.measureInWindow(node, (x, y, width, height) => {
                            resolve({ x, y, width, height });
                        });
                    });
                };
                // Keyboard actions
                this._updateKeyboardSpace = (frames) => {
                    var _a;
                    // Automatically scroll to focused TextInput
                    if (this.props.enableAutomaticScroll) {
                        let keyboardSpace = frames.endCoordinates.height + ((_a = this.props.extraScrollHeight) !== null && _a !== void 0 ? _a : 0);
                        if (this.props.viewIsInsideTabBar) {
                            keyboardSpace -= _KAM_DEFAULT_TAB_BAR_HEIGHT;
                        }
                        this.setState({ keyboardSpace });
                        const currentlyFocusedField = react_native_1.TextInput.State.currentlyFocusedInput
                            ? react_native_1.findNodeHandle(react_native_1.TextInput.State.currentlyFocusedInput())
                            : react_native_1.TextInput.State.currentlyFocusedField();
                        const responder = this.getScrollResponder();
                        if (!currentlyFocusedField || !responder) {
                            return;
                        }
                        this._rnkasv_keyboardView.viewIsDescendantOf(currentlyFocusedField, responder.getInnerViewNode(), (isAncestor) => {
                            if (isAncestor) {
                                // Check if the TextInput will be hidden by the keyboard
                                this._rnkasv_keyboardView.measureInWindow(currentlyFocusedField, (x, y, width, height) => {
                                    var _a, _b;
                                    const textInputBottomPosition = y + height;
                                    const keyboardPosition = frames.endCoordinates.screenY;
                                    const totalExtraHeight = ((_a = this.props.extraScrollHeight) !== null && _a !== void 0 ? _a : 0) +
                                        ((_b = this.props.extraHeight) !== null && _b !== void 0 ? _b : 0);
                                    if (react_native_1.Platform.OS === "ios") {
                                        if (textInputBottomPosition >
                                            keyboardPosition - totalExtraHeight) {
                                            this._scrollToFocusedInputWithNodeHandle(currentlyFocusedField);
                                        }
                                    }
                                    else {
                                        // On android, the system would scroll the text input just
                                        // above the keyboard so we just neet to scroll the extra
                                        // height part
                                        if (textInputBottomPosition > keyboardPosition) {
                                            // Since the system already scrolled the whole view up
                                            // we should reduce that amount
                                            keyboardSpace =
                                                keyboardSpace -
                                                    (textInputBottomPosition - keyboardPosition);
                                            this.setState({ keyboardSpace });
                                            this.scrollForExtraHeightOnAndroid(totalExtraHeight);
                                        }
                                        else if (textInputBottomPosition >
                                            keyboardPosition - totalExtraHeight) {
                                            this.scrollForExtraHeightOnAndroid(totalExtraHeight -
                                                (keyboardPosition - textInputBottomPosition));
                                        }
                                    }
                                });
                            }
                        });
                    }
                    if (!this.props.resetScrollToCoords) {
                        if (!this.defaultResetScrollToCoords) {
                            this.defaultResetScrollToCoords = this.position;
                        }
                    }
                };
                this._resetKeyboardSpace = () => {
                    const keyboardSpace = this.props.viewIsInsideTabBar
                        ? _KAM_DEFAULT_TAB_BAR_HEIGHT
                        : 0;
                    this.setState({ keyboardSpace });
                    // Reset scroll position after keyboard dismissal
                    if (this.props.enableResetScrollToCoords === false) {
                        this.defaultResetScrollToCoords = undefined;
                        return;
                    }
                    else if (this.props.resetScrollToCoords) {
                        this.scrollToPosition(this.props.resetScrollToCoords.x, this.props.resetScrollToCoords.y, true);
                    }
                    else {
                        if (this.defaultResetScrollToCoords) {
                            this.scrollToPosition(this.defaultResetScrollToCoords.x, this.defaultResetScrollToCoords.y, true);
                            this.defaultResetScrollToCoords = undefined;
                        }
                        else {
                            this.scrollToPosition(0, 0, true);
                        }
                    }
                };
                this._scrollToFocusedInputWithNodeHandle = (nodeID, extraHeight, keyboardOpeningTime) => {
                    var _a, _b;
                    if (extraHeight === undefined) {
                        extraHeight = (_a = this.props.extraHeight) !== null && _a !== void 0 ? _a : 0;
                    }
                    const reactNode = react_native_1.findNodeHandle(nodeID);
                    this.scrollToFocusedInput(reactNode, extraHeight + ((_b = this.props.extraScrollHeight) !== null && _b !== void 0 ? _b : 0), keyboardOpeningTime !== undefined
                        ? keyboardOpeningTime
                        : this.props.keyboardOpeningTime || 0);
                };
                this._handleOnScroll = (e) => {
                    this.position = e.nativeEvent.contentOffset;
                };
                this._handleRef = (ref) => {
                    this._rnkasv_keyboardView = ref;
                    if (this.props.innerRef) {
                        this.props.innerRef(this._rnkasv_keyboardView);
                    }
                };
                this.update = () => {
                    const currentlyFocusedField = react_native_1.TextInput.State.currentlyFocusedInput
                        ? react_native_1.findNodeHandle(react_native_1.TextInput.State.currentlyFocusedInput())
                        : react_native_1.TextInput.State.currentlyFocusedField();
                    const responder = this.getScrollResponder();
                    if (!currentlyFocusedField || !responder) {
                        return;
                    }
                    this._scrollToFocusedInputWithNodeHandle(currentlyFocusedField);
                };
                this.keyboardWillShowEvent = undefined;
                this.keyboardWillHideEvent = undefined;
                this.callbacks = {};
                this.position = { x: 0, y: 0 };
                this.defaultResetScrollToCoords = undefined;
                const keyboardSpace = props.viewIsInsideTabBar
                    ? _KAM_DEFAULT_TAB_BAR_HEIGHT
                    : 0;
                this.state = { keyboardSpace };
            }
            componentDidMount() {
                this.mountedComponent = true;
                // Keyboard events
                if (react_native_1.Platform.OS === "ios") {
                    this.keyboardWillShowEvent = react_native_1.Keyboard.addListener("keyboardWillShow", this._updateKeyboardSpace);
                    this.keyboardWillHideEvent = react_native_1.Keyboard.addListener("keyboardWillHide", this._resetKeyboardSpace);
                }
                else if (react_native_1.Platform.OS === "android" && this.props.enableOnAndroid) {
                    this.keyboardWillShowEvent = react_native_1.Keyboard.addListener("keyboardDidShow", this._updateKeyboardSpace);
                    this.keyboardWillHideEvent = react_native_1.Keyboard.addListener("keyboardDidHide", this._resetKeyboardSpace);
                }
                if (this.props.onKeyboardWillShow) {
                    this.callbacks.onKeyboardWillShow = react_native_1.Keyboard.addListener("keyboardWillShow", this.props.onKeyboardWillShow);
                }
                if (this.props.onKeyboardDidShow) {
                    this.callbacks.onKeyboardDidShow = react_native_1.Keyboard.addListener("keyboardDidShow", this.props.onKeyboardDidShow);
                }
                if (this.props.onKeyboardWillHide) {
                    this.callbacks.onKeyboardWillHide = react_native_1.Keyboard.addListener("keyboardWillHide", this.props.onKeyboardWillHide);
                }
                if (this.props.onKeyboardDidHide) {
                    this.callbacks.onKeyboardDidHide = react_native_1.Keyboard.addListener("keyboardDidHide", this.props.onKeyboardDidHide);
                }
                if (this.props.onKeyboardWillChangeFrame) {
                    this.callbacks.onKeyboardWillChangeFrame = react_native_1.Keyboard.addListener("keyboardWillChangeFrame", this.props.onKeyboardWillChangeFrame);
                }
                if (this.props.onKeyboardDidChangeFrame) {
                    this.callbacks.onKeyboardDidChangeFrame = react_native_1.Keyboard.addListener("keyboardDidChangeFrame", this.props.onKeyboardDidChangeFrame);
                }
            }
            componentDidUpdate(prevProps) {
                if (this.props.viewIsInsideTabBar !== prevProps.viewIsInsideTabBar) {
                    const keyboardSpace = this.props.viewIsInsideTabBar
                        ? _KAM_DEFAULT_TAB_BAR_HEIGHT
                        : 0;
                    if (this.state.keyboardSpace !== keyboardSpace) {
                        this.setState({ keyboardSpace });
                    }
                }
            }
            componentWillUnmount() {
                this.mountedComponent = false;
                this.keyboardWillShowEvent && this.keyboardWillShowEvent.remove();
                this.keyboardWillHideEvent && this.keyboardWillHideEvent.remove();
                Object.values(this.callbacks).forEach((callback) => callback.remove());
            }
            render() {
                const { enableOnAndroid, contentContainerStyle, onScroll } = this.props;
                let newContentContainerStyle;
                if (react_native_1.Platform.OS === "android" && enableOnAndroid) {
                    newContentContainerStyle = [...contentContainerStyle].concat({
                        paddingBottom: ((contentContainerStyle || {}).paddingBottom || 0) +
                            this.state.keyboardSpace,
                    });
                }
                const refProps = { [hocOptions.refPropName]: this._handleRef };
                return (<ScrollableComponent {...refProps} keyboardDismissMode="interactive" contentInset={{ bottom: this.state.keyboardSpace }} automaticallyAdjustContentInsets={false} showsVerticalScrollIndicator={true} scrollEventThrottle={1} {...this.props} contentContainerStyle={newContentContainerStyle || contentContainerStyle} keyboardSpace={this.state.keyboardSpace} getScrollResponder={this.getScrollResponder} scrollToPosition={this.scrollToPosition} scrollToEnd={this.scrollToEnd} scrollForExtraHeightOnAndroid={this.scrollForExtraHeightOnAndroid} scrollToFocusedInput={this.scrollToFocusedInput} scrollIntoView={this.scrollIntoView} resetKeyboardSpace={this._resetKeyboardSpace} handleOnScroll={this._handleOnScroll} update={this.update} 
                // @ts-ignore
                onScroll={react_native_1.Animated.forkEvent(onScroll, this._handleOnScroll)}/>);
            }
        },
        _a.displayName = `KeyboardAware${getDisplayName(ScrollableComponent)}`,
        _a.propTypes = {
            viewIsInsideTabBar: prop_types_1.default.bool,
            resetScrollToCoords: prop_types_1.default.shape({
                x: prop_types_1.default.number.isRequired,
                y: prop_types_1.default.number.isRequired,
            }),
            enableResetScrollToCoords: prop_types_1.default.bool,
            enableAutomaticScroll: prop_types_1.default.bool,
            extraHeight: prop_types_1.default.number,
            extraScrollHeight: prop_types_1.default.number,
            keyboardOpeningTime: prop_types_1.default.number,
            onScroll: prop_types_1.default.oneOfType([
                prop_types_1.default.func,
                prop_types_1.default.object, // Animated.event listener
            ]),
            update: prop_types_1.default.func,
            contentContainerStyle: prop_types_1.default.any,
            enableOnAndroid: prop_types_1.default.bool,
            innerRef: prop_types_1.default.func,
            onKeyboardWillShow: Function,
            onKeyboardDidShow: Function,
            onKeyboardWillHide: Function,
            onKeyboardDidHide: Function,
            onKeyboardWillChangeFrame: Function,
            onKeyboardDidChangeFrame: Function,
        },
        // HOC options are used to init default props, so that these options can be overriden with component props
        _a.defaultProps = {
            enableAutomaticScroll: hocOptions.enableAutomaticScroll,
            extraHeight: hocOptions.extraHeight,
            extraScrollHeight: hocOptions.extraScrollHeight,
            enableResetScrollToCoords: hocOptions.enableResetScrollToCoords,
            keyboardOpeningTime: hocOptions.keyboardOpeningTime,
            viewIsInsideTabBar: hocOptions.viewIsInsideTabBar,
            enableOnAndroid: hocOptions.enableOnAndroid,
        },
        _a;
}
// Allow to pass options, without breaking change, and curried for composition
// listenToKeyboardEvents(ScrollView);
// listenToKeyboardEvents(options)(Comp);
const listenToKeyboardEvents = (configOrComp) => {
    if (typeof configOrComp === "object" && !configOrComp.displayName) {
        return (Comp) => KeyboardAwareHOC(Comp, configOrComp);
    }
    else {
        return KeyboardAwareHOC(configOrComp);
    }
};
exports.default = listenToKeyboardEvents;
