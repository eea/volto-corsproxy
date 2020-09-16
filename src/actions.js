import { GET_CONTENT } from '@plone/volto/constants/ActionTypes';
import { settings } from '~/config';

export function getProxiedExternalContent(
  url,
  request = {},
  subrequest = null,
) {
  const { corsProxyPath = '/cors-proxy' } = settings;
  return {
    type: GET_CONTENT,
    subrequest: subrequest || url,
    request: {
      op: 'get',
      path: `${corsProxyPath}/${url}`,
      ...request,
    },
  };
}
