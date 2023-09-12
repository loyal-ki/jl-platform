// Enable log request
export const LOG_REQUESTS = false && __DEV__;

// Delay when sending network requests
export const DELAY_NETWORK_RESPONSES = false && __DEV__;

// Used to add delay to network requests if DELAY_REQUESTS is true.
export const NETWORK_REQUESTS_LATENCY = 500;

// Send message directly without proxy (for production)
export const SEND_DIRECT_MESSAGE = false && __DEV__;

// Enable log redux
export const LOG_REDUX = false && __DEV__;

// Enable dev mode
export const ENABLE_DEV_MODE = true && __DEV__;

// Enable log redux
export const ENABLE_REDUX_LOGGER = false && __DEV__;

// Enable redux flipper
export const ENABLE_REDUX_FLIPPER = false && __DEV__;
