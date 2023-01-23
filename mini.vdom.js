const vDom = {
    tag: 'div',
    props: {
      class: 'container'
    },
    children: [
        {
            tag: 'h1',
            props: {
                title: 'This is title',
            },
            children: 'Mini JavaScript Framework',
        },
        {
            tag: 'p',
            props: {
                class: 'description',
            },
            children: 'Here small and lightweight JavaScript Framework',
        },
    ]
};

// return main data
const node = (tag, props, children) => {
    return {
        tag,
        props,
        children
    }
};

// mount virtual dom
const mount = (vNode, container) => {
    const element = document.createElement(vNode.tag);

    let keys = Object.keys(vNode.props);
    keys.forEach((key) => {
       key.setAttribute(key, vNode.props[key]);
    });

    (typeof vNode.children === 'string') ? element.textContent = vNode.children :
        vNode.children.forEach(item => {
           mount(item, element)
        });

    container.append(element);

    vNode.$element = element;
};

// unmount element from DOM
const unMount = (vNode) => vNode.$element.remove();

// compares nodes
const patch = (firstNode, secondNode) => {

    if (firstNode.tag !== secondNode.tag) {
        mount(secondNode, firstNode.$element.parentNode);
        unMount(firstNode);
    } else {
        secondNode.$element = firstNode.$element;

        if (typeof secondNode.children === 'string') {
            secondNode.$element.textContent = secondNode.children;
        } else {
            while (secondNode.$element.attributes.length > 0) {
                secondNode.$element.removeAttribute(secondNode.$element.attributes[0].name)
            }

            let keys = Object.keys(secondNode.props);
            keys.forEach((key) => {
                key.setAttribute(key, secondNode.props[key]);
            });

            if (typeof firstNode.children === 'string') {
                secondNode.$element.textContent = null;
                secondNode.children.forEach(item => {
                    mount(item, secondNode.$element);
                })
            }
        }
    }
};
