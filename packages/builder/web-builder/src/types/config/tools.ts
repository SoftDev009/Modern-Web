import { IStyledComponentOptions } from '@modern-js/babel-preset-app';
import type {
  TSLoaderOptions,
  BabelConfigUtils,
  TerserPluginOptions,
  ForkTSCheckerOptions,
  BabelTransformOptions,
  CssMinimizerPluginOptions,
} from '../thirdParty';

export type ToolsTerserConfig =
  | TerserPluginOptions
  | ((options: TerserPluginOptions) => TerserPluginOptions | void);

export type ToolsMinifyCssConfig =
  | CssMinimizerPluginOptions
  | ((options: CssMinimizerPluginOptions) => CssMinimizerPluginOptions | void);

export type ToolsBabelConfig =
  | BabelTransformOptions
  | ((
      options: BabelTransformOptions,
      utils: BabelConfigUtils,
    ) => BabelTransformOptions);

export type DevServerConfig = {
  hot?: boolean;
};

export interface ToolsConfig {
  babel?: ToolsBabelConfig;
  terser?: ToolsTerserConfig;
  tsLoader?: TSLoaderOptions;
  tsChecker?: ForkTSCheckerOptions;
  devServer?: DevServerConfig;
  minifyCss?: ToolsMinifyCssConfig;
  styledComponents?: IStyledComponentOptions;
}
