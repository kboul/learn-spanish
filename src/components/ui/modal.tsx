import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalTrigger
} from "@/components/ui/responsive-modal";

type ModalProps = {
  children: React.ReactNode;
  onClose?: () => void;
  open: boolean;
  title: string;
};

export function Modal({ children, onClose, open, title }: ModalProps) {
  return (
    <ResponsiveModal
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose?.();
      }}>
      <ResponsiveModalTrigger asChild></ResponsiveModalTrigger>
      <ResponsiveModalContent>
        <ResponsiveModalHeader>
          {title && <ResponsiveModalTitle>{title}</ResponsiveModalTitle>}
          <ResponsiveModalDescription>{children}</ResponsiveModalDescription>
        </ResponsiveModalHeader>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}
