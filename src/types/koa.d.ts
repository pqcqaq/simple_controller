// src/types/koa.d.ts
import * as Koa from 'koa';
import { Response } from 'koa';
import * as ejs from 'ejs';

declare module 'koa' {
  interface Context {
    render(view: string, locals: object): Promise<string>;
  }
}
