import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { unstable_HistoryRouter as BrowserRouter } from "react-router-dom"

import App from "./App"
import { setupStore } from "./redux"
import { history } from "./services"
import "./styles/index.css"

const store = setupStore()

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <BrowserRouter history={history}>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
)
