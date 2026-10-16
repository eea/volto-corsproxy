import { getProxiedExternalContent } from './actions';
import { GET_CONTENT } from '@plone/volto/constants/ActionTypes';
import config from '@plone/volto/registry';

describe('getProxiedExternalContent action', () => {
  it('returns the expected action object', () => {
    global.__SERVER__ = false;
    const url = 'testUrl';
    const request = {
      headers: { 'Test-Header': 'Test Header Value' },
    };

    config.settings = {
      host: 'testHost',
      port: 'testPort',
    };

    Object.defineProperty(window, 'location', {
      value: {
        protocol: 'http:',
        host: 'localhost',
      },
    });

    const expectedAction = {
      type: GET_CONTENT,
      subrequest: url,
      request: {
        op: 'get',
        path: 'http://localhost/cors-proxy/testUrl',
        ...request,
        headers: {
          Authorization: null,
          Cookie: null,
        },
      },
    };

    expect(getProxiedExternalContent(url)).toEqual(expectedAction);
  });

  it('returns the expected action object', () => {
    global.__SERVER__ = true;
    const url = 'testUrl';
    const subrequest = 'testSubrequest';
    const request = {
      headers: { 'Test-Header': 'Test Header Value' },
    };

    config.settings = {
      corsProxyPath: '/test-path',
      host: 'testHost',
      port: 'testPort',
    };

    Object.defineProperty(window, 'location', {
      value: {
        protocol: 'http:',
        host: 'localhost',
      },
    });

    const expectedAction = {
      type: GET_CONTENT,
      subrequest,
      request: {
        op: 'get',
        path: 'http://testHost:testPort/test-path/testUrl',
        ...request,
        headers: {
          'Test-Header': 'Test Header Value',
          Authorization: null,
          Cookie: null,
        },
      },
    };

    expect(getProxiedExternalContent(url, request, subrequest)).toEqual(
      expectedAction,
    );
  });
});
