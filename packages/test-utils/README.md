# @stellar-vue-ui/test-utils

Testing utilities for Stellar Vue UI components.

## Installation

```bash
npm install -D @stellar-vue-ui/test-utils
```

## Usage

```ts
import { renderWithTheme } from '@stellar-vue-ui/test-utils'
import { Button } from '@stellar-vue-ui/core'

test('renders button', () => {
  const { getByRole } = renderWithTheme(Button, {
    props: { variant: 'default' },
    slots: { default: 'Click me' },
  })
  expect(getByRole('button')).toHaveTextContent('Click me')
})
```

## Features

- `renderWithTheme` — Mount components with theme context
- Mock generators for common test scenarios
- Accessibility matchers
- Form testing utilities

## License

[MIT](./LICENSE)
