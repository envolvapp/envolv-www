/**
 * Lives here, not in `app/actions.ts`: a `'use server'` module is meant to export
 * only async server functions. Types are erased at compile time so it usually
 * works anyway — but "usually" is not a load-bearing guarantee, and the failure
 * mode is a confusing build error. Keep the type out of the server file.
 */
export type DemoRequestState = {
  status: 'idle' | 'ok' | 'error'
  message?: string
}
