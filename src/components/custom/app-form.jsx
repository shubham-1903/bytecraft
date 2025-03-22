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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFormStore } from "@/store/useFormStore"
import { useRouter } from "next/navigation";

// Define schema for validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  ageGroup: z.string().min(1, { message: "Please select an age group" }),
  subject: z.string().min(2, { message: "Please specify your subjects" }),
  learningReasons: z.array(z.string()).min(1, { message: "Select at least one reason" }),
  estimatedDays: z.string().min(1, { message: "Please provide estimated days" }),
  studyFormats: z.array(z.string()).min(1, { message: "Select at least one format" }),
  aiFeedback: z.boolean(),
  structuredSchedule: z.boolean(),
});

export const ProfileForm = () => {
  const [step, setStep] = useState(1);
  const setFormData = useFormStore((state) => state.setFormData);
  const router = useRouter();


  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      ageGroup: '',
      subject: '',
      learningReasons: [],
      estimatedDays: '',
      studyFormats: [],
      aiFeedback: false,
      structuredSchedule: false,
    },
  });

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const Step1 = () => (
    <div className="space-y-4">
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ageGroup"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age Group</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select age group" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="under18">Under 18</SelectItem>
                  <SelectItem value="18-24">18-24</SelectItem>
                  <SelectItem value="25-34">25-34</SelectItem>
                  <SelectItem value="35+">35+</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </div>
  );

  const Step2 = () => (
    <div className="space-y-4">
      <CardHeader>
        <CardTitle>Subject</CardTitle>
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
          render={() => (
            <FormItem>
              <FormLabel>Why are you learning this?</FormLabel>
              {['Career', 'Exam Prep', 'Skill Improvement'].map((reason) => (
                <div key={reason} className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={form.watch('learningReasons').includes(reason)}
                      onCheckedChange={(checked) => {
                        const currentReasons = form.getValues('learningReasons');
                        form.setValue(
                          'learningReasons',
                          checked
                            ? [...currentReasons, reason]
                            : currentReasons.filter((r) => r !== reason)
                        );
                      }}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">{reason}</FormLabel>
                </div>
              ))}
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

  const Step3 = () => (
    <div className="space-y-4">
      <CardHeader>
        <CardTitle>Learning Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="studyFormats"
          render={() => (
            <FormItem>
              <FormLabel>Preferred Study Format</FormLabel>
              {['Text', 'Videos', 'Quizzes', 'Blogs'].map((format) => (
                <div key={format} className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={form.watch('studyFormats').includes(format)}
                      onCheckedChange={(checked) => {
                        const currentFormats = form.getValues('studyFormats');
                        form.setValue(
                          'studyFormats',
                          checked
                            ? [...currentFormats, format]
                            : currentFormats.filter((f) => f !== format)
                        );
                      }}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">{format}</FormLabel>
                </div>
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="aiFeedback"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="font-normal">AI Feedback on Assignments</FormLabel>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="structuredSchedule"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="font-normal">Structured Schedule</FormLabel>
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
    // Handle form submission here
  };

  return (
    <Card className="w-full mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {step === 1 && <Step1 />}
          {step === 2 && <Step2 />}
          {step === 3 && <Step3 />}
          
          <div className="flex justify-between p-6">
            {step > 1 && (
              <Button type="button" variant="outline" onClick={handleBack}>
                Back
              </Button>
            )}
            {step < 3 ? (
              <Button type="button" onClick={handleNext} className="ml-auto">
                Next
              </Button>
            ) : (
              <Button type="submit" className="ml-auto">
                Submit
              </Button>
            )}
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default ProfileForm;