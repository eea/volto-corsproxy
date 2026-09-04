import { GET_CONTENT } from '@plone/volto/constants/ActionTypes';
import config from '@plone/volto/registry';

export function getProxiedExternalContent(
  url,
  request = {},
  subrequest = null,
) {
  const { corsProxyPath = '/cors-proxy', host, port } = config.settings;

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
      ...request,
      headers: { ...request?.headers, Authorization: null, Cookie: null },
    },
  };
}
