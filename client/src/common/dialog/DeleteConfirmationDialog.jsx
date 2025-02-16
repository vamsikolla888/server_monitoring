import PropTypes from 'prop-types';
import { buttonVariants } from '../../constants/constants';
import CommonButton from '../button/CommonButton';
import CommonDialog from './CommonDialog';

const propTypes = {
  onHide: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
const DeleteConfirmationDialog = ({ onHide, visible, onSubmit }) => {
  console.log('VISIBLE', visible);
  return (
    <CommonDialog
      className="w-[40%]"
      onHide={onHide}
      visible={visible}
      showHeader={false}
    >
      <div className="flex flex-col gap-3 pt-5 mt-10 mx-5">
        <p className="text-black font-bold text-2xl">
          Are you sure you want to delete?
        </p>
        <span className="text-lg font-medium">
          Once you delete, it&apos;s gone for good.
        </span>
        <div className="flex justify-end gap-6 mt-6">
          <CommonButton
            className="py-[6px] px-7 rounded-sm font-medium transition hover:bg-slate-200"
            variant={buttonVariants.SECONDARY}
            onClick={onHide}
          >
            Cancel
          </CommonButton>
          <CommonButton
            className={'py-1 px-7 rounded-sm font-semibold'}
            variant={buttonVariants.DANGER}
            onClick={onSubmit}
          >
            Delete
          </CommonButton>
        </div>
      </div>
    </CommonDialog>
  );
};

DeleteConfirmationDialog.propTypes = propTypes;

export default DeleteConfirmationDialog;
