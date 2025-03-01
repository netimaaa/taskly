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
                  `absolute top-0 left-0 right-0 bottom-0 transition-all duration-500 ${
                    isOpen
                      ? "opacity-100 bg-black/20 z-20"
                      : "opacity-0 bg-transparent -z-10"
                  } flex items-center justify-center ` + className
                }
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className={`w-[800px] h-[400px] rounded-md bg-white transition-all duration-100 ${className} ${
                    isOpen ? "opacity-100" : "opacity-0"
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

Modal.Content = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};
