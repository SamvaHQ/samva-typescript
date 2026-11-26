/** An API request ID is safe to display and can be passed to the log detail operation. */
export const samvaRequestId = (value: string | null | undefined): string | undefined =>
  value !== undefined && value !== null && /^req_[a-zA-Z0-9_-]+$/.test(value) ? value : undefined;

export const withRequestIdMessage = (message: string, requestId: string | undefined): string =>
  requestId === undefined ? message : `${message}\nrequest: ${requestId}`;
