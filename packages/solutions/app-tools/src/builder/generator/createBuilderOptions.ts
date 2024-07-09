import type {
  RsbuildTarget,
  CreateUniBuilderOptions,
} from '@modern-js/uni-builder';

import type { IAppContext } from '@modern-js/core';

export function createBuilderOptions(
  target: RsbuildTarget | RsbuildTarget[],
  appContext: IAppContext,
): Omit<CreateUniBuilderOptions, 'bundlerType' | 'config'> {
  // create entries
  type Entries = Record<string, string[]>;
  const entries: Entries = {};
  const { entrypoints = [], checkedEntries } = appContext;
  for (const { entryName, internalEntry, entry } of entrypoints) {
    if (checkedEntries && !checkedEntries.includes(entryName)) {
      continue;
    }
    const finalEntry = internalEntry || entry;

    if (entryName in entries) {
      entries[entryName].push(finalEntry);
    } else {
      entries[entryName] = [finalEntry];
    }
  }

  const serverEntries: Entries = {};
  for (const entry in entries) {
    const v = entries[entry];
    serverEntries[entry] = v.map(entry =>
      entry.replace('index.jsx', 'index.server.jsx'),
    );
  }

  return {
    cwd: appContext.appDirectory,
    target,
    frameworkConfigPath: appContext.configFile || undefined,
    entry({ target }) {
      if (target === 'web') {
        return entries;
      }
      if (['node', 'web-worker', 'service-worker'].includes(target)) {
        return serverEntries;
      }

      return entries;
    },
  };
}
