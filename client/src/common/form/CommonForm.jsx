/**@ReactImports */
import DOMPurify from 'dompurify';
/**@ExternalLibraries */
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

/**@CustomComponents */
import { dialogTypes, htmlComponentTypes } from '../../constants/constants';
import { PrimeInput } from './Inputs';
import CommonRadio from './radio/CommonRadio';
import CommonCheckbox from './checkbox/CommonCheckbox';
import CommonDropdown from './dropdowns/CommonDropdown';
import CommonCalendar from './calendar/CommonCalendar';
import CommonButton from '../button/CommonButton';
import CommonLucideIcon from '../Icons/CommonLucideIcon';
import { useDispatch, useSelector } from 'react-redux';
import { update, add } from '../../redux/reducers/apiThunkSlice';
import { hideDialog } from '../../redux/reducers/dialogSlice';
import { clearFormData } from '../../redux/reducers/Uislice';
import { useEffect } from 'react';
import CommonCKEditor from '../ckeditor/CommonCKEditor';
import CommonFileUpload from '../fileupload/CommonFileUpload';
/**@PropTypes */
const propTypes = {
  children: PropTypes.node,
  formFields: PropTypes.array,
  schema: PropTypes.object,
  onSubmit: PropTypes.func,
};

const defaultProps = {
  formFields: [],
  schema: {},
  onSubmit: () => {},
};

const CommonForm = ({ children, formFields, schema, url, refetch }) => {
  const dispatch = useDispatch();
  const { form } = useSelector((state) => state.Uislice);
  /**@React-hook-form @Declarations */
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    // resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (form?.isEditMode) {
      formFields.forEach((field) => {
        if (field.type === htmlComponentTypes.CALENDAR)
          setValue(field.name, new Date(form.formData[field.name]));
        else if (field.type === htmlComponentTypes.DROPDOWN) {
          console.log('VVVVVVVVVVVVVVVVVVVVVVVVVVVVV', form.formData);
          if (field.options === 'fromAPI')
            setValue(field.name, {
              [field.optionLabel]: form.formData[field.name],
            });
          setValue(field.name, form.formData[field.name]);
        } else setValue(field.name, form.formData[field.name]);
      });
    } else {
      reset();
    }
  }, [form, setValue, formFields, reset]);

  const onSubmit = async (values) => {
    const formValues = Object.assign({}, values);
    for (let i in values) {
      let findFormField = formFields.find((field) => field.name === i);
      console.log('FIND FORM FILED', findFormField);
      if (findFormField && findFormField?.options === 'fromAPI') {
        values[i] = values[i]?.[findFormField.optionLabel];
        console.log('VALUES ===========', values);
      }
    }
    if (form.isEditMode) {
      dispatch(
        update({ url: `${url}/${form.formData?._id}`, body: values, refetch })
      );
    } else {
      dispatch(add({ url: url, body: values, refetch }));
    }
    dispatch(hideDialog({ type: dialogTypes.COMMONDIALOG }));
    dispatch(clearFormData());
  };

  const onCancel = () => {
    dispatch(hideDialog({ type: dialogTypes.COMMONDIALOG }));
    dispatch(clearFormData());
  };

  const renderHTMLComponent = (field) => {
    switch (field.type) {
      case htmlComponentTypes.INPUT:
        return <PrimeInput {...field} control={control} errors={errors} />;
      case htmlComponentTypes.RADIO:
        return <CommonRadio {...field} control={control} />;
      case htmlComponentTypes.CHECKBOX:
        return <CommonCheckbox {...field} control={control} />;
      case htmlComponentTypes.DROPDOWN:
        return <CommonDropdown {...field} control={control} />;
      case htmlComponentTypes.CALENDAR:
        return <CommonCalendar {...field} control={control} />;
      case htmlComponentTypes.UPLOAD:
        return <CommonFileUpload {...field} control={control} />;
      default:
        return <PrimeInput {...field} control={control} />;
    }
  };

  return (
    <div className="relative h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-full flex flex-col justify-between pb-5"
      >
        <div className="grid grid-cols-2 gap-9 px-5 overflow-y-auto overflow-x-hidden">
          {' '}
          {/**FLEX GROW */}
          {formFields.map((field) => renderHTMLComponent(field))}
          <div className="col-span-2">
            {form?.isEditMode && form?.formData?.emailId?.body && (
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(form?.formData?.emailId?.body),
                }}
              ></div>
            )}
          </div>
        </div>
        <div className="sticky bottom-0 w-full flex justify-end me-4 gap-6 pt-5">
          <CommonButton
            className="py-1 rounded-md w-[140px] text-cancel hover:text-white hover:bg-cancel transition-colors duration-300"
            variant={'outlineCancel'}
            type={'button'}
            onClick={onCancel}
          >
            <div className="flex gap-2 justify-center items-center">
              <CommonLucideIcon name={'arrow-left'} size={15} />
              Cancel
            </div>
          </CommonButton>

          <CommonButton className="py-3 rounded-md w-[140px] bg-primary text-white hover:bg-primary-dark transition-colors duration-300">
            <div className="flex gap-2 justify-center items-center">
              <CommonLucideIcon
                name={'send'}
                size={14}
                className={'text-white transition-colors duration-300'}
              />
              Submit
            </div>
          </CommonButton>
        </div>
      </form>
    </div>
  );
};

CommonForm.propTypes = propTypes;
CommonForm.defaultProps = defaultProps;

export default CommonForm;
