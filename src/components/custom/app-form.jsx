// "use client";
// import React from "react";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Button } from "@/components/ui/button";
// import {
// 	Form,
// 	FormControl,
// 	FormDescription,
// 	FormField,
// 	FormItem,
// 	FormLabel,
// 	FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";

// const formSchema = z.object({
// 	username: z.string().min(2, {
// 		message: "Username must be at least 2 characters.",
// 	}),
// });

// export function ProfileForm() {
// 	// 1. Define your form.
// 	const form = useForm({
// 		resolver: zodResolver(formSchema),
// 		defaultValues: {
// 			username: "",
// 			email:"",
// 			age:"",
// 		},
// 	});

// 	// 2. Define a submit handler.
// 	function onSubmit(values) {
// 		// Do something with the form values.
// 		// ✅ This will be type-safe and validated.
// 		console.log(values);
// 	}

// 	return (
// 		<Form {...form}>
// 			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
// 				<FormField
// 					control={form.control}
// 					name='username'
// 					render={({ field }) => (
// 						<FormItem className={undefined}>
// 							<FormLabel className={undefined}>Username</FormLabel>
// 							<FormControl>
// 								<Input placeholder='shadcn' {...field} />
// 							</FormControl>
// 							<FormDescription className={undefined}>
// 								This is your public display name.
// 							</FormDescription>
// 							<FormMessage className={undefined} />
// 						</FormItem>
// 					)}
// 				/>
// 				<FormField
// 					control={form.control}
// 					name='email'
// 					render={({ field }) => (
// 						<FormItem className={undefined}>
// 							<FormLabel className={undefined}>Email</FormLabel>
// 							<FormControl>
// 								<Input placeholder='shadcn' {...field} />
// 							</FormControl>
// 							<FormDescription className={undefined}>
// 								This is your public display name.
// 							</FormDescription>
// 							<FormMessage className={undefined} />
// 						</FormItem>
// 					)}
// 				/>
// 				<FormField
// 					control={form.control}
// 					name='age'
// 					render={({ field }) => (
// 						<FormItem className={undefined}>
// 							<FormLabel className={undefined}>Username</FormLabel>
// 							<FormControl>
// 								<Input placeholder='shadcn' {...field} />
// 							</FormControl>
// 							<FormDescription className={undefined}>
// 								This is your public display name.
// 							</FormDescription>
// 							<FormMessage className={undefined} />
// 						</FormItem>
// 					)}
// 				/>
// 				<Button
// 					type='submit'
// 					className={undefined}
// 					variant={undefined}
// 					size={undefined}
// 				>
// 					Submit
// 				</Button>
// 			</form>
// 		</Form>
// 	);
// }

// components/MultiStepForm.jsx
// 'use client';

// import { useState } from 'react';
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// export const ProfileForm = () => {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     ageGroup: '',
//     language: '',
//     studyGoals: '',
//     learningReasons: [],
//     timePerWeek: '',
//     completionDate: '',
//     studyFormats: [],
//     aiFeedback: false,
//     structuredSchedule: false,
//     skillLevel: ''
//   });

//   const handleNext = () => setStep(step + 1);
//   const handleBack = () => setStep(step - 1);

//   const handleChange = (field, value) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleCheckboxChange = (field, value, checked) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: checked
//         ? [...prev[field], value]
//         : prev[field].filter(item => item !== value)
//     }));
//   };

//   const Step1 = () => (
//     <div className="space-y-4">
//       <CardHeader>
//         <CardTitle>Basic Information</CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         <div>
//           <Label htmlFor="name">Name</Label>
//           <Input
//             id="name"
//             value={formData.name}
//             onChange={(e) => handleChange('name', e.target.value)}
//           />
//         </div>
//         <div>
//           <Label htmlFor="email">Email</Label>
//           <Input
//             id="email"
//             type="email"
//             value={formData.email}
//             onChange={(e) => handleChange('email', e.target.value)}
//           />
//         </div>
//         <div>
//           <Label>Age Group</Label>
//           <Select onValueChange={(value) => handleChange('ageGroup', value)}>
//             <SelectTrigger>
//               <SelectValue placeholder="Select age group" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="under18">Under 18</SelectItem>
//               <SelectItem value="18-24">18-24</SelectItem>
//               <SelectItem value="25-34">25-34</SelectItem>
//               <SelectItem value="35+">35+</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//         <div>
//           <Label>Preferred Language</Label>
//           <Select onValueChange={(value) => handleChange('language', value)}>
//             <SelectTrigger>
//               <SelectValue placeholder="Select language" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="english">English</SelectItem>
//               <SelectItem value="spanish">Spanish</SelectItem>
//               <SelectItem value="french">French</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </CardContent>
//     </div>
//   );

//   const Step2 = () => (
//     <div className="space-y-4">
//       <CardHeader>
//         <CardTitle>Study Goals</CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         <div>
//           <Label htmlFor="studyGoals">What do you want to learn?</Label>
//           <Input
//             id="studyGoals"
//             value={formData.studyGoals}
//             onChange={(e) => handleChange('studyGoals', e.target.value)}
//           />
//         </div>
//         <div>
//           <Label>Why are you learning this?</Label>
//           {['Career', 'Exam Prep', 'Skill Improvement'].map((reason) => (
//             <div key={reason} className="flex items-center space-x-2">
//               <Checkbox
//                 id={reason}
//                 checked={formData.learningReasons.includes(reason)}
//                 onCheckedChange={(checked) => handleCheckboxChange('learningReasons', reason, checked)}
//               />
//               <Label htmlFor={reason}>{reason}</Label>
//             </div>
//           ))}
//         </div>
//         <div>
//           <Label>Time per week</Label>
//           <Select onValueChange={(value) => handleChange('timePerWeek', value)}>
//             <SelectTrigger>
//               <SelectValue placeholder="Select time" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="2hrs">2 hours</SelectItem>
//               <SelectItem value="5hrs">5 hours</SelectItem>
//               <SelectItem value="10hrs">10 hours</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//         <div>
//           <Label htmlFor="completionDate">Completion Date</Label>
//           <Input
//             id="completionDate"
//             type="date"
//             value={formData.completionDate}
//             onChange={(e) => handleChange('completionDate', e.target.value)}
//           />
//         </div>
//       </CardContent>
//     </div>
//   );

//   const Step3 = () => (
//     <div className="space-y-4">
//       <CardHeader>
//         <CardTitle>Learning Preferences</CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         <div>
//           <Label>Preferred Study Format</Label>
//           {['Text', 'Videos', 'Quizzes', 'Podcasts', 'Interactive'].map((format) => (
//             <div key={format} className="flex items-center space-x-2">
//               <Checkbox
//                 id={format}
//                 checked={formData.studyFormats.includes(format)}
//                 onCheckedChange={(checked) => handleCheckboxChange('studyFormats', format, checked)}
//               />
//               <Label htmlFor={format}>{format}</Label>
//             </div>
//           ))}
//         </div>
//         <div className="flex items-center space-x-2">
//           <Checkbox
//             id="aiFeedback"
//             checked={formData.aiFeedback}
//             onCheckedChange={(checked) => handleChange('aiFeedback', checked)}
//           />
//           <Label htmlFor="aiFeedback">AI Feedback on Assignments</Label>
//         </div>
//         <div className="flex items-center space-x-2">
//           <Checkbox
//             id="structuredSchedule"
//             checked={formData.structuredSchedule}
//             onCheckedChange={(checked) => handleChange('structuredSchedule', checked)}
//           />
//           <Label htmlFor="structuredSchedule">Structured Schedule</Label>
//         </div>
//       </CardContent>
//     </div>
//   );

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData);
//     // Handle form submission here
//   };

//   return (
//     <Card className="w-full max-w-2xl mx-auto">
//       <form onSubmit={handleSubmit}>
//         {step === 1 && <Step1 />}
//         {step === 2 && <Step2 />}
//         {step === 3 && <Step3 />}
        
//         <div className="flex justify-between p-6">
//           {step > 1 && (
//             <Button type="button" variant="outline" onClick={handleBack}>
//               Back
//             </Button>
//           )}
//           {step < 3 ? (
//             <Button type="button" onClick={handleNext} className="ml-auto">
//               Next
//             </Button>
//           ) : (
//             <Button type="submit" className="ml-auto">
//               Submit
//             </Button>
//           )}
//         </div>
//       </form>
//     </Card>
//   );
// };

// components/MultiStepForm.jsx
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

// Define schema for validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  ageGroup: z.string().min(1, { message: "Please select an age group" }),
  language: z.string().min(1, { message: "Please select a language" }),
  studyGoals: z.string().min(2, { message: "Please specify your study goals" }),
  learningReasons: z.array(z.string()).min(1, { message: "Select at least one reason" }),
  timePerWeek: z.string().min(1, { message: "Please select time commitment" }),
  completionDate: z.string().min(1, { message: "Please select a completion date" }),
  studyFormats: z.array(z.string()).min(1, { message: "Select at least one format" }),
  aiFeedback: z.boolean(),
  structuredSchedule: z.boolean(),
});

export const ProfileForm = () => {
  const [step, setStep] = useState(1);

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
              {['Text', 'Videos', 'Quizzes', 'Podcasts', 'Interactive'].map((format) => (
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
    console.log(data);
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