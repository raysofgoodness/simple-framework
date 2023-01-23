const vDom = {
    tag: 'div',
    props: {
      class: 'container'
    },
    children: [
        {
            tag: 'h1',
            props: {
                class: 'title',
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
       element.setAttribute(key, vNode.props[key]);
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

// compares nodes for changes content on page
const patch = (firstNode, secondNode) => {
    const tag = firstNode.tag;

    if (tag !== secondNode.tag) {
        mount(secondNode, firstNode.$element.parentNode);
        unMount(firstNode);
    } else {
        secondNode.$element = firstNode.$element;

        if (typeof secondNode.children === 'string') {
            secondNode.$element.textContent = secondNode.children;
        } else {

            for (let i = secondNode.$element.attributes.length - 1; i >=0; i--) {
                secondNode.$element.removeAttribute(secondNode.$element.attributes[i].name);
            }

            for (let key in secondNode.props) {
                secondNode.$element.setAttribute(key, secondNode.props[key]);
            }

            if (firstNode.children.length !== secondNode.children.length) {
                firstNode.children.length > secondNode.children.length
                    ? firstNode.children.slice(secondNode.children.length).forEach(child => {
                        unMount(child);
                    })
                    : secondNode.children.slice(firstNode.children.length).forEach(child => {
                        mount(child);
                    });
            }

            for (let i = 0; i < Math.min(firstNode.children.length, secondNode.children.length); i++) {
                patch(firstNode.children[i], secondNode.children[i]);
            }
        }
    }
};

