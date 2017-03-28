/**
 * @file error/index.js
 *  出错展现页面：404，401，500等
 * @author maoquan(maoquan@htsc.com)
 */

import React from 'react';

export function NotFoundPage() {
  return (
    <article>
      <h1>
        404 Not Found
      </h1>
    </article>
  );
}

export function PermissonDeniedPage() {
  return (
    <article>
      <h1>
        401 Permisson Denied
      </h1>
    </article>
  );
}
