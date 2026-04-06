
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import pb from '@/lib/pocketbaseClient';

const formSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  companyName: z.string().min(2, 'Company name is required'),
  email: z.string().email('Valid email is required'),
  phoneNumber: z.string().min(5, 'Phone number is required'),
  country: z.string().optional(),
  eventName: z.string().optional(),
  industry: z.string().optional(),
  participationType: z.string().optional(),
  areasOfInterest: z.string().optional(),
  numberOfAttendees: z.number().optional(),
  additionalNotes: z.string().optional(),
});

const EventInterestForm = ({ selectedEvent, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      companyName: '',
      email: '',
      phoneNumber: '',
      country: '',
      eventName: selectedEvent?.eventName || '',
      industry: '',
      participationType: '',
      areasOfInterest: '',
      numberOfAttendees: 1,
      additionalNotes: '',
    },
  });

  useEffect(() => {
    if (selectedEvent) {
      form.setValue('eventName', selectedEvent.eventName);
    }
  }, [selectedEvent, form]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await pb.collection('event_interests').create(data, { $autoCancel: false });
      toast.success('Registration received. We will contact you with event details.');
      form.reset();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to submit registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input placeholder="Raj Patel" {...field} className="text-gray-900 placeholder:text-gray-400" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company name</FormLabel>
                <FormControl>
                  <Input placeholder="Global Ventures Inc" {...field} className="text-gray-900 placeholder:text-gray-400" />
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
                  <Input type="email" placeholder="raj@globalventures.com" {...field} className="text-gray-900 placeholder:text-gray-400" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <Input placeholder="+44 20 7946 0958" {...field} className="text-gray-900 placeholder:text-gray-400" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="United Kingdom" {...field} className="text-gray-900 placeholder:text-gray-400" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="eventName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event name</FormLabel>
                <FormControl>
                  <Input placeholder="Event name" {...field} className="text-gray-900 placeholder:text-gray-400" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Industry</FormLabel>
                <FormControl>
                  <Input placeholder="Technology" {...field} className="text-gray-900 placeholder:text-gray-400" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="participationType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Participation type</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="text-gray-900">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="attendee">Attendee</SelectItem>
                    <SelectItem value="exhibitor">Exhibitor</SelectItem>
                    <SelectItem value="sponsor">Sponsor</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="areasOfInterest"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Areas of interest</FormLabel>
              <FormControl>
                <Input placeholder="Market expansion, partnerships, investment opportunities" {...field} className="text-gray-900 placeholder:text-gray-400" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="numberOfAttendees"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of attendees</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min="1"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                  className="text-gray-900"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="additionalNotes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional notes</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Any specific requirements or questions..." 
                  className="min-h-[100px] text-gray-900 placeholder:text-gray-400" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 active:scale-[0.98]"
        >
          {isSubmitting ? 'Submitting...' : 'Submit registration'}
        </Button>
      </form>
    </Form>
  );
};

export default EventInterestForm;
