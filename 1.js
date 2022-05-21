const h2 = document.querySelector('h2');
const theme = document.querySelector('.theme');
const minus = document.querySelector('.minus');
const plus = document.querySelector('.plus');
const cont = document.querySelector('.cont');
const text = document.querySelector('.text');
const button = document.querySelectorAll('button');

function rootReducer(state, action) {
    if (action.type === 'inc') {
        return state + 1
    }else if(action.type === 'dec') {
        return state - 1
    }
    return state
}

function createStore(rootReducer, initialState) {
    let state = rootReducer(initialState, {type: '__INIT__'});
    const subscribers = [];
  
    return {
      dispatch(action) {
        state = rootReducer(state, action);
        subscribers.forEach((sub) => sub());
      },
      subscribe(callback) {
        subscribers.push(callback);
      },
      getState() {
        return state;
      },
    };
  }

const store = createStore(rootReducer, 0)


plus.addEventListener('click', () => {
    store.dispatch({type: 'inc'})
}) 

minus.addEventListener('click', () => {
    store.dispatch({type: 'dec'})
}) 

store.subscribe(() => {
    const state = store.getState();
    h2.textContent = state;
})

theme.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    cont.classList.toggle('dark');
    text.classList.toggle('dark');
    button.forEach(element => {
        element.classList.toggle('dark');
    });
});
