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
  open?: boolean;
  title: string;
  Trigger?: React.ReactNode;
};

export function Modal({ children, onClose, open, title, Trigger }: ModalProps) {
  return (
    <ResponsiveModal
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose?.();
      }}>
      {Trigger && <ResponsiveModalTrigger asChild>{Trigger}</ResponsiveModalTrigger>}
      <ResponsiveModalContent>
        <ResponsiveModalHeader>
          {title && <ResponsiveModalTitle>{title}</ResponsiveModalTitle>}
          <ResponsiveModalDescription>{children}</ResponsiveModalDescription>
        </ResponsiveModalHeader>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}
