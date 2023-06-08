import type {
  SharedOutputConfig,
  NormalizedSharedOutputConfig,
} from '@modern-js/builder-shared';
import type { Builtins, Externals } from '@rspack/core';

export type OutputConfig = SharedOutputConfig & {
  /**
   * Copies the specified file or directory to the dist directory.
   */
  copy?: Builtins['copy'] | NonNullable<Builtins['copy']>['patterns'];
  /**
   * At build time, prevent some `import` dependencies from being packed into bundles in your code, and instead fetch them externally at runtime.
   */
  externals?: Externals;
};

export type NormalizedOutputConfig = OutputConfig &
  NormalizedSharedOutputConfig;
