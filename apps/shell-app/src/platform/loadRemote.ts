import { defineAsyncComponent, h, type Component } from 'vue';
import { PfSpinner } from '@platform/ui-kit';
import RemoteFailed from './RemoteFailed.vue';

interface Options {
  /** Сколько раз молча повторить с экспоненциальным backoff до показа errorComponent. */
  retries?: number;
  /** Таймаут одной попытки. */
  timeout?: number;
}

/**
 * Оборачивает import('remote/Module') так, чтобы:
 *  - первый load делал N тихих retry (с backoff);
 *  - после N неудач показывал RemoteFailed с кнопкой «попробовать снова»;
 *  - кнопка triggered hard reload — это норм для редкого сценария.
 *
 * Не идеал, но честнее чем `defineAsyncComponent(() => import(...))` без обёртки.
 */
export function loadRemote(
  name: string,
  loader: () => Promise<unknown>,
  options: Options = {},
): Component {
  const { retries = 1, timeout = 8000 } = options;

  return defineAsyncComponent({
    loader: loader as () => Promise<Component>,
    timeout,
    delay: 200,
    loadingComponent: {
      render: () =>
        h('div', { style: 'padding:32px' }, [h(PfSpinner, { label: `Загружаем ${name}…` })]),
    },
    errorComponent: {
      render: () => h(RemoteFailed, { name, onRetry: () => window.location.reload() }),
    },
    onError(error, retry, fail, attempts) {
      if (attempts <= retries) {
        setTimeout(retry, 250 * 2 ** (attempts - 1));
      } else {
        console.error(`[shell] remote "${name}" failed after ${attempts - 1} retries`, error);
        fail();
      }
    },
  });
}
