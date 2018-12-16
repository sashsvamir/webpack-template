const styles = require('./styles.sass')

const app = document.querySelector('#app')

const regards = document.createElement('div')
regards.classList.add('regards')
regards.innerHTML = "<h1>Hello world!</h1>"
app.appendChild(regards)
