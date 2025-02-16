import PropTypes from 'prop-types';
import CommonLucideIcon from '../Icons/CommonLucideIcon';

export const CommonToastTypes = {
  ERROR: 'Error',
  SUCCESS: 'Success',
  WARNING: 'Warning',
};

export const CommonToast = ({ children, bgColor }) => {
  return (
    <div
      className="flex items-center w-full border-l-6 px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9"
      style={{ borderColor: bgColor, backgroundColor: `${bgColor}1A` }} // Adding transparency (15%) for bg color
    >
      {children}
    </div>
  );
};

const ToastIcon = ({ icon = 'circle-x', bgColor = '#F87171' }) => {
  return (
    <div
      className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg"
      style={{ backgroundColor: bgColor }}
    >
      <CommonLucideIcon name={icon} />
    </div>
  );
};

const ToastMessage = ({ message, textColor = '#B45454' }) => {
  return (
    <div className="w-full">
      <h5 className="font-semibold text-sm" style={{ color: textColor }}>
        {message}
      </h5>
    </div>
  );
};

// Composite Error Toast
CommonToast.Error = (props) => {
  return (
    <CommonToast bgColor="#F87171">
      <ToastIcon {...props} bgColor="#F87171" />
      <ToastMessage {...props} textColor="#B45454" />
    </CommonToast>
  );
};

// Composite Success Toast
CommonToast.Success = (props) => {
  return (
    <CommonToast bgColor="#34D399">
      <ToastIcon {...props} bgColor="#34D399" icon={'check'} />
      <ToastMessage {...props} textColor="#15803D" />
    </CommonToast>
  );
};

// Composite Warning Toast
CommonToast.Warning = (props) => {
  return (
    <CommonToast bgColor="#FBBF24">
      <ToastIcon {...props} bgColor="#FBBF24" icon={'triangle-alert'} />
      <ToastMessage {...props} textColor="#B45309" />
    </CommonToast>
  );
};

/**@PropTypes */
CommonToast.propTypes = {
  children: PropTypes.node.isRequired,
  bgColor: PropTypes.string.isRequired,
};

ToastIcon.propTypes = {
  icon: PropTypes.string,
  bgColor: PropTypes.string,
};

ToastMessage.propTypes = {
  message: PropTypes.string.isRequired,
  textColor: PropTypes.string,
};

CommonToast.Error.displayName = 'Toast.Error';
CommonToast.Success.displayName = 'Toast.Success';
CommonToast.Warning.displayName = 'Toast.Warning';

const Toast = {
  [CommonToastTypes.ERROR]: CommonToast.Error,
  [CommonToastTypes.SUCCESS]: CommonToast.Success,
  [CommonToastTypes.WARNING]: CommonToast.Warning,
};

export default Toast;
