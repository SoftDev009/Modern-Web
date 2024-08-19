import { type LoaderFunctionArgs, redirect } from '@modern-js/runtime/router';
import { resolveURL } from 'ufo';

export default ({ request }: LoaderFunctionArgs) => {
  const target = resolveURL(request.url, './components');
  return redirect(target);
};
