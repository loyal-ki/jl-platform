# Redux to manage state

1. [`login-screen.types.tsx`](../app/screens/login/login-screen.types.tsx): This file defines constants for Redux actions and data types for the login screen state. The state includes email, emailError, password, and passwordError.

2. [`login-screen.actions.ts`](../app/screens/login/login-screen.actions.ts#L1-L22): This file defines Redux actions. There are three actions: setEmailAction, setPasswordAction, and validateFormAction.

3. [`login-screen.reducer.tsx`](../app/screens/login/login-screen.reducer.tsx#L1-L37): This file defines the reducer for the login screen. This reducer handles setEmailAction, setPasswordAction, and validateFormAction to update the state.

4. [`login-screen.view-model.ts`](../app/screens/login/login-screen.view-model.ts#L1-L73): This file uses the useReducer hook to manage state and dispatch actions. It also defines callback functions for user actions such as changing email, changing password, and logging in.

5. [`login-screen.tsx`](../app/screens/login/login-screen.tsx#L1-L173): This is the main component of the login screen. It uses values from the view model to render the interface and handle user actions.
