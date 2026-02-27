import pc from 'picocolors'

export const styles = {
  title: (text: string) => pc.bold(pc.cyan(text)),
  success: (text: string) => pc.green(`\u2713 ${text}`),
  error: (text: string) => pc.red(`\u2717 ${text}`),
  warning: (text: string) => pc.yellow(`\u26A0 ${text}`),
  info: (text: string) => pc.blue(`\u2139 ${text}`),
  dim: (text: string) => pc.dim(text),
  highlight: (text: string) => pc.bold(pc.white(text)),
}

/**
 * Print a styled header with decoration.
 */
export function header(text: string): void {
  console.log()
  console.log(styles.title(text))
  divider()
}

/**
 * Print a horizontal divider line.
 */
export function divider(): void {
  console.log(pc.dim('\u2500'.repeat(50)))
}

/**
 * Print an empty line.
 */
export function newLine(): void {
  console.log()
}
