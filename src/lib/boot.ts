export type ConnectionFailure =
  | { kind: 'missing_env' }
  | { kind: 'missing_solo' }
  | { kind: 'schema_missing'; message?: string }
  | { kind: 'boot_error'; message: string }
