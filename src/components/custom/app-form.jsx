'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFormStore } from "@/store/useFormStore";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Updated schema with all fields including checkboxes
const formSchema = z.object({
  subject: z.string().min(2, { message: "Please specify your subjects" }),
  learningReasons: z.array(z.string()).min(1, { message: "Please select at least one learning level" }),
  estimatedDays: z.string().min(1, { message: "Please provide estimated days" })
});

export const ProfileForm = () => {
  const [step, setStep] = useState(1);
  const setFormData = useFormStore((state) => state.setFormData);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: '',
      learningReasons: [],
      estimatedDays: ''
    },
  });

  const Step2 = () => (
    <div className="space-y-4">
      <CardHeader>
        <CardTitle>Set Your Preference</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What do you want to learn?</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="learningReasons"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>What is your level?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => field.onChange([value])}
                  defaultValue={field.value[0]}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="beginner" />
                    </FormControl>
                    <FormLabel className="font-normal">Beginner</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="intermediate" />
                    </FormControl>
                    <FormLabel className="font-normal">Intermediate</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="advanced" />
                    </FormControl>
                    <FormLabel className="font-normal">Advanced</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="estimatedDays"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estimated Days</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </div>
  );

  const onSubmit = (data) => {
    console.log("clicked");
    console.log(data);
    setFormData(data);
    router.push("/studyplan")
  };

  return (
    <Card className="w-full mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {<Step2 />}

          <div className="flex justify-between p-6">
            <Button type="submit" className="ml-auto">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default ProfileForm;