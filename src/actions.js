import { GET_CONTENT } from '@plone/volto/constants/ActionTypes';
import { settings } from '~/config';

export function getProxiedExternalContent(
  url,
  request = {},
  subrequest = null,
) {
  const { corsProxyPath = '/cors-proxy', host, port } = settings;

  const base = __SERVER__
    ? `http://${host}:${port}`
    : `${window.location.protocol}//${window.location.host}`;

  const path = `${base}${corsProxyPath}/${url}`;

  return {
    type: GET_CONTENT,
    subrequest: subrequest || url,
    request: {
      op: 'get',
      path,
      headers: { Authorization: null, Cookie: null },
      ...request,
    },
  };
}
