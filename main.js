const state = reactive({
    value: '',
});

function render(text) {
    return node('div', {class: 'container mx-auto text-center'},
        [
            node('img', {class: 'w-64 mt-6 mx-auto mb-6' , src: 'img/logo-sm.jpg', alt: 'logo'}, []),
            node('h1', {class: 'mb-4 text-yellow-700 text-4xl text-center'}, 'Mini Pet JavaScript ' +
                'Framework'),
            node('p', {class: 'mb-4 text-blue-500 text-xl text-center'}, text),
            node('input', {class: 'mx-auto bg-slate-500 text-slate-50', oninput: 'state.value = this.value'}, []),
        ]);
}


// mount(nodeEl, document.querySelector('#app'));

let currentNode;

watchEffect(() => {
    if(!currentNode) {
        currentNode = render(state.value);
        mount(currentNode, document.querySelector('#app'));
    } else {
        const newNode = render(state.value);
        patch(currentNode, newNode);
        currentNode = newNode;
    }
});
