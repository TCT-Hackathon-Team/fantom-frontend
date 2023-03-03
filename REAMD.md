## How to run this FE project
```shell
# Install Package
yarn

# To run in DEV mode
yarn dev
```

## Want to full flow connect
* Method 1: Bypass login request
* Method 2: Clone this repo: [link](https://github.com/amaurym/login-with-metamask-demo) and run backend

## How to call auth request
_ACCESS-TOKEN: store in LocalStore (for fast development)_
```js
    fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${id}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
			.then((response) => response.json())
			.then((user) => setState({ ...state, user }))
			.catch(window.alert);
```

## How to get walletAddr & smartcontractAddr after login
```js
// in authSlice.ts
export const selectAccount = (state: any) => state.auth.value

// React Hook:
useSelector(selectAccount)
```