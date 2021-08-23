import React, { ReactNode } from "react";
import PropTypes from "prop-types";
import {
  Keyboard,
  Platform,
  UIManager,
  TextInput,
  findNodeHandle,
  Animated,
  KeyboardEventListener,
  EmitterSubscription,
  NativeSyntheticEvent,
  StyleProp,
  ViewStyle,
} from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import type { KeyboardAwareInterface } from "./KeyboardAwareInterface";

const _KAM_DEFAULT_TAB_BAR_HEIGHT: number = isIphoneX() ? 83 : 49;
const _KAM_KEYBOARD_OPENING_TIME: number = 250;
const _KAM_EXTRA_HEIGHT: number = 75;

export type KeyboardAwareHOCProps = {
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
  children: ReactNode[] | ReactNode;
};
export type KeyboardAwareHOCState = {
  keyboardSpace: number;
};

export type ElementLayout = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type ContentOffset = {
  x: number;
  y: number;
};

export type ScrollPosition = {
  x: number;
  y: number;
  animated: boolean;
};

export type ScrollIntoViewOptions = {
  getScrollPosition?: (
    parentLayout: ElementLayout,
    childLayout: ElementLayout,
    contentOffset: ContentOffset
  ) => ScrollPosition;
};

export type KeyboardAwareHOCOptions = {
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

function getDisplayName(WrappedComponent: React.ComponentType<any>) {
  return (
    (WrappedComponent &&
      (WrappedComponent.displayName || WrappedComponent.name)) ||
    "Component"
  );
}

const ScrollIntoViewDefaultOptions: KeyboardAwareHOCOptions = {
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

function KeyboardAwareHOC(
  ScrollableComponent: React.ComponentType<any>,
  userOptions: KeyboardAwareHOCOptions = ScrollIntoViewDefaultOptions
) {
  const hocOptions: KeyboardAwareHOCOptions = {
    ...ScrollIntoViewDefaultOptions,
    ...userOptions,
  };

  return class
    extends React.Component<KeyboardAwareHOCProps, KeyboardAwareHOCState>
    implements KeyboardAwareInterface
  {
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
    defaultResetScrollToCoords: { x: number; y: number } | undefined;
    mountedComponent: boolean = false;
    handleOnScroll: Function | undefined;
    state: KeyboardAwareHOCState;
    static displayName = `KeyboardAware${getDisplayName(ScrollableComponent)}`;

    static propTypes = {
      viewIsInsideTabBar: PropTypes.bool,
      resetScrollToCoords: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
      }),
      enableResetScrollToCoords: PropTypes.bool,
      enableAutomaticScroll: PropTypes.bool,
      extraHeight: PropTypes.number,
      extraScrollHeight: PropTypes.number,
      keyboardOpeningTime: PropTypes.number,
      onScroll: PropTypes.oneOfType([
        PropTypes.func, // Normal listener
        PropTypes.object, // Animated.event listener
      ]),
      update: PropTypes.func,
      contentContainerStyle: PropTypes.any,
      enableOnAndroid: PropTypes.bool,
      innerRef: PropTypes.func,
      onKeyboardWillShow: Function,
      onKeyboardDidShow: Function,
      onKeyboardWillHide: Function,
      onKeyboardDidHide: Function,
      onKeyboardWillChangeFrame: Function,
      onKeyboardDidChangeFrame: Function,
      children: PropTypes.element,
    };

    // HOC options are used to init default props, so that these options can be overriden with component props
    static defaultProps = {
      enableAutomaticScroll: hocOptions.enableAutomaticScroll,
      extraHeight: hocOptions.extraHeight,
      extraScrollHeight: hocOptions.extraScrollHeight,
      enableResetScrollToCoords: hocOptions.enableResetScrollToCoords,
      keyboardOpeningTime: hocOptions.keyboardOpeningTime,
      viewIsInsideTabBar: hocOptions.viewIsInsideTabBar,
      enableOnAndroid: hocOptions.enableOnAndroid,
    };

    constructor(props: KeyboardAwareHOCProps) {
      super(props);
      this.keyboardWillShowEvent = undefined;
      this.keyboardWillHideEvent = undefined;
      this.callbacks = {};
      this.position = { x: 0, y: 0 };
      this.defaultResetScrollToCoords = undefined;
      const keyboardSpace: number = props.viewIsInsideTabBar
        ? _KAM_DEFAULT_TAB_BAR_HEIGHT
        : 0;
      this.state = { keyboardSpace };
    }

    componentDidMount() {
      this.mountedComponent = true;
      // Keyboard events
      if (Platform.OS === "ios") {
        this.keyboardWillShowEvent = Keyboard.addListener(
          "keyboardWillShow",
          this._updateKeyboardSpace
        );
        this.keyboardWillHideEvent = Keyboard.addListener(
          "keyboardWillHide",
          this._resetKeyboardSpace
        );
      } else if (Platform.OS === "android" && this.props.enableOnAndroid) {
        this.keyboardWillShowEvent = Keyboard.addListener(
          "keyboardDidShow",
          this._updateKeyboardSpace
        );
        this.keyboardWillHideEvent = Keyboard.addListener(
          "keyboardDidHide",
          this._resetKeyboardSpace
        );
      }
      if (this.props.onKeyboardWillShow) {
        this.callbacks.onKeyboardWillShow = Keyboard.addListener(
          "keyboardWillShow",
          this.props.onKeyboardWillShow
        );
      }
      if (this.props.onKeyboardDidShow) {
        this.callbacks.onKeyboardDidShow = Keyboard.addListener(
          "keyboardDidShow",
          this.props.onKeyboardDidShow
        );
      }
      if (this.props.onKeyboardWillHide) {
        this.callbacks.onKeyboardWillHide = Keyboard.addListener(
          "keyboardWillHide",
          this.props.onKeyboardWillHide
        );
      }
      if (this.props.onKeyboardDidHide) {
        this.callbacks.onKeyboardDidHide = Keyboard.addListener(
          "keyboardDidHide",
          this.props.onKeyboardDidHide
        );
      }
      if (this.props.onKeyboardWillChangeFrame) {
        this.callbacks.onKeyboardWillChangeFrame = Keyboard.addListener(
          "keyboardWillChangeFrame",
          this.props.onKeyboardWillChangeFrame
        );
      }
      if (this.props.onKeyboardDidChangeFrame) {
        this.callbacks.onKeyboardDidChangeFrame = Keyboard.addListener(
          "keyboardDidChangeFrame",
          this.props.onKeyboardDidChangeFrame
        );
      }
    }

    componentDidUpdate(prevProps: KeyboardAwareHOCProps) {
      if (this.props.viewIsInsideTabBar !== prevProps.viewIsInsideTabBar) {
        const keyboardSpace: number = this.props.viewIsInsideTabBar
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
      Object.values(this.callbacks).forEach((callback: EmitterSubscription) =>
        callback.remove()
      );
    }

    getScrollResponder = () => {
      return (
        this._rnkasv_keyboardView &&
        this._rnkasv_keyboardView.getScrollResponder &&
        this._rnkasv_keyboardView.getScrollResponder()
      );
    };

    scrollToPosition = (x: number, y: number, animated: boolean = true) => {
      const responder = this.getScrollResponder();
      responder && responder.scrollTo({ x, y, animated });
    };

    scrollToEnd = (animated: boolean = true) => {
      const responder = this.getScrollResponder();
      responder && responder.scrollToEnd({ animated });
    };

    scrollForExtraHeightOnAndroid = (extraHeight: number) => {
      this.scrollToPosition(0, this.position.y + extraHeight, true);
    };

    /**
     * @param keyboardOpeningTime: takes a different keyboardOpeningTime in consideration.
     * @param extraHeight: takes an extra height in consideration.
     */
    scrollToFocusedInput = (
      reactNode: any,
      extraHeight?: number,
      keyboardOpeningTime?: number
    ) => {
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
          responder.scrollResponderScrollNativeHandleToKeyboard(
            reactNode,
            extraHeight,
            true
          );
      }, keyboardOpeningTime);
    };

    scrollIntoView = async (
      element: React.Component,
      options: ScrollIntoViewOptions = {}
    ) => {
      if (!this._rnkasv_keyboardView || !element) {
        return;
      }

      const [parentLayout, childLayout] = await Promise.all([
        this._measureElement(this._rnkasv_keyboardView),
        this._measureElement(element),
      ]);

      const getScrollPosition =
        options?.getScrollPosition || this._defaultGetScrollPosition;
      const { x, y, animated } = getScrollPosition(
        parentLayout,
        childLayout,
        this.position
      );
      this.scrollToPosition(x, y, animated);
    };

    _defaultGetScrollPosition = (
      parentLayout: ElementLayout,
      childLayout: ElementLayout,
      contentOffset: ContentOffset
    ): ScrollPosition => {
      return {
        x: 0,
        y: Math.max(0, childLayout.y - parentLayout.y + contentOffset.y),
        animated: true,
      };
    };

    _measureElement = (element: React.Component): Promise<ElementLayout> => {
      const node = findNodeHandle(element);
      if (!node) {
        return Promise.reject(new Error("Element not found"));
      }
      return new Promise((resolve: (layout: ElementLayout) => void) => {
        UIManager.measureInWindow(
          node,
          (x: number, y: number, width: number, height: number) => {
            resolve({ x, y, width, height });
          }
        );
      });
    };

    // Keyboard actions
    _updateKeyboardSpace = (frames: {
      endCoordinates: { height: number; screenY: number };
    }) => {
      // Automatically scroll to focused TextInput
      if (this.props.enableAutomaticScroll) {
        let keyboardSpace: number =
          frames.endCoordinates.height + (this.props.extraScrollHeight ?? 0);
        if (this.props.viewIsInsideTabBar) {
          keyboardSpace -= _KAM_DEFAULT_TAB_BAR_HEIGHT;
        }
        this.setState({ keyboardSpace });
        const currentlyFocusedField = TextInput.State.currentlyFocusedInput
          ? findNodeHandle(TextInput.State.currentlyFocusedInput())
          : TextInput.State.currentlyFocusedField();
        const responder = this.getScrollResponder();
        if (!currentlyFocusedField || !responder) {
          return;
        }
        this._rnkasv_keyboardView.viewIsDescendantOf(
          currentlyFocusedField,
          responder.getInnerViewNode(),
          (isAncestor: boolean) => {
            if (isAncestor) {
              // Check if the TextInput will be hidden by the keyboard
              this._rnkasv_keyboardView.measureInWindow(
                currentlyFocusedField,
                (x: number, y: number, width: number, height: number) => {
                  const textInputBottomPosition = y + height;
                  const keyboardPosition = frames.endCoordinates.screenY;
                  const totalExtraHeight =
                    (this.props.extraScrollHeight ?? 0) +
                    (this.props.extraHeight ?? 0);
                  if (Platform.OS === "ios") {
                    if (
                      textInputBottomPosition >
                      keyboardPosition - totalExtraHeight
                    ) {
                      this._scrollToFocusedInputWithNodeHandle(
                        currentlyFocusedField
                      );
                    }
                  } else {
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
                    } else if (
                      textInputBottomPosition >
                      keyboardPosition - totalExtraHeight
                    ) {
                      this.scrollForExtraHeightOnAndroid(
                        totalExtraHeight -
                          (keyboardPosition - textInputBottomPosition)
                      );
                    }
                  }
                }
              );
            }
          }
        );
      }
      if (!this.props.resetScrollToCoords) {
        if (!this.defaultResetScrollToCoords) {
          this.defaultResetScrollToCoords = this.position;
        }
      }
    };

    _resetKeyboardSpace = () => {
      const keyboardSpace: number = this.props.viewIsInsideTabBar
        ? _KAM_DEFAULT_TAB_BAR_HEIGHT
        : 0;
      this.setState({ keyboardSpace });
      // Reset scroll position after keyboard dismissal
      if (this.props.enableResetScrollToCoords === false) {
        this.defaultResetScrollToCoords = undefined;
        return;
      } else if (this.props.resetScrollToCoords) {
        this.scrollToPosition(
          this.props.resetScrollToCoords.x,
          this.props.resetScrollToCoords.y,
          true
        );
      } else {
        if (this.defaultResetScrollToCoords) {
          this.scrollToPosition(
            this.defaultResetScrollToCoords.x,
            this.defaultResetScrollToCoords.y,
            true
          );
          this.defaultResetScrollToCoords = undefined;
        } else {
          this.scrollToPosition(0, 0, true);
        }
      }
    };

    _scrollToFocusedInputWithNodeHandle = (
      nodeID: number,
      extraHeight?: number,
      keyboardOpeningTime?: number
    ) => {
      if (extraHeight === undefined) {
        extraHeight = this.props.extraHeight ?? 0;
      }
      const reactNode = findNodeHandle(nodeID);
      this.scrollToFocusedInput(
        reactNode,
        extraHeight + (this.props.extraScrollHeight ?? 0),
        keyboardOpeningTime !== undefined
          ? keyboardOpeningTime
          : this.props.keyboardOpeningTime || 0
      );
    };

    _handleOnScroll = (
      e: NativeSyntheticEvent<any> & { nativeEvent: { contentOffset: number } }
    ) => {
      this.position = e.nativeEvent.contentOffset;
    };

    _handleRef = (ref: React.Component) => {
      this._rnkasv_keyboardView = ref;
      if (this.props.innerRef) {
        this.props.innerRef(this._rnkasv_keyboardView);
      }
    };

    update = () => {
      const currentlyFocusedField = TextInput.State.currentlyFocusedInput
        ? findNodeHandle(TextInput.State.currentlyFocusedInput())
        : TextInput.State.currentlyFocusedField();
      const responder = this.getScrollResponder();

      if (!currentlyFocusedField || !responder) {
        return;
      }

      this._scrollToFocusedInputWithNodeHandle(currentlyFocusedField);
    };

    render() {
      const { enableOnAndroid, contentContainerStyle, onScroll } = this.props;
      let newContentContainerStyle;
      if (Platform.OS === "android" && enableOnAndroid) {
        newContentContainerStyle = [...contentContainerStyle].concat({
          paddingBottom:
            ((contentContainerStyle || {}).paddingBottom || 0) +
            this.state.keyboardSpace,
        });
      }
      const refProps = { [hocOptions.refPropName]: this._handleRef };
      return (
        <ScrollableComponent
          {...refProps}
          keyboardDismissMode="interactive"
          contentInset={{ bottom: this.state.keyboardSpace }}
          automaticallyAdjustContentInsets={false}
          showsVerticalScrollIndicator={true}
          scrollEventThrottle={1}
          {...this.props}
          contentContainerStyle={
            newContentContainerStyle || contentContainerStyle
          }
          keyboardSpace={this.state.keyboardSpace}
          getScrollResponder={this.getScrollResponder}
          scrollToPosition={this.scrollToPosition}
          scrollToEnd={this.scrollToEnd}
          scrollForExtraHeightOnAndroid={this.scrollForExtraHeightOnAndroid}
          scrollToFocusedInput={this.scrollToFocusedInput}
          scrollIntoView={this.scrollIntoView}
          resetKeyboardSpace={this._resetKeyboardSpace}
          handleOnScroll={this._handleOnScroll}
          update={this.update}
          // @ts-ignore
          onScroll={Animated.forkEvent(onScroll, this._handleOnScroll)}
        />
      );
    }
  };
}

// Allow to pass options, without breaking change, and curried for composition
// listenToKeyboardEvents(ScrollView);
// listenToKeyboardEvents(options)(Comp);
const listenToKeyboardEvents = (configOrComp: any) => {
  if (typeof configOrComp === "object" && !configOrComp.displayName) {
    return (Comp: React.ComponentType) => KeyboardAwareHOC(Comp, configOrComp);
  } else {
    return KeyboardAwareHOC(configOrComp);
  }
};

export default listenToKeyboardEvents;
