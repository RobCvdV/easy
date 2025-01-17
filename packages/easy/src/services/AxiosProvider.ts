import axios, { AxiosError, AxiosResponse, Method } from 'axios';
import { HttpStatus, HttpVerb, isRestResult, Request, RequestOptions, RequestProvider, Response, toResponse } from '../http';
import { ctx, isDefined, isEmpty, toResult, Uri } from '../types';
import { choose } from '../utils';

const isResponse = (a: unknown): a is {response: AxiosResponse} => isDefined((a as any)?.response);
const isRequest = (a: unknown): a is {request: any} => isDefined((a as any)?.request);

const asResponse = (uri: Uri, verb: HttpVerb, error: AxiosError): Response =>
  choose<Response, AxiosError>(error)
    .type(isResponse, r => toResponse(r.response.status, isRestResult(r.response.data) ? r.response.data : toResult(r.response.statusText, uri.path, uri), r.response.headers))
    .type(isRequest, r => toResponse(r.request.status, toResult(r.request.message, uri.path, uri)))
    .else(e => toResponse(HttpStatus.InternalServerError, toResult(e.message, uri.path, uri)));

export class AxiosProvider implements RequestProvider {
  execute = ({ uri, verb, body, transform = (r: any) => r, options = RequestOptions.Json }: Request): Promise<Response> =>
    axios
      .request({
        url: uri.toString(),
        method: verb.toString() as Method,
        headers: uri.isInternal && isEmpty(options.headers.Authorization) ? options.bearer(ctx.request.jwt).headers : options.headers,
        data: options.type.encode(body),
      })
      .then(r => toResponse(r.status, transform(r.data), r.headers))
      .catch(e => Promise.reject(asResponse(uri, verb, e)));
}
