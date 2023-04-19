const h = (tag, props, children) => {
  //返回一个vnode vnode就是一个js对象 -> {}
  return {
    tag,
    props,
    children,
  };
};

const mount = (vnode, container) => {
  // 变成真实的元素
  // vnode 上会保留一份真实的dom
  // 1、创建出我们的真实的元素，并且在vnode上保存一份真实的元素
  const el = (vnode.el = document.createElement(vnode.tag));
  // 2、处理props
  if (vnode.props) {
    for (const key in vnode.props) {
      const value = vnode.props[key];
      if (key.startsWith("on")) {
        //对事件监听的判断
        el.addEventListener(key.slice(2).toLowerCase(), value);
      } else {
        el.setAttribute(key, value);
      }
    }
  }
  // 3、处理children
  if (vnode.children) {
    // 这里只判断 string和 数组的情况
    if (typeof vnode.children === "string") {
      el.textContent = vnode.children;
    } else {
      vnode.children.forEach((item) => {
        mount(item, el);
      });
    }
  }
  // 4、将我们的el挂载到container中
  container.appendChild(el);
};

const patch = (n1, n2) => {
  if (n1.tag !== n2.tag) {
    // 拿到原来的vnode对应的元素 移除 换成新的vnode
    const n1ElParent = n1.el.parentElement;
    n1ElParent.removeChild(n1.el);
    mount(n2, n1ElParent);
  } else {
    // 1、取出el对象
    const el = (n2.el = n1.el);
    // 2、对props进行处理
    const oldProps = n1.props;
    const newProps = n2.props;
    // 2.1、添加新的props
    for (const key in newProps) {
      const oldValue = oldProps[key] || {};
      const newValue = newProps[key] || {};
      if (oldValue !== newValue) {
        if (key.startsWith("on")) {
          el.addEventListener(key.slice(2).toLowerCase(), newValue);
        } else {
          el.setAttribute(key, newValue);
        }
      }
    }
    // 2.2、移除旧的props
    for (const key in oldProps) {
      if (!(key in newProps)) {
        if (key.startsWith("on")) {
          const value = oldProps[key];
          el.removeEventListener(key.slice(2).toLowerCase(), value);
        } else {
          el.removeAttribute(key);
        }
      }
    }
    // 3、处理children
    const oldChildren = n1.children || [];
    const newChildren = n2.children || [];
    if (typeof newChildren === "string") {
      if (typeof oldChildren === "string") {
        if (oldChildren !== newChildren) {
          el.textContent = newChildren;
        }
      } else {
        // 其实写到这儿就行了，但是最好判断一下两个string是否一样，如果一样就直接不用替换
        el.innerHTML = newChildren;
      }
    } else {
      if(typeof oldChildren === "string"){
        el.innerHTML = ""
        newChildren.forEach(item => {
          mount(item, el)
        })
      }else{
        const len = Math.min(newChildren.length, oldChildren.length);
        // 不是string,就是数组啦
        for (const i = 0; i < len; i++) {
          patch(oldChildren[i], newChildren[i]);
        }
        // [v1, v2, v3]
        //[v1, v5, v7, v8, v9]
        // 策略就是先判断长度，
        // 如果oldChildren.length > newChildren.length, 那就先对比同长度的元素，再把剩下的remove
        if(oldChildren.length > newChildren.length){
          oldChildren.slice(len).forEach(item => {
            el.removeChild(item.el)
          })
        }
        // 如果oldChildren.length < newChildren.length，那就先对比同长度的元素，在把剩下的mount append上
        if(oldChildren.length < newChildren.length){
          newChildren.slice(len).forEach(item => {
            mount(item, el)
          })
        }
      }
    }
  }
};
