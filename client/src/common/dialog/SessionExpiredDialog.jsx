import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import CommonButton from '../button/CommonButton';
import CommonDialog from './CommonDialog';
import { Images } from '../../assets/imageImports';

const propTypes = {
  onHide: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

const SessionExpiredDialog = ({ onHide, visible }) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Blurred Background */}
      {visible && <div className="blur-background"></div>}
      <CommonDialog
        className={'w-[40%] absolute left-[calc(40%-45px)]'}
        onHide={onHide}
        visible={visible}
        showHeader={false}
      >
        <div className="flex flex-col py-10 rounded-xl gap-10">
          <div className="flex justify-center">
            <img src={Images.SESSIONEXPIRED} className="w-30" />
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-xl font-semibold text-center">
              Your session has expired.
            </p>
            <p className="text-md font-medium text-center">
              Please log in again to continue using the application.
            </p>
          </div>
          <div className="flex justify-center">
            <CommonButton
              className={'px-12 py-2 rounded-sm bg-primary'}
              onClick={() => navigate('/auth/login')}
            >
              Login again.
            </CommonButton>
          </div>
        </div>
      </CommonDialog>
    </>
  );
};

SessionExpiredDialog.propTypes = propTypes;

export default SessionExpiredDialog;
