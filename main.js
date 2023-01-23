const nodeEl = node('div', {class: 'container mx-auto'},
    [
        node('img', {class: 'w-64 mt-6 mx-auto mb-6' , src: 'img/logo-sm.jpg', alt: 'logo'}, []),
        node('h1', {class: 'mb-4 text-yellow-700 text-4xl text-center'}, 'Mini Pet JavaScript ' +
            'Framework'),
        node('p', {class: 'text-blue-500 text-xl text-center'}, 'Here small and lightweight ' +
            'JavaScript Framework'),
    ]);

mount(nodeEl, document.querySelector('#app'));


