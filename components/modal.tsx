"use client";
import React, { PropsWithChildren, useRef } from "react";

interface ModalProps {
  className?: string;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

interface ModalComponent extends React.FC<PropsWithChildren<ModalProps>> {
  Trigger: React.FC<PropsWithChildren<{ onClick?: () => void }>>;
  Content: React.FC<PropsWithChildren<{ className?: string }>>;
}

export const Modal: ModalComponent = ({
  className,
  isOpen,
  setOpen,
  children
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === Modal.Trigger) {
            return React.cloneElement(child, {
              onClick: () => setOpen(true)
            } as React.HTMLAttributes<HTMLElement>);
          }
          if (child.type === Modal.Content) {
            return (
              <div
                ref={modalRef}
                onClick={handleClose}
                className={
                  `fixed inset-0 flex items-center justify-center transition-all duration-300 ${
                    isOpen
                      ? "opacity-100 bg-black/20 z-20 visible"
                      : "opacity-0 bg-transparent -z-10 invisible"
                  } ` + className
                }
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className={`w-[800px] h-fit rounded-md bg-white transition-all duration-300 ${
                    isOpen ? "translate-y-0" : "translate-y-[-5px]"
                  }`}
                >
                  {React.cloneElement(child)}
                </div>
              </div>
            );
          }
        }
        return null;
      })}
    </>
  );
};

Modal.Trigger = ({ children, onClick }) => {
  return <div onClick={onClick}>{children}</div>;
};

Modal.Content = ({ children }) => {
  return <>{children}</>;
};
