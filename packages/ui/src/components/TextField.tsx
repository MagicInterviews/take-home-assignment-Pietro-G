"use client";

import { Form } from "./Form";
import * as React from "react";
import { cn } from "../lib";
import { cva, type VariantProps } from "class-variance-authority";

const textFieldVariants = cva(
  "w-full bg-white border border-gray-200 placeholder:text-gray-400 transition-all duration-200 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 hover:border-gray-300 leading-normal rounded-none",
  {
    variants: {
      size: {
        sm: "h-11 text-base px-5 py-3",
        md: "h-12 text-base px-5 py-3.5",
        lg: "h-14 text-lg px-6 py-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export type TextFieldProps = React.ComponentProps<typeof Form.Field> &
  VariantProps<typeof textFieldVariants> & {
    name: string;
    controlProps?: React.ComponentProps<typeof Form.Control>;
  };

export function TextField({
  name,
  size,
  controlProps = {},
  ...props
}: TextFieldProps) {
  const { className: controlClassName, ...restControlProps } = controlProps;
  
  return (
    <Form.Field name={name} {...props}>
      <Form.Control
        {...restControlProps}
        className={cn(textFieldVariants({ size }), controlClassName)}
      />
    </Form.Field>
  );
}