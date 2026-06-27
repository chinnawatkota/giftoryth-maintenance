'use client';

type ConfirmSubmitButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  message: string;
};

const ConfirmSubmitButton = ({ message, onClick, ...props }: ConfirmSubmitButtonProps) => (
  <button
    {...props}
    onClick={event => {
      if (!window.confirm(message)) {
        event.preventDefault();
        return;
      }

      onClick?.(event);
    }}
  />
);

export default ConfirmSubmitButton;
