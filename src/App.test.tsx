import SamuraiJSApp from './App';
import ReactDOM from "react-dom";

test('renders without crashing', () => {
    const div = document.createElement('div')
    // @ts-ignore
    ReactDOM.render(<SamuraiJSApp/>, div);
    ReactDOM.unmountComponentAtNode(div)
});