declare namespace Button {
  type OutlineButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    color: 'primary' | 'secondary';
    size: '' | 'sm' | 'md' | 'lg' | 'xl' | '4xl';
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    isLoading?: boolean;
  };
}
