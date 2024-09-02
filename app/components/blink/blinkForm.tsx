"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(6, {
    message: "Description must be at least 6 characters.",
  }),
  publicKey: z.string().min(12, {
    message: "Wallet address should be atleast 12 characters.",
  }),
  image: z
    .string()
    .optional()
    .refine((value) => !value || /^https?:\/\/\S+\.\S+$/.test(value), {
      message: "Image must be a valid URL.",
    }),
  price1: z.number().max(99).min(0).optional(),
  price2: z.number().max(99).min(0).optional(),
  price3: z.number().max(99).min(0).optional(),
  checkPrice1: z.boolean().optional(),
  checkPrice2: z.boolean().optional(),
  checkPrice3: z.boolean().optional(),
  variablePrice: z.boolean().optional(),
});

export function BlinkForm({
  formData,
  setFormData,
  setBlink
}: {
  formData: any;
  setFormData: (val: any) => void;
  setBlink: (blink: string) => void;
}) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formData,
  });

  const handleChange = (name: any, value: any) => {
    form.setValue(name, value);
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const checkPrice1 = useWatch({ control: form.control, name: "checkPrice1" });
  const checkPrice2 = useWatch({ control: form.control, name: "checkPrice2" });
  const checkPrice3 = useWatch({ control: form.control, name: "checkPrice3" });

  useEffect(() => {
    if (!checkPrice1) {
      form.setValue("price1", 0);
      form.setValue("checkPrice2", false);
      form.setValue("price2", 0);
      form.setValue("checkPrice3", false);
      form.setValue("price3", 0);
    } else if (!checkPrice2) {
      form.setValue("price2", 0);
      form.setValue("checkPrice3", false);
      form.setValue("price3", 0);
    } else if (!checkPrice3) {
      form.setValue("price3", 0);
    }

    setFormData((prev: any) => ({
      ...prev,
      checkPrice1,
      checkPrice2,
      checkPrice3,
      price1: form.getValues("price1"),
      price2: form.getValues("price2"),
      price3: form.getValues("price3"),
      variablePrice: form.getValues("variablePrice"),
    }));

    sessionStorage.removeItem("blink");
  }, [checkPrice1, checkPrice2, checkPrice3, form, setFormData]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BLINK_API!}/api/generate`, {params: values});
      setBlink(res.data.blink);
      toast({
        title: "Blink Status",
        description: "Your Blink is created",
        style: {
          backgroundColor: "green",
        },
      });
    } catch(err) {
      console.log('err', err)
    }
  }

  function onError(errors: any) {
    console.error("Form errors:", errors);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="space-y-8 rounded-xl mb-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title*</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter title"
                  {...field}
                  onChange={(e) => handleChange("title", e.target.value)}
                />
              </FormControl>
              <FormDescription className="text-xs">
                This can be your name or any catchy hook.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description*</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter description"
                  {...field}
                  onChange={(e) => handleChange("description", e.target.value)}
                />
              </FormControl>
              <FormDescription className="text-xs">
                This can be the cause/reason/brief of this Blink.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="publicKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wallet Address*</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter wallet address"
                  {...field}
                  onChange={(e) => handleChange("publicKey", e.target.value)}
                />
              </FormControl>
              <FormDescription className="text-xs">
                Public key of your desired crypto account.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter image URL"
                  {...field}
                  onChange={(e) => handleChange("image", e.target.value)}
                />
              </FormControl>
              <FormDescription className="text-xs">
                Link of the Blink image. Default image is displayed.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="checkPrice1"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                <FormLabel className="mr-2">Value 1</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      field.onChange(checked);
                      handleChange("checkPrice1", checked);
                    }}
                    ref={field.ref}
                  />
                </FormControl>
              </div>
              <FormField
                control={form.control}
                name="price1"
                render={({ field: priceField }) => (
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter SOL balance"
                      {...priceField}
                      disabled={!checkPrice1}
                      onChange={(e) => handleChange("price1", Number(e.target.value))}
                    />
                  </FormControl>
                )}
              />
              <FormDescription className="text-xs">
                SOL value for 1st payment button
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="checkPrice2"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                <FormLabel className="mr-2">Value 2</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      field.onChange(checked);
                      handleChange("checkPrice2", checked);
                    }}
                    ref={field.ref}
                    disabled={!checkPrice1}
                  />
                </FormControl>
              </div>
              <FormField
                control={form.control}
                name="price2"
                render={({ field: priceField }) => (
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter SOL balance"
                      {...priceField}
                      disabled={!checkPrice2}
                      onChange={(e) => handleChange("price2", Number(e.target.value))}
                    />
                  </FormControl>
                )}
              />
              <FormDescription className="text-xs">
                SOL value for 2nd payment button
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="checkPrice3"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                <FormLabel className="mr-2">Value 3</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      field.onChange(checked);
                      handleChange("checkPrice3", checked);
                    }}
                    ref={field.ref}
                    disabled={!checkPrice2}
                  />
                </FormControl>
              </div>
              <FormField
                control={form.control}
                name="price3"
                render={({ field: priceField }) => (
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter SOL balance"
                      {...priceField}
                      disabled={!checkPrice3}
                      onChange={(e) => handleChange("price3", Number(e.target.value))}
                    />
                  </FormControl>
                )}
              />
              <FormDescription className="text-xs">
                SOL value for 3rd payment button
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="variablePrice"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between gap-3 md:w-1/2">
                <FormLabel>Add Variable Payment Field</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      field.onChange(checked);
                      handleChange("variablePrice", checked);
                    }}
                    ref={field.ref}
                    className="size-6"
                  />
                </FormControl>
              </div>
              <FormDescription className="text-xs">
                For accepting variable value
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Create Blink</Button>
      </form>
    </Form>
  );
}
