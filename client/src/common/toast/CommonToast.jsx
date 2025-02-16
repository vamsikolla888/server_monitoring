import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toast from './Toast';

const showToaster = (props) => {
  toast(() => Toast[props.type](props), {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    style: { padding: 0, margin: 0 },
  });
};

export default showToaster;
