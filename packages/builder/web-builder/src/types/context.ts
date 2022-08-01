import type { STATUS } from '../shared';
import type { Hooks } from '../core/createHook';
import type { WebBuilderConfig } from './config';

// The public context
export type WebBuilderContext = {
  srcPath: string;
  rootPath: string;
  distPath: string;
  cachePath: string;
  configPath?: string;
  tsconfigPath?: string;
  originalConfig: Readonly<WebBuilderConfig>;
};

// The private context
export type Context = WebBuilderContext & {
  status: STATUS;
  hooks: Readonly<Hooks>;
  config: Readonly<WebBuilderConfig>;
};
