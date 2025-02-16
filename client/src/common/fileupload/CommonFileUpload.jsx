import { FileUpload } from 'primereact/fileupload';
import { useDispatch } from 'react-redux';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';

import config from '../../config/config';
import { showToast } from '../../redux/reducers/Uislice';
import { CommonToastTypes } from '../toast/Toast';
import { upload } from '../../redux/reducers/apiThunkSlice';

const primeReactPropTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  field: PropTypes.object.isRequired,
  showLabel: PropTypes.bool,
  showIcon: PropTypes.bool,
  iconName: PropTypes.string,
  className: PropTypes.string,
  errors: PropTypes.object,
};

const defaultProps = {
  showLabel: true,
  showIcon: false,
};

const CommonFileUploadPropTypes = {
  ...primeReactPropTypes,
  control: PropTypes.func.isRequired,
};

const PrimeReactUpload = ({
  name,
  label,
  placeholder,
  type,
  field,
  className,
  showLabel,
  showIcon,
  iconName,
  errors,
}) => {
  const dispatch = useDispatch();
  const onUpload = (event) => {
    const uploadToServer = async () => {
      const results = await dispatch(
        upload({
          url: 'uploads?uploadPath=employees&uploadWhileCreate=true',
          body: event.files[0],
        })
      ).unwrap();
      field.onChange(results.fileName);
    };
    uploadToServer();
  };
  return (
    <div className="relative">
      {showLabel && (
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          {label}
        </label>
      )}
      <FileUpload
        mode="basic"
        name={name}
        accept="*"
        maxFileSize={10000000000}
        customUpload
        uploadHandler={onUpload}
      />
      <small className="text-red-600 mx-2 font-medium">
        {errors?.[name]?.message}
      </small>
    </div>
  );
};

export default function CommonFileUpload(props) {
  const { name, control } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <PrimeReactUpload {...props} field={field} />}
    />
  );
}

CommonFileUpload.propTypes = CommonFileUploadPropTypes;
PrimeReactUpload.propTypes = primeReactPropTypes;
PrimeReactUpload.defaultProps = defaultProps;
