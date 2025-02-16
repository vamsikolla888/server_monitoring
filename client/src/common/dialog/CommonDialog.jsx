import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Dialog } from 'primereact/dialog';

const propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.number,
  onHide: PropTypes.func,
  visible: PropTypes.bool,
  className: PropTypes.string,
  headerClassName: PropTypes.string,
  showHeader: PropTypes.bool,
};

const defaultProps = {
  children: undefined,
  onHide: () => {},
  visible: false,
  className: '',
  headerClassName: '',
  showHeader: true,
};

const CommonDialog = ({
  children,
  onHide,
  visible,
  className,
  headerClassName,
  showHeader,
}) => {
  const headerClass = classNames(
    {
      hidden: !showHeader,
    },
    headerClassName
  );
  const dialogClassName = classNames(className);
  return (
    <Dialog
      headerClassName={headerClass}
      draggable={false}
      className={dialogClassName}
      // modal
      baseZIndex={10000}
      visible={visible}
      onHide={onHide}
    >
      {children}
    </Dialog>
  );
};

/**@CommonDialog Types */
CommonDialog.propTypes = propTypes;
CommonDialog.defaultProps = defaultProps;

export default CommonDialog;
