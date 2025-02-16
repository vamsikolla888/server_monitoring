import classNames from 'classnames';

const RadioTailwindStyle = {
  radiobutton: {
    root: {
      className: classNames(
        'inline-flex cursor-pointer select-none align-bottom',
        'w-6 h-6'
      ),
    },
    input: {
      className: classNames(
        'appearance-none top-0 left-0 w-full h-full p-0 m-0 opacity-0 z-10 outline-none cursor-pointer'
      ),
    },
    box: ({ props }) => ({
      className: classNames(
        'flex justify-center items-center',
        'border-2 w-6 h-6 text-gray-700 rounded-full transition duration-200 ease-in-out',
        {
          // Unchecked state styles
          'border-zinc-400 bg-white dark:border-zinc-700 dark:bg-gray-900 dark:text-white/80':
            !props.checked,
          // Checked state styles - uses 4F46E5
          'border-[#4F46E5] bg-[#4F46E5] dark:border-[#4F46E5] dark:bg-[#4F46E5]':
            props.checked,
        },
        {
          // Hover and focus states
          'hover:border-[#4F46E5] dark:hover:border-[#4F46E5] focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(79,70,229,0.5)] dark:focus:shadow-[inset_0_0_0_0.2rem_rgba(79,70,229,0.5)]':
            !props.disabled,
          'cursor-default opacity-60': props.disabled, // Disabled state
        }
      ),
    }),
    icon: ({ props }) => ({
      className: classNames(
        'transform rounded-full', // Always keep icon rounded
        'block w-3 h-3 transition duration-200 bg-white dark:bg-gray-900', // Icon size and base styles
        {
          'backface-hidden scale-10 invisible': !props.checked, // Invisible when unchecked
          'transform scale-100 visible': props.checked, // Visible when checked
        }
      ),
    }),
  },
};

export default RadioTailwindStyle;
