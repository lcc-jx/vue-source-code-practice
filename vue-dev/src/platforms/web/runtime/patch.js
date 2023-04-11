/* @flow */

import * as nodeOps from 'web/runtime/node-ops'
import { createPatchFunction } from 'core/vdom/patch'
import baseModules from 'core/vdom/modules/index'
import platformModules from 'web/runtime/modules/index'

// the directive module should be applied last, after all
// built-in modules have been applied.
const modules = platformModules.concat(baseModules)
//lcc vue chapter1/2:nodeOps是一些操作DOM的方法  是platformModules（定义了一些属性，钩子函数）和baseModules的合集
export const patch: Function = createPatchFunction({ nodeOps, modules })
